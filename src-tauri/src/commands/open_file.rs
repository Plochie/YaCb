use std::time::Instant;

#[tauri::command]
pub fn open_file(resource: &str) {
    let now = Instant::now();

    match open::that(resource) {
        Ok(()) => {}
        Err(err) => {
            println!("An error occurred when opening '{}': {}", resource, err);
        }
    }
    let elapsed = now.elapsed().as_millis();
    println!("[open_resource] Took {} milliseconds", elapsed);
}
