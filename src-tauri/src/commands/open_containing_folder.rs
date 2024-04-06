use std::path::PathBuf;
use std::time::Instant;

#[tauri::command]
pub fn open_containing_folder(resource: &str) {
    let now = Instant::now();
    //
    let path = PathBuf::from(resource);
    let containing_folder = path.parent().unwrap();
    //
    match open::that(containing_folder) {
        Ok(()) => {}
        Err(err) => {
            info!("An error occurred when opening '{}': {}", resource, err);
        }
    }
    let elapsed = now.elapsed().as_millis();
    info!("[open_containing_folder] Took {} milliseconds", elapsed);
}
