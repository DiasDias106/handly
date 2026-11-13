mod db;
mod error;
mod modules;

use tauri::Manager;

use modules::settings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let data_dir = app.path().app_data_dir()?;
            let db = db::Db::open(&data_dir).map_err(|e| format!("{e:?}"))?;
            app.manage(db);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            settings::get_settings,
            settings::set_setting,
            settings::get_db_path,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
