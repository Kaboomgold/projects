<?php

class Asset_Info {
    static $asset_info_folder = '';
    static $allowed_sections = [
        'description',
        'name',
        'function'
    ];

    private string $file_path = '';
    private string $name = '';
    private array $asset_info = [];
    private bool $file_exists = true;

    public function __construct(string $name) {
        $this -> name = $name;
        $this -> file_path = self::$asset_info_folder.$this->name."-info.json";
        $this -> file_exists = file_exists($this -> file_path);
        $this -> load_info();
    }

    public function get_info() {
        return $this -> asset_info;
    }

    private function save() {

        $dirname = dirname($this -> file_path);
        if (!is_dir($dirname))
        {
            mkdir($dirname, 0755, true);
        }

        $file_handle = fopen($this -> file_path, "w+");
        fwrite($file_handle, json_encode($this -> asset_info));
        fclose($file_handle);
    }

    private function load_info() {
        if(!$this -> file_exists) return;

        $file_handle = fopen($this -> file_path, "r");
        $size = (filesize($this -> file_path) > 0)? filesize($this -> file_path) : 1;
        $info = json_decode(fread($file_handle, $size), true);
        fclose($file_handle);

        if($info != null) {
            $this -> asset_info = $info;
        }
    }

    public function add_info_section($info_section_id, $info) {

        $this->asset_info[$info_section_id] = $info;
        // $this -> asset_info[$key] = $value;
        $this -> save();
    }

    public function remove_info_section(string $section_name) {
        if(!$this -> file_exists) return;

        unset($this -> asset_info[$section_name]);
        $this -> save();
    }

    public function remove_info_section_key($section_name, $key) {
        if(!$this -> file_exists) return;

        unset($this -> asset_info[$section_name]['values'][$key]);
        $this -> save();
    }
}