use std::{
    path::Path,
    thread::{self, JoinHandle},
    time::Instant,
};

use crate::helper::{config_helper::APP_CONFIG, file_search_helper::CsvRecord};
use ignore::WalkBuilder;

use once_cell::sync::OnceCell;
use tantivy::collector::TopDocs;
use tantivy::doc;
use tantivy::query::QueryParser;
use tantivy::schema::*;
use tantivy::ReloadPolicy;
use tantivy::{Index, IndexReader};

static READER: OnceCell<IndexReader> = OnceCell::new();
static INDEX: OnceCell<Index> = OnceCell::new();
static SCHEMA: OnceCell<Schema> = OnceCell::new();

#[derive(thiserror::Error, Debug)]
pub enum CsvCreateError {
    //
    #[error("ignore walk error")]
    WalkError(#[from] ignore::Error),
    //
    #[error("Io error")]
    IoError(#[from] std::io::Error),
    //
    #[error("tantivy error")]
    TantivyError(#[from] tantivy::TantivyError),
}

pub fn init_index_reader() -> Result<(), tantivy::TantivyError> {
    let index_path = Path::new("C:\\Users\\Plochie\\AppData\\Roaming\\YaCb\\file_indexed");
    let directory = tantivy::directory::MmapDirectory::open(index_path)?;

    //
    let mut schema_builder = Schema::builder();
    schema_builder.add_text_field("path", TEXT | STORED);
    schema_builder.add_text_field("type", TEXT | STORED);
    //
    let _schema = schema_builder.build();
    let _index = Index::open_or_create(directory, _schema.clone())?;
    //
    let _reader = _index
        .reader_builder()
        .reload_policy(ReloadPolicy::OnCommit)
        .try_into()?;
    //
    if let Ok(_s) = SCHEMA.set(_schema) {
        info!("Global index schema initialized");
    }
    if let Ok(_i) = INDEX.set(_index) {
        info!("Global index initialized");
    }
    if let Ok(_r) = READER.set(_reader) {
        info!("Global index reader initialized");
    }

    Ok(())
}

/**
 *
 */
#[tauri::command(async)]
pub async fn get_matched_files(query: String) -> Vec<CsvRecord> {
    //
    let now = Instant::now();
    //
    let schema = SCHEMA.get().unwrap();
    let reader = READER.get().unwrap();
    let index = INDEX.get().unwrap();
    //
    let searcher = reader.searcher();

    let _path = schema.get_field("path").unwrap();
    let _type = schema.get_field("type").unwrap();
    let query_parser = QueryParser::for_index(&index, vec![_path]);
    let query = query_parser.parse_query(query.as_str()).unwrap();
    let top_docs = searcher.search(&query, &TopDocs::with_limit(15)).unwrap();
    //
    let mut top_matches: Vec<CsvRecord> = Vec::new();
    //
    for (_score, doc_address) in top_docs {
        let retrieved_doc = searcher.doc(doc_address).unwrap();
        // info!(
        //     "{}",
        //     retrieved_doc.get_first(_path).unwrap().as_text().unwrap()
        // );
        let path_str = retrieved_doc.get_first(_path).unwrap().as_text().unwrap();
        let type_str = retrieved_doc.get_first(_type).unwrap().as_text().unwrap();
        top_matches.push(CsvRecord {
            t: String::from(type_str),
            path: String::from(path_str),
        })
    }
    info!(
        "[get_matched_files] Took {} milliseconds",
        now.elapsed().as_millis()
    );
    return top_matches;
}
//
//
//
//
pub fn process(walk_path: &Path, consider_hidden: bool) -> tantivy::Result<()> {
    //
    let index_path = Path::new("C:\\Users\\Plochie\\AppData\\Roaming\\YaCb\\file_indexed");
    let directory = tantivy::directory::MmapDirectory::open(index_path)?;
    //
    let mut schema_builder = Schema::builder();
    let _path = schema_builder.add_text_field("path", TEXT | STORED);
    let _type = schema_builder.add_text_field("type", TEXT | STORED);
    //
    let schema = schema_builder.build();
    let index = Index::open_or_create(directory, schema.clone())?;
    let mut index_writer: tantivy::IndexWriter = index.writer(50_000_000)?;
    //
    // let _path = schema.get_field("path").unwrap();
    // let _type = schema.get_field("type").unwrap();
    //
    let (tx, rx) = crossbeam_channel::bounded::<ignore::DirEntry>(20000);
    //
    let _file_writer_thread: JoinHandle<Result<(), CsvCreateError>> =
        std::thread::spawn(move || {
            // let mut counter = 0;
            for dir_entry in rx {
                if let Some(path) = dir_entry.path().to_str() {
                    //
                    let mut t = "f";
                    if let Some(file_type) = dir_entry.file_type() {
                        if file_type.is_dir() {
                            t = "d";
                        }
                    }
                    //
                    index_writer.add_document(doc!(
                    _path => path,
                    _type => t
                    ))?;
                }
                // counter += 1;
            }
            index_writer.commit()?;
            return Ok(());
        });
    //
    let walker = WalkBuilder::new(walk_path)
        .hidden(!consider_hidden)
        .threads(APP_CONFIG.read().unwrap().num_cpu)
        .build_parallel();
    //
    let _file_walker_thread = thread::spawn(move || {
        walker.run(|| {
            let tx = tx.clone();
            Box::new(move |result| {
                // tx.send(result.unwrap().path().to_str().unwrap().to_string())
                //     .unwrap();
                if let Ok(entry) = result {
                    tx.send(entry).unwrap();
                }
                ignore::WalkState::Continue
            })
        });
    });

    Ok(())
}
