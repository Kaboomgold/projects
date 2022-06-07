<?php

	namespace DataBase {

		use DataBase\Editor\DB_Table_Editor;

		class DB_Table {
			use \DataBase\HTML\HTML_Table;

			protected $name;
			protected $tableHeaders;
			protected $database = null;
			private $tableValues = null;
			private $table_sql = null;
			private $editor = null;

			public function __construct($tableName, $pdo){
				$this->database = $pdo;
				$this->name = $tableName;

				$this->get_values();
				$this->get_headers();
			}

			protected function get_table_as_html() {
				$this->caption = $this->name;
				$this->build_table($this -> tableValues, $this->tableHeaders);
				return $this->get_html_markup();
			}

			private function generate_sql() {

				foreach($this -> tableValues as $value) {
					$index = 0;

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
				$this->tableValues = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $this->tableValues;
			}

			public function get_headers() {
				$headers = $this->database->prepare("DESCRIBE $this->name");
				$headers->execute();
				$this->tableHeaders = $headers->fetchAll(\PDO::FETCH_ASSOC);
			}

			public function GetHeaders() : array {
				return $this->tableHeaders;
			}

			public function get_editor() : DB_Table_Editor {
				if($this->editor == null) {
					$this->editor = new DB_Table_Editor($this->name, $this->database);
				}

				return $this->editor;
			}

			public function get_query_result(string $sql, $fetch_type = \PDO::FETCH_ASSOC) {
				$stmt = $this->database->prepare($sql);
				$stmt->execute();
				return $stmt->fetchAll($fetch_type);
			}
		}
	}
?>