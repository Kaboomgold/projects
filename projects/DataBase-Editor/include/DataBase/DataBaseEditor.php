<?php
    include_once 'DataBase.php';

	Class DataBaseEditor extends DataBase {
        public function GetAllTablesNames() {
            try {
                $this->IsOpen();     
			} catch (Exception $e){
                echo 'Caught exception: '.$e->getMessage();
                exit();
			}

            $stmt = $this->dataBase->query('SHOW TABLES');
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);


            if($this->prefix != null){
                $prefixedTables = [];
                
                foreach ($tables as $table) {
                    if(preg_match("/$this->prefix/", $table)){
                        array_push($prefixedTables, $table);           
					}            
				}    
                
                $tables = $prefixedTables;
			}

            return $tables;
		}

        public function GetTable(string $tableName) : Table {
            try {
                $this->IsOpen();
			} catch (Exception $e){
                echo 'Caught exception: '.$e->getMessage();
                exit();
			}

            return new DBTable($tableName, $this->dataBase);  
		}

        public function DropTable($tableName) {
            $sql = "DROP TABLE $tableName ";
            $stmnt = $this->dataBase->prepare($sql);
            $stmnt->execute();
		}

        public function CreateTable(DBTableQuery $table) {
            $sql = $table->GetTableQuery();
            $stmnt = $this->dataBase->prepare($sql);
            $stmnt->execute();
		}
	}
?>