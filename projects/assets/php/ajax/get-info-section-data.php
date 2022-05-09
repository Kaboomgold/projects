<?php
include_once '../classes/asset-info.class';

if(!empty($_POST['ajax-data'])) {

    $data = json_decode($_POST['ajax-data'], true);

    Asset_Info::$file_path = '../../src/assets-info.php';
    $asset_info = new Asset_Info($data['name']);

    echo json_parse($asset_info -> get_info());

}