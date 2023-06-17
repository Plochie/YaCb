#![allow(unused)]

use ignore::{DirEntry, Walk, WalkBuilder};
use std::{
    fs::{self, File},
    io::{self, BufRead, BufReader, ErrorKind, Write},
    path::Path,
    sync::{Arc, RwLock},
    thread::{self, available_parallelism, JoinHandle, ScopedJoinHandle},
    time::Instant,
};

use serde::{Deserialize, Serialize};
use serde_json::Result;

mod file_creation;

pub struct FileStorage {
    all_files: Vec<String>,
    all_files_count: usize,
    cpu_count: usize,
}

/**
 *
 */
// fn read_file_in_cache() {
//     if let Ok(mut storage) = FILE_STORAGE.write() {
//         let file_path = "C:\\Users\\Plochie\\Desktop\\DO_SOMETHING\\tauri-app\\_test_rs\\data\\all_files_data.log";
//         //
//         if let Ok(lines) = read_lines(file_path) {
//             let mut files_count = 0;
//             for line in lines {
//                 //
//                 if let Ok(l) = line {
//                     storage.all_files.push(l.clone());
//                     files_count = files_count + 1;
//                 }
//             }
//             storage.all_files_count = files_count;
//         }
//         // number of cpu logic
//         if let Ok(count) = available_parallelism() {
//             storage.cpu_count = count.get();
//         }
//     }
// }

//
//
/**
 *
 */
// pub read_json_file_in_cache() {
//     if let Ok(mut storage) = FILE_STORAGE.write() {
//         let file_path = "C:\\Users\\Plochie\\Desktop\\DO_SOMETHING\\tauri-app\\_test_rs\\data\\all_files_data.json";
//         //
//         if let Ok(lines) = read_lines(file_path) {
//             let mut files_count = 0;
//             for line in lines {
//                 //
//                 if let Ok(l) = line {
//                     storage.all_files.push(l.clone());
//                     files_count = files_count + 1;
//                 }
//             }
//             storage.all_files_count = files_count;
//         }
//         // number of cpu logic
//         if let Ok(count) = available_parallelism() {
//             storage.cpu_count = count.get();
//         }
//     }
// }

//
//
//
//

fn main() {
    // normal file creation takes 16s~19s
    let mut start = Instant::now();
    // create_file_data();
    let file_path = Path::new(
        "C:\\Users\\Plochie\\Desktop\\DO_SOMETHING\\tauri-app\\_test_rs\\data\\files.csv",
    );
    let walk_path = Path::new("C:\\");
    // println!("file creation: {} ms", start.elapsed().as_millis());
    //
    //
    // Automatically select the best implementation for your platform.
    // let (sender, receiver) = crossbeam_channel::bounded(1);
    // let mut watcher = notify::recommended_watcher(move |res| {
    //     sender.send(res);
    // });

    // Add a path to be watched. All files and directories at that path and
    // below will be monitored for changes.
    // if let Ok(w) = watcher {
    //     let mut w = w;
    //     w.watch(
    //         Path::new("C:\\Users\\Plochie\\Desktop\\DO_SOMETHING\\tauri-app\\_test_rs\\data"),
    //         notify::RecursiveMode::NonRecursive,
    //     );
    // }

    start = Instant::now();
    let t = file_creation::create_file_data_threaded_csv(Path::new("C:\\"), &file_path, true);
    // if let Ok(walker) = t {
    //     walker.join();
    // }
    println!("file creation: {} ms", start.elapsed().as_millis());
    //
    //
    // let handler = std::thread::spawn(|| {
    //     for i in 1..100 {
    //         println!("counter: {}", i);
    //         thread::sleep(std::time::Duration::from_secs(1));
    //     }
    // });
    // handler.join();

    // loop {
    //     match receiver.recv() {
    //         Ok(event) => println!("{:?}", event),
    //         Err(e) => println!("watch error: {:?}", e),
    //     }
    // }

    //

    //
    // start = Instant::now();
    // read_file_in_cache();
    // println!("read cache    : {} ms", start.elapsed().as_millis());
    //
    //
    // start = Instant::now();
    // read_json_file_in_cache();
    // println!("read cache    : {} ms", start.elapsed().as_millis());
    // //
    // //
    // start = Instant::now();
    // search_all(String::from("paresh"));
    // println!("searching all : {} ms", start.elapsed().as_millis());
    // //
    // //
    // start = Instant::now();
    // search_all_threads(String::from("paresh"));
    // println!("search all t : {} ms", start.elapsed().as_millis());
    // //
    // //
    // start = Instant::now();
    // check_file_attr();
    // println!("search all t : {} ms", start.elapsed().as_millis());
    // start = Instant::now();
    // println!("searching dir : {} ms", start.elapsed().as_millis());
}
