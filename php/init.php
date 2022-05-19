<?php
namespace Main {
    use Project\Projects_Manager;
    use Utility\AutoLoaders\Autoload_Controller;
    use DataBase\Editor\DB_Editor;
    use DataBase\Querys\DB_Table_Row;
    use DataBase\Querys\DB_Table_Column;
    use DataBaseEditor;

    class Main {

        public function __construct()
        {
            $this -> include_files();
            $this -> database_test();
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

            $table_row = new DB_Table_Row([
                'age' => 22,
                'name' => 'eloy',
                'smart' => true
            ]);

            $table_row->headers = ['age', 'name', 'smart'];

            $table_column = new DB_Table_Column('age', 'int', 8, false);

            echo '<pre>'.print_r($table_column->get_sql(), true).'</pre>';
        }

        public function get_projects() {
            $pm = new Projects_Manager('./projects');
            return $pm -> Getprojects();
        }
    }
}