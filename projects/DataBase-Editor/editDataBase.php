<?php
	include_once 'include/DataBase/DataBaseEditor.php';
	include_once 'include/DataBase/DBTableRow.php';
	include_once 'include/Utility/Utility.php';
	
	if(Utility::validate('table-data', $_POST)) {
		
		$prepareData = json_decode($_POST['table-data'], true);
		$postData = json_decode($prepareData['post-data'], true);

		$mainDB = new DataBaseEditor([$postData['db-name'], $postData['db-host'], $postData['db-username'], $postData['db-password']]);
		
		$mainDB->Open();
		
		if($prepareData['state'] == 'REMOVE'){
			$mainDB->DropTable($prepareData['table-name']);
		}

		if($prepareData['state'] == 'ADD'){
			$table = new DBTableQuery($prepareData['table-name']);

			for( $i = 0; $i < count($prepareData['table-rows']); $i++){
				$row = new DBTableRow($prepareData['table-rows'][$i][0], $prepareData['table-rows'][$i][1], $prepareData['table-rows'][$i][2], $prepareData['table-rows'][$i][3]);

				$row->AI = $prepareData['table-rows'][$i][4];

				if($i == count($prepareData['table-rows']) - 1){
					$row->isLast = true;
				}

				$table->AddRow($row);
			}

			echo $table->GetTableQuery();
			$mainDB->CreateTable($table);
		}
		$mainDB->Close();
	}

?>