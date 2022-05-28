<?php
	namespace DataBase\Editor {
		use DataBase\DB_Table;
    use PDOException;

		class DB_Table_Editor extends DB_Table {

			public function add_row(array $rowValues) {
				$rowValuesCount = count($rowValues)-1;
				$query = "INSERT INTO $this->name VALUES (";

				for($i = 0; $i <= $rowValuesCount; $i++) {
					$query .= ($i != $rowValuesCount)? '?,' : '?);';
				}
				
				$stmnt = $this->database->prepare($query);
				$stmnt->execute($rowValues);
			}

			public function remove_row(array $rowValues) {
				$identifier = $this->headers[0];
				$query = "";

				if(is_array($rowValues)){
					if(count($rowValues) == 0){
						return;
					}
					for($i = 0; $i < count($rowValues); $i++){
						$query .= "DELETE FROM $this->name WHERE ";

						$row = json_decode($rowValues[$i]);

						for ($x = 0; $x < count($row); $x++) {
							

							if(!($x == count($row) - 1)){
								$query .= '`'.$this->headers[$x].'` = \''.$row[$x].'\' AND ';
							} else {
								$query .= '`'.$this->headers[$x].'` = \''.$row[$x].'\';';
							}
						}
					}
				}

				$stmnt = $this->database->prepare($query);

				$stmnt->execute();

			}
		}
	}
?>