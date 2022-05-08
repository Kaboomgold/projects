<?php include_once './php/init.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asset Container</title>
    <link rel="stylesheet/less" type="text/css" href="./css/style.less">
    <script src="https://cdn.jsdelivr.net/npm/less@4"></script>
    <script src="./js/main.js" type="module"></script>
</head>
<body>
    <header>
        <h1>Projects</h1>
        <hr>
    </header>

    <div id="projects">

        <?php foreach($projects as $project) { 
            $info = $project -> GetInfo();
            ?>
            <div class="project">
                <div class="image">
                    <img src="" alt="">
                </div>
                <div class="name">
                    <h2><?=$project->Name(); ?></h2>
                </div>
                <div class="description">
                    <p><?=$info['description']; ?></p>
                </div>
                <a href="<?=$project->GetUrl(); ?>"></a>
            </div>
        <?php } ?>

    </div>
</body>
</html>