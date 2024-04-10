use autopilot::mouse::MouseError;
use rdev::{Event, EventType};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Instant;
use tauri::{Manager, Window};
// global
pub fn callback(event: rdev::Event, window: Window) {
    println!("My callback {:?}", event);

    // window
    //     .emit(
    //         "event-name",
    //         Payload {
    //             message: "Tauri is awesome!".into(),
    //         },
    //     )
    //     .unwrap();

    // if let rdev::EventType

    match event.name {
        Some(string) => println!("User wrote {:?}", string),
        None => (),
    }
}

#[derive(Clone, serde::Serialize)]
enum Payload {
    MouseMove { x: f64, y: f64 },
}

// struct Point {
//     x: f64,
//     y: f64,
// }

// enum Shape {
//     Circle(Point, f64),
// }

// fn main() {
//     let Shape::Circle(_, radius) = Shape::Circle(Point { x: 0.0, y: 0.0 }, 10.0);
//     println!("value: {}", radius);
// }

#[tauri::command]
pub fn start_input_event(window: Window) {
    let now = Instant::now();
    //
    // window
    //     .emit(
    //         "event-name",
    //         Payload {
    //             message: "Tauri is awesome!".into(),
    //         },
    //     )
    //     .unwrap();
    //

    let _listener = thread::spawn(move || {
        rdev::listen(move |event| {
            if let EventType::MouseMove { x, y } = event.event_type {
                // println!("value: {} {}", x, y);
                window
                    .emit("event-name", Payload::MouseMove { x, y })
                    .unwrap();
            }
        })
        .expect("Could not listen");
    });

    // _listener.

    // std::thread::spawn(|| rdev::listen(callback));
    //
    let elapsed = now.elapsed().as_millis();
    info!("[start_input_event] Took {} milliseconds", elapsed);
}
