<?php
    include_once './php/autloader.class.php';
    Autoloader::recursive_include('./php/');

    use PC_Builder\PC\PC_Part\Processor as Processor;


    $intel_core_i7_10700KF = new Processor\Processor('intel_core_i7_10700KF', 329);
    $intel_core_i7_10700KF -> set_stats([
        Processor\Processor::$CLOCK_SPEED => 3.8,
        Processor\Processor::$OVERCLOCKABLE => true,
        Processor\Processor::$TURBO_SPEED => 5,
        Processor\Processor::$MAXIMUM_POWER_CONSUMPTION => 125,
        Processor\Processor::$CACHE_MEMORY => 16,
        Processor\Processor::$SOCKET => '1200(10th gen intel)',
        Processor\Processor::$CORES => 8,
        Processor\Processor::$THREADS => 16
    ]);

    echo '<pre>'.print_r($intel_core_i7_10700KF -> get_stats(), true).'</pre>';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>