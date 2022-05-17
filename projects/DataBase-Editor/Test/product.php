
<?php
    include_once 'include/helper.php';

    try {
        $db = new PDO('mysql:host=localhost;dbname=klussen', 'root', 'usbw');
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

    $sql = "SELECT * FROM product WHERE 1";
    $product = $db->prepare($sql);
    $product->execute();

    $producten = $product->fetchAll();

    for($i = 0; $i < count($producten); $i++){
        removeAssosiativeArrayElements($producten[$i]);
        array_push($producten[$i], '<input type="checkbox" class="delete-toggle" data="'.$producten[$i][0].'">');
    }


    $db = null;
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Kussen DB editor</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/product.js" defer type="module"></script>
    </head>
    <body>
        <div id="product-table">
            <?=generateTable($producten, ['productnummer', 'producttype', 'delete']);?>
        </div>
        <a href="index.php">index</a>
    </body>
</html>