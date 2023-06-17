// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
//
// extern crate pretty_env_logger;
#[macro_use]
extern crate log;
mod commands;
mod helper;
use crate::commands::file_search;
use std::time::Instant;
use tauri::*;

#[tauri::command]
fn backend_logging(msg: &str) {
    println!("[frontend_log] {}", msg);
}

fn make_tray() -> SystemTray {
    // <- a function that creates the system tray
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    return SystemTray::new().with_menu(menu);
}

fn init_app() {
    // std::env::set_var("YACB_APP_LOG", "info");
    // pretty_env_logger::init_custom_env("YACB_APP_LOG");
    //
    helper::config_helper::populate_config();
    // file_search::create_file_data();
    file_search::read_file_in_cache(false);
}

/**
 * TODO:  main
 * FIXME:  main
 * IMPROVEMENT: improvement
 */

fn main() {
    //
    let now = Instant::now();
    init_app();
    println!("[preprocessor] took {} ms", now.elapsed().as_millis());
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
