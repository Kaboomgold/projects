<?php
    namespace DataBase {
        class DataBase {

            private $name;
            protected $dataBase;
            private $host;
            private $userName;
            private $password;
            private $isOpen = false;
            public $prefix;

            public function __construct(string $name, string $host, string $userName, string $password) {
                $this->name = $name;
                $this->host = $host;
                $this->userName = $userName;
                $this->password = $password;
            }

            public function GetDataBase(){
                return $this->dataBase;  
            }
            
            public function Open() {
                try {
                    $this->dataBase = new \PDO("mysql:host=$this->host;dbname=$this->name", $this->userName, $this->password);
                    $this->isOpen = true;
                } catch(\PDOException $e) {
                    echo $e->getMessage();
                    exit();
                }
            }

            public function Close() {
                $this->dataBase = null;
            }

            public function GetName() : string {
                return $this->name;  
            }

            protected function IsOpen() : bool {
                if($this->isOpen == false) {
                    throw new \Exception('The DataBase '.$this->name.' needs to be opened first.');     
                }
                return true;
            }
        }
    }
?>