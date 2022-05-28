<?php
include_once './php/classes/file-handler.class.php';
include_once './php/colorizer/colorizer.php';


define('ASSETS_DIR', './src/assets');

$pages = FileHandler::GetFilesFromDir('./pages');
$model_names = FileHandler::GetFilesFromDir(ASSETS_DIR);

$models_structure = FileHandler::GetFileStucture(ASSETS_DIR, 10);

$file_id = 0;
function CreateFileMenu(array $arr, $folder_name = '') {
    global $file_id;

    $html = '<ul class="menu">';

    foreach($arr as $folder_name => $item) {
        if(is_array($item)) {
            $html .= '<li class="sub-menu"><div class="folder"><p>'.$folder_name.'</p></div>'.CreateFileMenu($item, $folder_name).'</li>';
        } else {
            $html .= '<li><div class="file" file-id="'.$file_id.'"><p>'.$item.'</p></div></li>';
            $file_id++;
        }
    }

    $html .= '</ul>';
    return $html;
}

function preparePageName(string $pageName, bool $replaceSpaces = true) : string {
    $addSpaces = $pageName;

    if($replaceSpaces) {
        $addSpaces = preg_replace("/\-/", ' ', $pageName);
    }
    $removeExstension = preg_replace("/\.php/", "", $addSpaces);
    return $removeExstension;
}