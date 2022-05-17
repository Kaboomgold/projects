<?php
	namespace DataBase\Editor {
		use DataBase\DB_Table;

		class DB_Table_Editor extends DB_Table {

			public function AddRow(array $rowValues) {
				$this->Open();
				$headers = $this->tableHeaders;

				$query = "INSERT INTO $this->name (`".$headers[0]."`";
				if(count($headers) > 1){
					for($i = 1; $i < count($headers); $i++){
						$query .= ", `$headers[$i]`";
					}
				}

				$query .= ") VALUES (?";
				if(count($rowValues) > 1){
					for($i = 1; $i < count($rowValues); $i++){
						$query .= ',?';
					}
				}
				$query .= ');';

				
				$stmnt = $this->dataBase->prepare($query);
				$stmnt->execute($rowValues);
				$this->Close();
				$this->GenerateHTML();
			}

			public function RemoveRow(array $rowValues) {

				$this->Open();

				$identifier = $this->headers[0];
				$query = "";

				if(is_array($rowValues)){
					if(count($rowValues) == 0){
						$this->Close();
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

				$stmnt = $this->dataBase->prepare($query);

				$stmnt->execute();
				$this->GenerateHTML();

				$this->Close();
			}
		}
	}
?>