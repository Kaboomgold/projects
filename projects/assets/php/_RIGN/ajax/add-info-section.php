<?php
include_once '../../classes/asset-info.class.php';

if(!empty($_POST['ajax_data'])) {

    $data = json_decode($_POST['ajax_data'], true);

    $action = $data['action'];
    
    Asset_Info::$asset_info_folder = '../../../src/assets-info/';
    $asset_info = new Asset_Info($data['name']);

    if($action == 'add') {
        foreach($data['info_sections'] as $key => $value) {
            if(in_array($key, Asset_Info::$allowed_sections)) {
                $asset_info -> add_info_section($key, $value);
            }
        }
    }

    if($action == 'remove') {
        foreach($data['info_sections'] as $key => $value) {
            $asset_info -> remove_info_section($key);
        }
    }

    if($action == 'get') {
        echo json_encode($asset_info -> get_info());
    }

}