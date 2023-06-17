use serde::{Deserialize, Serialize};
use std::process::Command;
use std::time::Instant;

#[derive(Debug, Serialize, Deserialize)]
pub struct CommandResult {
    stdout: Option<String>,
    code: i32,
}

#[tauri::command]
pub fn run_cmd(command_str: &str, should_return_output: bool) -> CommandResult {
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

    let elapsed = now.elapsed().as_millis();
    println!("[run_cmd] Took {} milliseconds", elapsed);

    if should_return_output {
        if let Ok(stdout) = String::from_utf8(output.stdout) {
            return CommandResult {
                stdout: Some(stdout),
                code: 0,
            };
        }
    }

    CommandResult {
        stdout: None,
        code: -1,
    }
}
