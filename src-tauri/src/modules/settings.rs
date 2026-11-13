use std::collections::HashMap;

use rusqlite::params;
use serde_json::Value;
use tauri::State;

use crate::db::Db;
use crate::error::AppResult;

/// Returns every stored setting as `{ key: jsonValue }`.
#[tauri::command]
pub fn get_settings(db: State<'_, Db>) -> AppResult<HashMap<String, Value>> {
    let conn = db.conn()?;
    let mut stmt = conn.prepare("SELECT key, value FROM settings")?;
    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    })?;

    let mut settings = HashMap::new();
    for row in rows {
        let (key, raw) = row?;
        // Skip values that are not valid JSON instead of failing the whole read.
        if let Ok(value) = serde_json::from_str(&raw) {
            settings.insert(key, value);
        }
    }
    Ok(settings)
}

/// Creates or replaces a single setting.
#[tauri::command]
pub fn set_setting(db: State<'_, Db>, key: String, value: Value) -> AppResult<()> {
    let conn = db.conn()?;
    conn.execute(
        "INSERT INTO settings (key, value) VALUES (?1, ?2)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        params![key, value.to_string()],
    )?;
    Ok(())
}

/// Absolute path of the database file (shown in Settings, useful for backups).
#[tauri::command]
pub fn get_db_path(db: State<'_, Db>) -> String {
    db.path().display().to_string()
}
