use serde::{Deserialize, Serialize};
use std::time::Instant;

#[derive(Debug, Serialize, Deserialize)]
pub struct ColorPickerResult {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MouseLocationResult {
    x: f64,
    y: f64,
}

#[tauri::command]
pub fn color_picker() -> ColorPickerResult {
    let now = Instant::now();

    let mouse_location = autopilot::mouse::location();
    let pixel = autopilot::screen::get_color(mouse_location).unwrap();

    let elapsed = now.elapsed().as_millis();
    info!("[color_picker] Took {} milliseconds", elapsed);

    ColorPickerResult {
        r: pixel.0[0],
        g: pixel.0[1],
        b: pixel.0[2],
        a: pixel.0[3],
    }
}

#[tauri::command]
pub fn mouse_location() -> MouseLocationResult {
    let now = Instant::now();

    let mouse_location = autopilot::mouse::location();

    let elapsed = now.elapsed().as_millis();
    info!("[mouse_location] Took {} milliseconds", elapsed);

    MouseLocationResult {
        x: mouse_location.x,
        y: mouse_location.y,
    }
}
