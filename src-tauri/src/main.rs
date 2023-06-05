// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
//
// use commands::*;
use tauri::*;

use commands::file_search::ARRAY;
use std::sync::Mutex;
use std::{
    fs::File,
    io::{self, prelude::*, BufRead, BufReader, Lines},
    path::Path,
};

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn cache_files_data() {
    if let Ok(mut arr) = ARRAY.lock() {
        //
        let file_path = "./external_binaries/files.log";
        //
        if let Ok(lines) = read_lines(file_path) {
            for line in lines {
                //
                if let Ok(l) = line {
                    arr.push(l);
                }
            }
        }
    }
}

mod commands;

#[tauri::command]
fn backend_logging(msg: &str) {
    println!("[frontend_log] {}, {}", msg, ARRAY.lock().unwrap().len());
}

fn make_tray() -> SystemTray {
    // <- a function that creates the system tray
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    return SystemTray::new().with_menu(menu);
}

// TODO:  main
// FIXME:  main
// IMPROVEMENT: improvement
// BUG: bug

/**
 * TODO:  main
 * FIXME:  main
 * IMPROVEMENT: improvement
 * BUG: bug
 */
fn main() {
    //
    cache_files_data();
    //
    tauri::Builder::default()
        .system_tray(make_tray())
        .invoke_handler(tauri::generate_handler![
            backend_logging,
            commands::run_cmd::run_cmd,
            commands::open_resource,
            commands::file_search::get_indexed_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
