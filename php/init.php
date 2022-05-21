<?php
namespace Main {
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
            $db_e = new DB_Editor('test', 'localhost', 'root', '');

            $db_e -> Open();
            $test_table = $db_e->GetTable('test');
            $db_e -> Close();

            Debug::log(['simple'=>'test'], 'test');
            Debug::show();
        }

        public function get_projects() {
            $pm = new Projects_Manager('./projects');
            return $pm -> Getprojects();
        }
    }
}