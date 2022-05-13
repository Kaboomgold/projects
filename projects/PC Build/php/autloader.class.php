<?php

class Autoloader {
    static function recursive_include(string $dir) {
        $paths = new RecursiveTreeIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS));
    
        $file_paths = [];
        foreach($paths as $path) {
            if(preg_match('/\.php/', $path)) {
                $remove_apendix = preg_replace('/.+(?=\.\/php)/', '', $path);
                $file_paths[] = preg_replace('/\\\/', '/', $remove_apendix);
            }
        }
    
        foreach($file_paths as $path) {
            require_once $path;
        }
    }
}