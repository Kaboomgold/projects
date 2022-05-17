<?php


namespace Utility\AutoLoaders {
    class Autoload_Controller {
        static function recursive_include(string $dir, array $priority = []) {
            $AL = new \Utility\AutoLoaders\Autoloader_Recursive();
            $AL -> init($dir, $priority);
        }
    }

    class Autoloader_Recursive {

        private $dir = '';
        private $priority = [];
        private $file_paths = [];
        private $filtered_file_paths = [];

        public function init(string $dir, array $priority) {
            $this -> dir = $dir;
            $this -> priority = $priority;

            $this -> get_file_paths();
            $this -> filter_file_paths();
            $this -> set_score();
            $this -> sort_by_score();
            $this -> include_files();
        }

        private function get_file_paths() {
            $this -> file_paths = new \RecursiveTreeIterator(
                new \RecursiveDirectoryIterator($this -> dir, \RecursiveDirectoryIterator::SKIP_DOTS));
        }

        private function filter_file_paths() {
            foreach($this -> file_paths as $index => $path) {
                if(preg_match('/\.php/', $path)) {
                    $remove_apendix = preg_replace('/.+(?=\.\/php)/', '', $path);
                    $this->filtered_file_paths[] = [
                        'path' => preg_replace('/\\\/', '/', $remove_apendix),
                        'score' => 0
                    ];
                }
            }
        }

        private function set_score() {
            foreach($this -> priority as $file_name => $score) {
                foreach($this->filtered_file_paths as $key => &$path) {

                    if($file_name == 'ign') {
                        // if(preg_match('/'.$score.'\.(?!:\.php)/', $path['path'])) {
                        //     unset($path['score']);
                        // }
                    } else {
                        if(preg_match('/'.$file_name.'\.(?!:\.php)/', $path['path'])) {
                            $path['score'] = $score;
                        }
                    }
                }
            }
        }

        private function sort_by_score() {
            usort($this->filtered_file_paths, function ($a, $b) {
                if($a['score'] == $b['score']) {
                    return 0;
                }
                return ($a['score'] > $b['score'])? -1 : 1;
            });
        }

        private function include_files() {
            foreach($this->filtered_file_paths as $path) {
                require_once $path['path'];
            }
        }

    }
}