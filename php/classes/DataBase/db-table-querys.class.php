<?php
	namespace DataBase\Querys {
    	use Exception;

		class DB_Table_Row {
			
			private $values;
			public $tableName = '';
			public $headers = [];
			public $primary_header = null;

			public function __construct($values){
				$this -> values = $values;
			}

			public function validate_header(string $header) {
				if(!isset($this->values[$header])) {
					throw new Exception("$header does not exist!");
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

		class SQL_Keywords {

			const ADD = 'ADD';
			const ADD_CONSTRAINT = 'ADD_CONSTRAINT';

		}

		/**
		 * A class with constants of sql constraints with description.
		 */
		class SQL_Constraints {
			/** Ensures that a column cannot have a NULL value. */
			const NOT_NULL = 'NOT_NULL';

			/** Ensures that all values in a column are different. */
			const UNIQUE = 'UNIQUE';

			/** A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. */
			const PRIMARY_KEY = 'PRIMARY KEY';

			/** Prevents actions that would destroy links between tables. */
			const FOREING_KEY = 'FOREING KEY';

			/** Ensures that the values in a column satisfies a specific condition. */
			const Check = 'CHECK';

			/** Sets a default value for a column if no value is specified. */
			const DEFAULT = 'DEFAULT';

			/** Used to create and retrieve data from the database very quickly. */
			const CREATE_INDEX = 'CREATE INDEX';
		}

		class DB_Table_Column {

			private $headerName = '';
			private $type = '';
			private $length = '';
			private $index = '';

			private $auto_increment = '';
			
			public $AI = false;
			public $isLast = false;
			public $allow_null = true;

			public function __construct(string $headerName, string $type, string $length, string $index){
				$this->headerName = $headerName;
				$this->type = $type;
				$this->length = $length;
				$this->index = $index;
			}

			public function add_auto_increment($start_value = 0) {
				$this->auto_increment = 'AUTO_INCREMENT';

				if($start_value != 0) {
					$this->auto_increment .= "=$start_value";
				}
			}

			public function get_sql(){
				$sqlTableRow = " $this->headerName $this->type";

				if(!empty($this->length)){
					$sqlTableRow .= " ($this->length)";
				}

				if(!empty($this->index)) {
					$sqlTableRow .= "$this->index KEY";
				}

				$sqlTableRow .= $this->auto_increment;

				if($this->isLast == true){
					$sqlTableRow .= ",";
				} else {
					$sqlTableRow .= ";";
				}

				return $sqlTableRow;
			}

			public function get_primary_key() {

			}
		}

		class DB_Table_Query {
			private $name = '';
			private $tableValues = '';

			public function __construct(string $tableName) {
				$this->name = $tableName;
			}

			public function add_row(DB_Table_Column $row){
				$this->tableValues .= $row->get_sql();
			}

			public function get_table_query() : string {
				return "CREATE TABLE $this->name ( $this->tableValues );";
			}

			public function get_table_name() {
				return $this->name;
			}
		}
	}
?>