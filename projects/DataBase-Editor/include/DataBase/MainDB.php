<?php
	include_once 'DataBaseEditor.php';
    include_once 'include/Utility/Utility.php';
	
	$mainDB = null;

	if(Utility::validate('db-name', $_POST) && 
		Utility::validate('db-host', $_POST) && 
		Utility::validate('db-username', $_POST)) {

		$DBLogin = new DataBaseLogin($_POST['db-name'], $_POST['db-host'], $_POST['db-username'], $_POST['db-password']);
		$mainDB = new DataBaseEditor($DBLogin->GetLogin());

		if(Utility::validate('db-prefix', $_POST)){
			$mainDB->prefix = $_POST['db-prefix'];
		}
	}

	if($mainDB == null){
		//header('Location: index.php');
	}
	
?>