<?php
class Project {
    static $projectFolder = '';
    private $projectPath = '';
    private $projectFiles = [];
    private $name = '';
    private $info = [];

    public function __construct($name) {
        $this->name = $name;
        $this->projectPath = $this::$projectFolder.'/'.$this -> name;

        $this -> Init();
    }

    private function info_defaults($info) {

        if(empty($info['description'])) {
            $info['description'] = '-';
        }

        return $info;
    }

    private function Init() {
        $this -> GetProjectFiles();
        $this -> ReadInfo();
    }

    public function Name() : string {
        return $this -> name;
    }

    public function getUrl() : string {
        return $this->projectPath.'/index.php';
    }

    public function GetInfo() {
        $info_clean = $this->info_defaults($this -> info);

        return $info_clean;
    }
    
    private function GetProjectFiles() {
        $projectFiles = scandir($this->projectPath);
        unset($projectFiles[0], $projectFiles[1]);

        $this -> projectFiles = $projectFiles;
    }

    private function ReadInfo() {
        if(in_array('info.json', $this->projectFiles)) {
            $file = file_get_contents($this->projectPath.'/info.json');
            $this -> info = json_decode($file, true);
        }
    }
}