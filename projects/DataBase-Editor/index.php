<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Product-Editor</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<form action="databaseViewer.php" method="POST" id="login-form">
			<label for="db-name">Name DataBase:</label>
			<input type="text" name="db-name" id="db-name" placeholder="required" required>
			
			<label for="db-host">Host:</label>
			<input type="text" name="db-host" id="db-host" placeholder="required" required>
			
			<fieldset>
				<legend>Log in</legend>
				<label for="db-username">Username:</label>
				<input type="text" name="db-username" id="db-username" >
			
				<label for="db-password">Password:</label>
				<input type="password" name="db-password" id="db-password">
			</fieldset>
			
			<label for="db-prefix">Table Prefix:</label>
			<input type="text" name="db-prefix" id="db-prefix" >

			<input type="submit" value="Connect">
			</form>
	</body>
</html>