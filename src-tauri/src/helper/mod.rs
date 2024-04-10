pub(crate) mod config_helper;
pub(crate) mod file_search_helper;
pub(crate) mod global_input_event;
pub(crate) mod logger;

use std::fs;
use std::path::Path;

pub fn create_if_not_exists(path: &Path, is_dir: bool) {
    if path.exists() {
        return;
    }
    if is_dir {
        info!("created dir: {}", path.to_str().unwrap());
        return;
    }
    //
    let file_parent = path.parent();
    fs::create_dir_all(file_parent.unwrap()).unwrap();
    // fs::File::create(path).unwrap();
    debug!("created file: {}", path.to_str().unwrap());
}
