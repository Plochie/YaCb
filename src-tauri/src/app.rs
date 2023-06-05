fn main() {
    if let Some(proj_dirs) = ProjectDirs::from("com", "Foo Corp", "Bar App") {
        proj_dirs.config_dir();
        // Lin: /home/alice/.config/barapp
        // Win: C:\Users\Alice\AppData\Roaming\Foo Corp\Bar App\config
        // Mac: /Users/Alice/Library/Appli cation Support/com.Foo-Corp.Bar-App
    }
}
