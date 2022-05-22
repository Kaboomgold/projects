<?php
    namespace Autherization {

        use DataBase\Editor\DB_Table_Editor;
        use DataBase\Querys\Create_Table_Query;
        use DataBase\Querys\Create_Table_Column_Query;
        use DataBase\Querys\SQL\SQL_Data_Types;
        use Debug\Debug;

        /**
         * Create autherization tables.
         * user table with username hashed password e-mail
         * database connection
         */

        class Autherization {

            public function __construct()
            {   
                $this->create_users_table();
            }

            public function autherize(string $user_name, string $password, string $email) {

            }


            private function create_users_table() {
                $users_table_query = new Create_Table_Query('users');
                $username_row = new Create_Table_Column_Query(
                    'username',
                    SQL_Data_Types::VARCHAR,
                    255
                );

                $users_table_query->add_column($username_row);

                Debug::log($username_row->get_sql(), 'queries');
                Debug::log($users_table_query->get_sql(), 'queries');
            }
        }
    }