<?php


namespace Main {
    use Utility\AutoLoaders\Autoload_Controller;

    class Main {

        public function __construct()
        {
            $this -> include_files();
        }

        private function include_files() {
            include_once './php/classes/utility/autoloader.class.php';
            Autoload_Controller::recursive_include('./php', [
                'database' => 100,
                'html-table' => 95,
                'db-table' => 50,
            ]);
        }

        public function get_projects() {
            $pm = new \Projects_manager('./projects');
            return $pm -> Getprojects();
        }
    }
}