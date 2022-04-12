<?php
class FileHandler {
    static function GetFilesFromDir(string $dir) {
        $files = scandir($dir, 1);
        unset($files[count($files)-1], $files[count($files)-1]);
        return $files;
    }
}