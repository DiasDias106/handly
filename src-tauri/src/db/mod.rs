mod migrations;

use std::path::{Path, PathBuf};
use std::sync::{Mutex, MutexGuard};

use rusqlite::Connection;

use crate::error::AppResult;

const DB_FILE: &str = "handly.db";

/// Shared SQLite connection, managed as Tauri state.
pub struct Db {
    conn: Mutex<Connection>,
    path: PathBuf,
}

impl Db {
    /// Opens (or creates) the database inside `dir` and applies pending migrations.
    pub fn open(dir: &Path) -> AppResult<Self> {
        std::fs::create_dir_all(dir)?;
        let path = dir.join(DB_FILE);

        let mut conn = Connection::open(&path)?;
        conn.pragma_update(None, "journal_mode", "WAL")?;
        conn.pragma_update(None, "foreign_keys", "ON")?;
        migrations::run(&mut conn)?;

        Ok(Self {
            conn: Mutex::new(conn),
            path,
        })
    }

    pub fn conn(&self) -> AppResult<MutexGuard<'_, Connection>> {
        Ok(self.conn.lock()?)
    }

    pub fn path(&self) -> &Path {
        &self.path
    }
}
