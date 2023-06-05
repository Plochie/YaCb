use std::process::Command;
use std::time::Instant;

#[tauri::command]
pub fn run_cmd(command_str: &str) -> String {
    let now = Instant::now();
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(["/C", command_str])
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(command_str)
            .output()
            .expect("failed to execute process")
    };

    let stdout = String::from_utf8(output.stdout).unwrap();
    let elapsed = now.elapsed().as_millis();
    println!("[run_cmd] Took {} milliseconds", elapsed);

    return stdout;
}
