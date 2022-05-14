<?php
    include_once './php/autloader.class.php';
    Autoloader::recursive_include('./php/', [
        'pc' => 30,
        'pc-part' => 20
    ]);

    use PC_Builder\PC\PC_Part\Part\Motherboard;
    use PC_Builder\PC\PC_Part\Part\Processor;

    $intel_core_i7_10700KF = new Processor('intel_core_i7_10700KF', 329);
    $intel_core_i7_10700KF -> set_stats([
        Processor::CLOCK_SPEED => 3.8,
        Processor::OVERCLOCKABLE => true,
        Processor::TURBO_SPEED => 5,
        Processor::MAXIMUM_POWER_CONSUMPTION => 125,
        Processor::CACHE_MEMORY => 16,
        Processor::SOCKET => '1200',
        Processor::CORES => 8,
        Processor::THREADS => 16
    ]);

    $MSI_MPG_Z490_GAMING_PLUS = new Motherboard('MSI_MPG_Z490_GAMING_PLUS', 130);
    $MSI_MPG_Z490_GAMING_PLUS -> set_stats([
        Motherboard::MEMORY_SLOTS => 4,
        Motherboard::FORM_FACTOR => 'ATX',
        Motherboard::NUMBER_OF_MEMORY_CHANNELS => 2,
        Motherboard::CHIPSET => 'Intel Z490',
        Motherboard::MEMORY_SPEED => '4133',
        Motherboard::VOLTAGE_RAM => 1.35,
        Motherboard::SOCKET => '1200',
        Motherboard::PCI_EXPRESS_X1_SLOTS => 3,
        Motherboard::PCI_EXPRESS_X16_SLOTS => 2,
        Motherboard::AMD_CROSSFIREX => true,
        Motherboard::CASE_FAN_CONNECTORS => 8,
        Motherboard::CHIPSET_COOLER => 'Passive',
        Motherboard::AUDIO_PROCESSOR => 'Realtek ALC1220',
        Motherboard::NUMBER_OF_SUBWOOFER_CHANNELS => 1,
        Motherboard::NUMBER_OF_AUDIO_CHANNELS => 7,
        Motherboard::NUMBER_OF_M2_CONNECTORS => 2,
        Motherboard::RAID => 'JBOD, RAID 0, RAID 1, RAID 10',
        Motherboard::ETHERNET_SPEED => 2.5,
        Motherboard::NUMBER_OF_ETHERNET_PORTS => 1
    ]); 

    echo '<pre>'.print_r($intel_core_i7_10700KF -> get_stats(), true).'</pre>';
    echo '<pre>'.print_r($MSI_MPG_Z490_GAMING_PLUS -> get_stats(), true).'</pre>';
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