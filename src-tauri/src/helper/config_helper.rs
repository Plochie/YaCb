use lazy_static::lazy_static;
use std::path::PathBuf;
use std::sync::RwLock;

#[derive(Debug)]
pub struct AppConfig {
    app_name: String,
    pub config_dir: String,
    pub num_cpu: usize,
    pub ignore_files: Vec<String>,
}

lazy_static! {
    pub static ref APP_CONFIG: RwLock<AppConfig> = RwLock::new(AppConfig {
        app_name: String::from("YaCb_v1"),
        config_dir: String::from(".config"),
        num_cpu: 4,
        ignore_files: vec!["node_modules".to_string()]
    });
}
//
pub fn populate_config() {
    if let Ok(mut app_config) = APP_CONFIG.write() {
        if let Some(config_dir) = tauri::api::path::config_dir() {
            //
            let app_config_dir = PathBuf::new().join(config_dir).join("YaCb");
            std::fs::create_dir_all(&app_config_dir).unwrap();
            app_config.config_dir = app_config_dir
                .as_path()
                .to_str()
                .get_or_insert("YaCb")
                .to_string();
            //
            if let Ok(n) = std::thread::available_parallelism() {
                app_config.num_cpu = n.get();
            }
        }
        info!("config population done, {:?}", app_config);
    }
}
