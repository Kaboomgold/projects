<?php
    namespace DataBase\Querys {
        class Create_Table_Query {
            private $name = '';
            private $table_columns = [];
            private $table_rows = [];
            private $column_count = 0;
            private $headers = [];

            public function __construct(string $tableName) {
                $this->name = $tableName;
            }

            public function set_headers(array $headers) {
                $this -> headers = $headers;
            }

            public function add_column($header_name, $type, $length = '') {
                $column = new Create_Table_Column_Query($header_name, $type, $length);

                $this-> table_columns[] = $column;
                $this->column_count++;

                return $column;
            }

            public function add_column_obj(Create_Table_Column_Query $column) {

                $this-> table_columns[] = $column;
                $this->column_count++;

                return $column;
            }

            public function add_row($row) {
            }

            public function get_sql() : string {
                $table_query = "CREATE TABLE IF NOT EXISTS $this->name (\n\r";

                foreach($this->table_columns as $curr_count => $table_row) {
                    $table_query .= $table_row->get_sql();

                    if($this->column_count-1 == $curr_count) {
                        $table_query .= " \n\r";
                    } else {
                        $table_query .= ", \n\r";
                    }

                }

                return $table_query."); ";
            }

            public function get_table_name() {
                return $this->name;
            }
        }
    }