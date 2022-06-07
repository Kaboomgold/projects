<?php


namespace Utility\AutoLoaders {

    class Autoloader_Recursive {

        private $dir = '';
        private $priority = [];
        private $file_paths = [];
        private $filtered_file_paths = [];
        private $ignore_tag = '';

        /**
         * Includes all php files starting from the root dir.
         * 
         * @param string $dir 
         * Root directory where the scan starts from.
         * 
         * @param array $priority 
         * An associative array with as key the file name and as value the score.
         * Files with higher scores will be included first.
         * 
         * @param string $ignore_tag
         * The tag used to indicate witch files or folders should not be included using this class.
         * The tag should be part of the filename or foldername in order for it to take effect.
         * If a folder has this tag in its name all subdirectories and files there in will be ignored.
         */
        public function __construct(string $dir, array $priority = [], string $ignore_tag = '_RIGN') {
            $this -> dir = $dir;
            $this -> priority = $priority;
            $this -> ignore_tag = $ignore_tag;

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

                if(preg_match("/$this->ignore_tag/", $path)) {
                    continue;
                }

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
                    if(preg_match('/'.$file_name.'\.(?!:\.php)/', $path['path'])) {
                        $path['score'] = $score;
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