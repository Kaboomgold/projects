<?php
namespace Main {

    use Autherization\Autherization;
    use Project\Projects_Manager;
    use Utility\AutoLoaders\Autoload_Controller;
    use DataBase\Editor\DB_Editor;

    class Main {

        public function __construct()
        {
            $this -> include_files();
            $this -> database_test();

            \Debug::show();
        }

        private function include_files() {
            include_once './php/classes/utility/autoloader.class.php';
            Autoload_Controller::recursive_include('./php', [
                'database' => 100,
                'html-table' => 99,
                'db-table' => 98,
                'db-table-editor' => 97
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