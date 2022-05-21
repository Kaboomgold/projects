<?php
    namespace DataBase\Editor {
        use DataBase\DataBase;
        use DataBase\DB_Table;
        use DataBase\Querys\Create_Table_Query;

        Class DB_Editor extends DataBase {

            public function GetAllTablesNames() {
                try {
                    $this->IsOpen();     
                } catch (\Exception $e) {
                    echo 'Caught exception: '.$e->getMessage();
                    exit();
                }

                $stmt = $this->dataBase->query('SHOW TABLES');
                $tables = $stmt->fetchAll(\PDO::FETCH_COLUMN);

                if($this->prefix != null) {
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

            public function GetTable(string $tableName) {
                try {
                    $this->IsOpen();
                } catch (\Exception $e){
                    echo 'Caught exception: '.$e->getMessage();
                    exit();
                }

                $this -> Open();
                $table = new DB_Table($tableName, $this->dataBase);
                $this -> Close();

                return $table;  
            }

            public function DropTable($tableName) {
                $sql = "DROP TABLE $tableName ";
                $stmnt = $this->dataBase->prepare($sql);
                $stmnt->execute();
            }

            public function CreateTable(Create_Table_Query $table) {
                $sql = $table->get_sql();
                $stmnt = $this->dataBase->prepare($sql);
                $stmnt->execute();
            }
        }
    }
?>