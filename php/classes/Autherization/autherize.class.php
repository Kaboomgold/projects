<?php
    namespace Autherization {
        use DataBase\Editor\DB_Editor;
        use DataBase\Querys\Create_Table_Query;
        use DataBase\Querys\Create_Table_Column_Query;
        use DataBase\Querys\SQL\SQL_Constraints;
        use DataBase\Querys\SQL\SQL_Data_Types;
        use PHP_Debug\Debug;

        /**
         * Create autherization tables.
         * user table with username hashed password e-mail
         * database connection
         */

        class Autherization {

            private $database_editor;

            public $table_created = false;

            public function __construct()
            {   
                $this->database_editor = new DB_Editor('projects', 'localhost', 'root', '');
            }

            public function autherize_user(string $user_name, string $password, string $e_mail) {

            }

            public function register_user(string $user_name, string $password, string $e_mail) {
                

            }


            private function create_users_table() {
                $users_table_query = new Create_Table_Query('users');

                $id_column = new Create_Table_Column_Query('id', SQL_Data_Types::INTEGER, 11);
                $id_column->add_auto_increment();
                $id_column->add_constraint(SQL_Constraints::PRIMARY_KEY);

                $users_table_query->add_column_obj($id_column);
                $users_table_query->add_column('username', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('password', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('e_mail', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('created_at', SQL_Data_Types::DATETIME);

                $this->table_created = $this->database_editor->CreateTable($users_table_query);
            }
        }
    }