<?php include_once './php/init.php'; 
    use Assets\Main;
    use Autherization\AuthFormHandling;

    $main = new Main();
?>

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
    <?php if($main->user_is_logged_in()) { 
        ?> <script src="./js/main-admin.js" type="module"></script> <?php
    }?>
    
</head>
<body>
    <header>
        <h1>Assets</h1>
    </header>

    <nav class="category-menu">
        <ul>
            <li>
                <a href="../../index.php">Projects</a>
            </li>

        <?php if(count($main->pages) > 1) {
                foreach ($main->pages as $page_name) { ?>
                <li><a href="#<?=$main->prepare_page_name($pageName, false); ?>-page"><?=$main->prepare_page_name($page_name, true); ?></a></li>
            <?php } } ?>
        </ul>
    </nav>

    <main>
        <?php 
            \Debug::log('test');
            if($main->user_is_logged_in()) {
                AuthFormHandling::get_logout_form();
            } else {
                AuthFormHandling::get_login_form();
            }
        ?>

        <div class="pages">
            <?php 
                foreach ($main->pages as $pageName) {
                    include_once './pages/'.$pageName;
                } 
            ?>
        </div>
    </main>
</body>
</html>