<?php

class Autoloader {
    static $priority = [];

    static function recursive_include(string $dir, array $priority = []) {
        $paths = new RecursiveTreeIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS));
    
        $file_paths = [];
        foreach($paths as $path) {
            if(preg_match('/\.php/', $path)) {
                $remove_apendix = preg_replace('/.+(?=\.\/php)/', '', $path);
                $file_paths[] = [
                    'path' => preg_replace('/\\\/', '/', $remove_apendix),
                    'score' => 0
                ];
            }
        }

        foreach($priority as $file_name => $score) {
            foreach($file_paths as $key => &$path) {
                if(preg_match('/'.$file_name.'\.(?!:\.php)/', $path['path'])) {
                    $path['score'] = $score;
                }
            }
        }

        usort($file_paths, function($a, $b) {
            if($a['score'] == $b['score']) {
                return 0;
            }
            return ($a['score'] > $b['score'])? -1 : 1;
        });
        
        foreach($file_paths as $path) {
            require_once $path['path'];
        }
    }
}