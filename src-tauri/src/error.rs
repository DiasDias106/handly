use serde::{Serialize, Serializer};

/// Error type returned by every Tauri command.
/// It is serialized as a plain string so the frontend receives a readable message.
#[derive(Debug)]
pub struct AppError(String);

impl<E: std::fmt::Display> From<E> for AppError {
    fn from(err: E) -> Self {
        AppError(err.to_string())
    }
}

impl Serialize for AppError {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.0)
    }
}

pub type AppResult<T> = Result<T, AppError>;
