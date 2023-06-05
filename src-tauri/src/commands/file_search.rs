#![allow(unused)]
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::ErrorKind;
use std::process::Command;
use std::sync::Mutex;
use std::time::Instant;
use std::{
    fs::File,
    io::{self, prelude::*, BufRead, BufReader, Lines},
    path::Path,
};
// use std::fs::File;
// use std::io::{self, BufRead, BufReader, Lines};
// use std::path::Path;

use fuzzy_matcher::clangd::ClangdMatcher;
use fuzzy_matcher::skim::SkimMatcherV2;
use fuzzy_matcher::FuzzyMatcher;
//
pub static ARRAY: Mutex<Vec<String>> = Mutex::new(Vec::new());

// pub static GLOBAL_STORAGE: Lazy<Mutex<Vec<String>>> = Lazy::new(|| Mutex::new(Vec::new()));

// pub fn set_file_content(value: Vec<String>) {
//     *GLOBAL_STORAGE.lock().unwrap() = value;
// }

// pub fn read_file_content() -> String {
//     let contents = fs::read_to_string("./external_binaries/files.log")
//         .expect("Should have been able to read the file");
//     return contents;
// }

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MatchedFile {
    file: String,
    score: i64,
}

#[tauri::command(async)]
pub async fn get_indexed_files(fetch_latest: bool, query: String) -> Vec<String> {
    //
    let now = Instant::now();
    // let matcher = ClangdMatcher::default();
    let mut matched_strings: Vec<MatchedFile> = Vec::new();
    //
    if let Ok(arr) = ARRAY.lock() {
        for line in arr.iter() {
            if line.to_lowercase().contains(&query.to_lowercase()) {
                let m = MatchedFile {
                    file: line.to_string(),
                    score: 0,
                };
                matched_strings.push(m);
            }
        }
    }
    // matched_strings.sort_by(|a, b| b.score.cmp(&a.score));

    let mut top_matches: Vec<String> = Vec::new();

    // for matched_string in matched_strings {
    //     top_matches.push(String::clone(&matched_string.file))
    // }
    let mut size = 10;
    if matched_strings.len() < 10 {
        size = matched_strings.len();
    }
    for index in 0..size {
        top_matches.push(String::clone(&matched_strings[index].file))
    }
    println!(
        "[get_indexed_files] Took {} milliseconds",
        now.elapsed().as_millis()
    );
    return top_matches;
}
