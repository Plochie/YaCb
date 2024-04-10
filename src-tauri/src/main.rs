// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
//
// extern crate pretty_env_logger;
#[macro_use]
extern crate log;
mod commands;
mod helper;
use commands::file_search_new;
use std::time::Instant;
use tauri::*;

#[tauri::command]
fn backend_logging(msg: &str) {
    info!("[frontend_log] {}", msg);
}

fn make_tray() -> SystemTray {
    // <- a function that creates the system tray
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    return SystemTray::new().with_menu(menu);
}

fn init_app() {
    // crate::commands::file_search_new::process(std::path::Path::new("C:\\"), true).unwrap();
    //
    helper::config_helper::populate_config();
    file_search_new::init_index_reader().unwrap();
    // file_search::create_file_data();
    // file_search::read_file_in_cache(false);
}

fn main() {
    //
    // std::thread::spawn(|| rdev::listen(helper::global_input_event::callback));
    //
    helper::logger::init_logger();
    // env_logger::init();
    let now = Instant::now();
    init_app();
    info!("[preprocessor] took {} ms", now.elapsed().as_millis());
    //
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .system_tray(make_tray())
        .invoke_handler(tauri::generate_handler![
            backend_logging,
            commands::run_cmd::run_cmd,
            commands::open_file::open_file,
            commands::open_containing_folder::open_containing_folder,
            // commands::file_search::get_indexed_files,
            commands::file_search_new::get_matched_files,
            commands::color_picker::color_picker,
            commands::color_picker::mouse_location,
            helper::global_input_event::start_input_event
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
