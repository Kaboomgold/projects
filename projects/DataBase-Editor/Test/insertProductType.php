<?php
    function validate(string $key, array $superGlobal) : bool {
        return (isset($superGlobal[$key]))? !empty($superGlobal[$key]) : false; 
    }

    try {
        $db = new PDO('mysql:host=localhost;dbname=klussen', 'root', 'usbw');
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

    if(validate('product-types', $_GET)){

        $productNames = json_decode($_GET['product-types']);
        
        $stmt = $db->prepare("INSERT INTO producttype (producttypenummer, naam, prijs, voorraad, hoeveelheid) VALUES (?, ?, ? ,? ,?);");

        try {
            $db->beginTransaction();

            foreach($productNames as $product){
                $stmt->execute([null, $product[1], $product[2], $product[3], $product[4]]);
            }

            $db->commit();
        } catch(Exception $e){
            $db->rollback();
            throw $e;
		}
    }

    if(validate('delete-values', $_GET)){
        $deleteValues = json_decode($_GET['delete-values']);
        
        $stmt = $db->prepare("DELETE FROM producttype WHERE producttypenummer = ?;");

        try {
            $db->beginTransaction();

            foreach($deleteValues as $deleteValue){
                $stmt->execute([$deleteValue]);
            }

            $db->commit();
        } catch(Exception $e){
            $db->rollback();
            throw $e;
		}
    }

    $db = null;
?>