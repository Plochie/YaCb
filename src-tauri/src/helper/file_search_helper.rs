use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CsvRecord {
    pub t: String,
    pub path: String,
}

#[derive(thiserror::Error, Debug)]
pub enum CsvCreateError {
    //
    #[error("ignore walk error")]
    WalkError(#[from] ignore::Error),
    //
    #[error("CSV serialization error")]
    CsvError(#[from] csv::Error),
    //
    #[error("Io error")]
    IoError(#[from] std::io::Error),
}
