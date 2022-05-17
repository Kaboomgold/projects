<?php
	include_once 'include/DataBase/DBTableEditor.php';
	include_once 'include/Utility/Utility.php';

	if(Utility::validate('table-data', $_POST)){
		
		$tableData = json_decode($_POST['table-data'], true);
		$tableName = $tableData['table-name'];
		$insertValues = $tableData['item-list'];
		$deleteValues = $tableData['delete-values'];

		$postData = json_decode($tableData['post-data'], true);
		$mainDB = new DBTableEditor($tableName, [$postData['db-name'], $postData['db-host'], $postData['db-username'], $postData['db-password']]);


		foreach($insertValues as $insertValue){

			$mainDB->AddRow($insertValue);
		}
		


		$mainDB->RemoveRow($deleteValues);
		echo $mainDB->GetHTMLMarkup();
	}


?>