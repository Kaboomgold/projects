<?php
include_once '../classes/asset-info.class';

if(!empty($_POST['ajax-data'])) {

    $data = json_decode($_POST['ajax-data'], true);

    Asset_Info::$file_path = '../../src/assets-info.php';
    $asset_info = new Asset_Info($data['name']);

    foreach($data as $key => $value) {
        if($key == 'name') continue;

        if(in_array($key, Asset_Info::$allowed_sections)) {
            $asset_info -> add_info_section($key, $value);
        }
    }

}