<?php
    namespace Autherization {

        use Autherization\Tables\DB_Table_Editor_Users;
        use DataBase\Editor\DB_Editor;
        use DataBase\Querys\Create_Table_Query;
        use DataBase\Querys\Create_Table_Column_Query;
        use DataBase\Querys\SQL\SQL_Constraints;
        use DataBase\Querys\SQL\SQL_Data_Types;

        class Autherization {

            private $database_editor = null;
            private $db_table_editor_users = null;
            private $users_table_name = 'users';

            public $table_created = false;

            public function __construct()
            {   
                $this->database_editor = new DB_Editor('projects', 'localhost', 'root', '');
                $this->db_table_editor_users = $this->database_editor->get_table($this->users_table_name, DB_Table_Editor_Users::class);
                
                \Debug::log(($this->db_table_editor_users->remove_user('Eloy Bartels')));
                
                $this->create_users_table();
                // $this->register_user('Eloy Bartels', 'eloy12', 'eloybartels@hotmail.com');
            }

            public function autherize_user(string $user_name, string $password) {

                $table_rows = $this->db_table_editor_users->get_values();

                foreach($table_rows as $row) {

                }
            }

            public function validate_user(string $user_name, string $password)  {
                $table_rows = $this->db_table_editor_users->get_values();

                // foreach($table_rows as $row) {
                //     if(password_verify($password, $row['password'])) {

                //     }
                // }

            }

            public function log_user_in(string $username, string $password) {

            }

            public function register_user(string $username, string $password, string $e_mail) : bool {
                $user_exists = $this->db_table_editor_users->user_exists($username);

                if(!$user_exists) {
                    $this->db_table_editor_users->insert_user($username, $password, $e_mail);
                    return true;
                } 

                return false;
            }


            private function create_users_table() {
                $users_table_query = new Create_Table_Query($this->users_table_name);

                $id_column = new Create_Table_Column_Query('id', SQL_Data_Types::INTEGER, 11);
                $id_column->add_auto_increment();
                $id_column->add_constraint(SQL_Constraints::PRIMARY_KEY);

                $users_table_query->add_column_obj($id_column);
                $users_table_query->add_column('username', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('password', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('e_mail', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('created_at', SQL_Data_Types::DATETIME);

                $this->table_created = $this->database_editor->create_table($users_table_query);
            }
        }
    }