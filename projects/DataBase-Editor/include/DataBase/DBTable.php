<?php
	include_once 'DataBase.php';
	include_once 'include/General/Table.php';

	class DBTable extends DataBase {
		use Table2;

		protected $name;
		protected $tableHeaders;

		public function __construct($tableName, $login){
			parent::__construct($login);

			$this->name = $tableName;
			$this->GenerateHTML();
		}

		protected function GenerateHTML() {
			$this->Open();
			try {
				$stmt = $this->dataBase->prepare("SELECT * FROM $this->name WHERE 1");
				$stmt->execute();
				$tableContents = $stmt->fetchAll(PDO::FETCH_ASSOC);

				$test = $this->dataBase->Prepare("DESCRIBE $this->name");
				$test->execute();
				$this->tableHeaders = $test->fetchAll(PDO::FETCH_COLUMN);

				$headings = $this->tableHeaders;

				array_push($headings, 'delete');

				foreach($tableContents as &$tableContent){
					$rowId = [];//$tableContent[$headings[0]];

					for($i = 0; $i < count($tableContent); $i++) {
						$rowId[] = $tableContent[$headings[$i]];
					}

					$tableContent['delete'] = '<input type="checkbox" class="delete-toggle" rowid="'.htmlspecialchars(json_encode($rowId)).'">';
				}

				$this->caption = $this->name;
				$this->BuildTable($tableContents, $headings);
			} catch(PDOException $e){
				echo $e->getMessage();
			}
			$this->Close();
		}
			
		public function GetArray() : array {
			return $this->array;
		}

		public function GetHeaders() : array {
			return $this->tableHeaders;
		}
	}
?>