<?php

class Asset_Info {
    static $asset_info_folder = '';
    static $allowed_sections = [
        'description'
    ];

    private string $file_path = '';
    private string $name = '';
    private $file_handle = null;
    private array $asset_info = [];

    public function __construct(string $name) {
        $this -> name = $name;
        $this -> file_path = self::$asset_info_folder.$this->name."-info.json";

        $this -> load_info();
    }

    public function get_info() {
        return $this -> asset_info;
    }

    private function save() {
        $file_handle = fopen($this -> file_path, "r+");
        fwrite($file_handle, json_encode($this -> asset_info));
        fclose($file_handle);
    }

    private function load_info() {
        $size = (filesize($this -> file_path) > 0)? filesize($this -> file_path) : 1;

        $file_handle = fopen($this -> file_path, "r+");
        $info = json_decode(fread($file_handle, $size), true);
        fclose($file_handle);

        var_dump(filesize($this -> file_path));

        if($info != null) {
            $this -> asset_info = $info;
        }
    }

    public function add_info_section(string $key, string $value) {
        $this -> asset_info[$key] = $value;
        $this -> save();
    }
}