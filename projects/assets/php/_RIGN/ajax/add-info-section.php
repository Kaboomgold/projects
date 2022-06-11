<?php
include_once '../../classes/asset-info.class.php';

if(!empty($_POST['ajax_data'])) {

    $data = json_decode($_POST['ajax_data'], true);

    $action = $data['action'];
    
    Asset_Info::$asset_info_folder = '../../../src/assets-info/';
    $asset_info = new Asset_Info($data['name']);

    if($action == 'add') {
        $id = $data['info_sections']['id'];
        $info = $data['info_sections']['info'];

        if(in_array($info['info_type'], Asset_Info::$allowed_sections)) {
            $asset_info->add_info_section($id, $info);
        }
    }

    if($action == 'remove') {
        $id = $data['info_sections']['id'];
        $asset_info -> remove_info_section($id);
    }

    if($action == 'remove_key') {
        $id = $data['info_sections']['id'];
        $keys = $data['info_sections']['key'];

        foreach($keys as $key) {
            $asset_info -> remove_info_section_key($id, $key);
        }
    }

    if($action == 'get') {
        echo json_encode($asset_info -> get_info());
    }

}