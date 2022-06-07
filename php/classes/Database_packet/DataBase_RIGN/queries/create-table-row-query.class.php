<?php
    namespace DataBase\Querys {
        /**
         * Create a row 
         */
        class Create_Table_Row_Query {
            
            private $values;
            public $tableName = '';
            public $headers = [];
            public $primary_header = null;

            public function __construct($values){
                $this -> values = $values;
            }

            public function validate_header(string $header) {
                if(!isset($this->values[$header])) {
                    
                }
            }

            public function get_sql(){
                $values_count = count($this->values)-1;
                $curr_values_count = 0;
                $sqlTableRow = '(';

                foreach($this->values as $header => $value) {

                    if($this->primary_header !== null) {
                        $sqlTableRow .= ' NULL ';
                    }

                    if($curr_values_count == $values_count) {
                        $sqlTableRow .= $this->values[$header];
                    } else {
                        $sqlTableRow .= $this->values[$header].', ';
                    }
                    
                    $curr_values_count++;
                }

                $sqlTableRow .= ');';


                return $sqlTableRow;
            }

            public function get_primary_key() {

            }
        }
    }