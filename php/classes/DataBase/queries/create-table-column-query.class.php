<?php
    namespace DataBase\Querys {
        class Create_Table_Column_Query {

            private $headerName = '';
            private $type = '';
            private $length = '';
            private $constraints = [];
            private $auto_increment = '';
            

            public function __construct(string $headerName, string $type, string $length){
                $this->headerName = $headerName;
                $this->type = $type;
                $this->length = $length;
            }

            public function add_constraint(string $constraint) {
                $this->constraints[] = $constraint;
            }

            public function add_auto_increment($start_value = 0) {
                $this->auto_increment = ' AUTO_INCREMENT';

                if($start_value != 0) {
                    $this->auto_increment .= "=$start_value";
                }
            }

            public function get_sql(){
                $sqlTableRow = " $this->headerName $this->type";

                if(!empty($this->length)){
                    $sqlTableRow .= "($this->length)";
                }

                foreach($this->constraints as $constraint) {
                    $sqlTableRow .= " $constraint";
                }

                $sqlTableRow .= $this->auto_increment;

                return $sqlTableRow;
            }

            public function get_primary_key() {

            }
        }
    }