#![allow(unused)]

use std::cmp::Ordering;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, ErrorKind, Write};
use std::path::Path;
use std::time::Instant;

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn search() {
    if let Ok(lines) = read_lines("./data/test_files.log") {
        for line in lines {
            //
            if let Ok(l) = line {
                //
                // println!("{}", l);
            }
        }
    }
}

fn main() {
    let start = Instant::now();
    search();
    println!("took {}", start.elapsed().as_millis());
}
