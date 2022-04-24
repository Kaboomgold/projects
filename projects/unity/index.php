<?php include_once './php/init.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Unity Asset Container</title>

    <!-- META -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- STYLESHEETS -->
    <link rel="stylesheet/less" type="text/css" href="../../css/style.less">
    <link rel="stylesheet/less" type="text/css" href="./css/style.less">

    <!-- SCRIPTS -->
    <script src="https://cdn.jsdelivr.net/npm/less@4"></script>
    <script src="../../js/main.js" type="module"></script>
    <script src="./js/main.js" type="module"></script>
    
</head>
<body>

    <header>
        <h1>Unity</h1>
    </header>

    <nav class="category-menu">
        <ul>
            <li>
                <a href="../../index.php">[<-]</a>
            </li>
            <li>
                <a href="#scripts-page" class="active">scripts</a>
            </li>
            <li>
                <a href="#three-d-assets-page">3D assets</a>
            </li>
        </ul>
    </nav>

    <main>
        <div class="pages">
            <?php 
                foreach ($pages as $pageName) {
                    include_once './pages/'.$pageName;
                } 
            ?>
        </div>
    </main>
</body>
</html>