<?php
include_once '../colorizer/colorizer.php';

$script_name = json_decode($_POST['ajax_data'], true)['script_name'];

$colorizer = new ScriptColorizer();
$CS = $colorizer -> ColorizeScript('../../src/'.$script_name);

echo $CS -> GetList();
