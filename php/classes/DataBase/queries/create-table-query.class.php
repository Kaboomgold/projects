<?php
    namespace DataBase\Querys {
        class Create_Table_Query {
            private $name = '';
            private $tableValues = '';
            private $table_rows = [];
            private $row_count = 0;

            public function __construct(string $tableName) {
                $this->name = $tableName;
            }

            public function add_row(Create_Table_Column_Query $row){
                $this-> table_rows[] = $row;
                $this->row_count++;
            }

            public function get_sql() : string {
                $table_query = "CREATE TABLE $this->name (\n\r";

                foreach($this->table_rows as $curr_count => $table_row) {
                    $table_query .= $table_row->get_sql();

                    if($this->row_count-1 == $curr_count) {
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