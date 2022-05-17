<?php
    function validate(string $key, array $superGlobal) : bool {
        return (isset($superGlobal[$key]))? !empty($superGlobal[$key]) : false; 
    }

    try {
        $db = new PDO('mysql:host=localhost;dbname=klussen', 'root', 'usbw');
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

    if(validate('product-names', $_GET)){

        $productNames = json_decode($_GET['product-names']);
        $stmt = $db->prepare("INSERT INTO product (productnummer, producttype) VALUES (null, ?);");

        try {
            $db->beginTransaction();
            foreach($productNames as $product){
                $stmt->execute([$product[0]]);
            }
            $db->commit();
        } catch(Exception $e){
            $db->rollback();
            throw $e;
		}
    }

    if(validate('delete-values', $_GET)){
        $deleteValues = json_decode($_GET['delete-values']);
        
        $stmt = $db->prepare("DELETE FROM product WHERE productnummer = ?;");

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

    $db = null;
?>