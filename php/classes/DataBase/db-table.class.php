<?php

	namespace DataBase {
		use DataBase\Querys\DB_Table_Row;
		use DataBase\Querys\Create_Table_Query;

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
				$this->generate_sql();
				// $this->GenerateHTML();
			}

			// protected function GenerateHTML() {
			// 	$headings = $this->tableHeaders;

			// 	array_push($headings, 'delete');

			// 	foreach($this -> tableValues as &$tableContent){
			// 		$rowId = [];//$tableContent[$headings[0]];

			// 		for($i = 0; $i < count($tableContent); $i++) {
			// 			$rowId[] = $tableContent[$headings[$i]];
			// 		}

			// 		$tableContent['delete'] = '<input type="checkbox" class="delete-toggle" rowid="'.htmlspecialchars(json_encode($rowId)).'">';
			// 	}

			// 	$this->caption = $this->name;
			// 	$this->BuildTable($this -> tableValues, $headings);
			// }

			private function generate_sql() {
				$db_t_q = new Create_Table_Query('test');

				foreach($this -> tableValues as $value) {
					$index = 0;

					foreach($value as $header => $val) {
						$row_header = $this -> tableHeaders[$index];
					
						preg_match_all('/^\w+|(?<=\().+(?=\))/', $row_header['Type'], $matches);
						$type = $matches[0][0];
						$length = $matches[0][1];
						// echo '<pre>'.print_r($row_header, true).'</pre>';

						if($row_header['Key'] == 'PRI') {
							$row_header['Key'] = 'PRIMARY';
						}

						// $db_t_q->add_row(
						// 	new DB_Table_Row($header, $type, $length, $row_header['Key'])
						// );

						$index++;
					}

				}

				$this -> table_sql = $db_t_q -> get_sql();
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
				$test = $this->database->Prepare("DESCRIBE $this->name");
				$test->execute();
				$this->tableHeaders = $test->fetchAll(\PDO::FETCH_ASSOC);
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