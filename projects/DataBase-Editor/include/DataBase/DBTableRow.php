<?php

	class DBTableRow {
		private $headerName = '';
		private $type = '';
		private $length = '';
		private $index = '';
		
		public $defaultValue = '';
		public $colation = '';
		public $attributes = '';
		public $empty = false;
		public $AI = false;
		public $remarks = '';
		public $isLast = false;

		public function __construct(string $headerName, string $type, string $length, string $index){
			$this->headerName = $headerName;
			$this->type = $type;
			$this->length = $length;
			$this->index = $index;
		}

		public function GetRowAsString(){
			$sqlTableRow = " $this->headerName $this->type";

			if(!empty($this->length)){
				$sqlTableRow .= " ( $this->length ) ";
			}

			if($this->AI && !empty($this->index)){
				$sqlTableRow .= " AUTO_INCREMENT ";
			}

			if(!empty($this->index)) {
				$sqlTableRow .= "$this->index KEY";
			}

			if($this->isLast == false){
				$sqlTableRow .= ",";
			}

			return $sqlTableRow;
		}
	}

	class DBTableQuery {
		private $name = '';
		private $tableQueryString = '';
		private $tableValues = '';

		public function __construct(string $tableName) {
			$this->name = $tableName;
		}

		public function AddRow(DBTableRow $row){
			$this->tableValues .= $row->GetRowAsString();
		}

		public function GetTableQuery() : string {
			return "CREATE TABLE $this->name ( $this->tableValues );";
		}

		public function GetTableName() {
			return $this->name;
		}
	}


?>