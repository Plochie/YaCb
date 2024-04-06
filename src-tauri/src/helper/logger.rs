use chrono::Local;
use env_logger::fmt::style::Color;
use env_logger::Builder;
use log::LevelFilter;
use std::io::Write;

pub fn init_logger() {
    Builder::new()
        .format(|buf, record| {
            writeln!(
                buf,
                "{} [{}] - {}",
                Local::now().format("%Y-%m-%dT%H:%M:%S"),
                record.level(),
                record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .init();
}
