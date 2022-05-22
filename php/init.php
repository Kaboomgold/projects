<?php
namespace Main {

    use Autherization\Autherization;
    use Project\Projects_Manager;
    use Utility\AutoLoaders\Autoload_Controller;
    use DataBase\Editor\DB_Editor;
    use Debug\Debug;

    class Main {

        public function __construct()
        {
            $this -> include_files();
            $this -> database_test();

            // $Directory = new \RecursiveDirectoryIterator('./php');
            // echo '<>'

            Debug::log('There are three settings.');

            Debug::show();
        }

        private function include_files() {
            include_once './php/classes/utility/autoloader.class.php';
            Autoload_Controller::recursive_include('./php', [
                'database' => 100,
                'html-table' => 95,
                'db-table' => 50,
            ]);
        }

        private function database_test() {
            $auth = new Autherization();
        }

        public function get_projects() {
            $pm = new Projects_Manager('./projects');
            return $pm -> Getprojects();
        }
    }
}