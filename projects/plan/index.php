<?php include_once "./src/classes/main.class.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planner</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/main.js" type="module" defer></script>
    <link rel="stylesheet" href="css/generate/style.css">
</head>
<body>
    <?=Debugger::GetDebuggerInfo(); ?>
    
    <div id="paper-sheet"> 
        <canvas width="10000" height="10000" style="pointer-events: none;"></canvas>
    </div>
    <div id="menu">
        <h1>Menu</h1>
        <div id="menu-options">
        </div>
    </div>

    <div class="item"></div>
</body>
</html>