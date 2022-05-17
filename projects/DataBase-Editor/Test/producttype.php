
<?php
    include_once 'include/helper.php';

    try {
        $db = new PDO('mysql:host=localhost;dbname=klussen', 'root', 'usbw');
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

    $sql = "SELECT * FROM producttype WHERE 1";
    $producttype = $db->prepare($sql);
    $producttype->execute();

    $producttypes = $producttype->fetchAll();

    for($i = 0; $i < count($producttypes); $i++){
        removeAssosiativeArrayElements($producttypes[$i]);
        array_push($producttypes[$i], '<input type="checkbox" class="delete-toggle" data="'.$producttypes[$i][0].'">');
    }

    $db = null;
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Kussen DB editor</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/producttype.js" defer type="module"></script>
    </head>
    <body>
        <div id="product-table">
        <?=generateTable($producttypes, ['producttypenummer', 'naam', 'prijs', 'voorraad', 'hoeveelheid', 'delete']);?>
        </div>

        <a href="index.php">index</a>
    </body>
</html>