use crate::helper;
use crate::helper::config_helper::APP_CONFIG;
use ignore::WalkBuilder;
use serde::{Deserialize, Serialize};
use std::{
    path::{Path, PathBuf},
    thread::{self, JoinHandle},
};

const INDEX_FILE_PATH: &str = "./file_search/indexed";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CsvRecord {
    pub t: String,
    pub path: String,
}

#[derive(thiserror::Error, Debug)]
pub enum CsvCreateError {
    //
    #[error("ignore walk error")]
    WalkError(#[from] ignore::Error),
    //
    #[error("CSV serialization error")]
    CsvError(#[from] csv::Error),
    //
    #[error("Io error")]
    IoError(#[from] std::io::Error),
}
/**
 * create directory if not exists
 */
fn get_indexed_file() -> PathBuf {
    let path = Path::new(APP_CONFIG.read().unwrap().config_dir.as_str()).join(INDEX_FILE_PATH);
    helper::create_if_not_exists(&path, false);
    path
}
//
//
//
pub fn read_file_csv(
    walk_path: &Path,
    consider_hidden: bool,
    create_latest_file: bool,
) -> Result<Vec<CsvRecord>, Box<dyn std::error::Error>> {
    //
    let file_path = get_indexed_file();
    // TODO: only create if needed
    // if !file_path.exists() {
    if create_latest_file {
        if let Ok((_thread, _file_path)) = create_file_data_threaded_csv(walk_path, consider_hidden)
        {
            _thread.join().expect("File creation failed.");
        }
    }

    // }
    // let mut rdr = csv::Reader::from_path(file_path)?;

    let mut rdr = csv::ReaderBuilder::new()
        .delimiter(b'|')
        .from_path(file_path)?;

    let mut vec: Vec<CsvRecord> = Vec::new();
    for result in rdr.deserialize() {
        vec.push(result?);
    }

    Ok(vec)
}
//
pub fn create_file_data_threaded_csv(
    walk_path: &Path,
    consider_hidden: bool,
) -> Result<(JoinHandle<()>, PathBuf), CsvCreateError> {
    //
    let (tx, rx) = crossbeam_channel::bounded::<ignore::DirEntry>(20000);
    //
    //
    let mut csv_writer = csv::WriterBuilder::new()
        .delimiter(b'|')
        .from_path(get_indexed_file())?;
    //
    let _file_writer_thread: JoinHandle<Result<(), CsvCreateError>> =
        std::thread::spawn(move || {
            let mut counter = 0;
            for dir_entry in rx {
                if let Some(path) = dir_entry.path().to_str() {
                    let mut record = CsvRecord {
                        path: String::from(path),
                        t: 'f'.to_string(),
                    };
                    if let Some(file_type) = dir_entry.file_type() {
                        if file_type.is_dir() {
                            record.t = 'd'.to_string();
                        }
                    }
                    csv_writer.serialize(record)?;
                }
                counter += 1;
            }
            info!("done writing file: {}", counter);
            return Ok(());
        });
    //
    let walker = WalkBuilder::new(walk_path)
        .hidden(!consider_hidden)
        .threads(APP_CONFIG.read().unwrap().num_cpu)
        .build_parallel();
    //
    let file_walker_thread = thread::spawn(move || {
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

    return Ok((file_walker_thread, get_indexed_file()));
}
