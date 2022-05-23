<?php

	namespace DataBase {
		use PHP_Debug\Debug;

		class DB_Table {
			use \DataBase\HTML\HTML_Table;

			protected $name;
			protected $tableHeaders;
			private $database = null;
			private $tableValues = null;
			private $table_sql = null;

			public function __construct($tableName, $pdo){
				$this -> database = $pdo;

				$this->name = $tableName;
				$this->get_values();
				$this->get_headers();
				// $this->generate_sql();
			}

			protected function get_table_as_html() {
				$this->caption = $this->name;
				$this->build_table($this -> tableValues, $this->tableHeaders);
				return $this->get_html_markup();
			}

			private function generate_sql() {

				foreach($this -> tableValues as $value) {
					$index = 0;
					Debug::log($this -> tableHeaders, 'row headers');

					foreach($value as $header => $val) {
						$row_header = $this -> tableHeaders[$index];
					
						preg_match_all('/^\w+|(?<=\().+(?=\))/', $row_header['Type'], $matches);

						$type = $matches[0][0];
						$length = $matches[0][1];

						if($row_header['Key'] == 'PRI') {
							$row_header['Key'] = 'PRIMARY';
						}

						$index++;
					}

				}
			}

			public function get_sql() {
				return $this -> table_sql;
			}

			public function get_values() {
				$stmt = $this->database->prepare("SELECT * FROM $this->name WHERE 1");
				$stmt->execute();
				$this -> tableValues = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			}

			public function get_headers() {
				$headers = $this->database->prepare("DESCRIBE $this->name");
				$headers->execute();
				$this->tableHeaders = $headers->fetchAll(\PDO::FETCH_ASSOC);
			}
				
			public function GetArray() : array {
				return $this->array;
			}

			public function GetHeaders() : array {
				return $this->tableHeaders;
			}
		}
	}
?>