<?php
include_once '../../php/utility.php';
include_once './php/colorizer/colorizer.php';

define('SCRIPTS_DIR', './src/scripts');

$pages = FileHandler::GetFilesFromDir('./pages');
$scripts = FileHandler::GetFilesFromDir(SCRIPTS_DIR);
$model_names = FileHandler::GetFilesFromDir('./src');

$sripts_structure = FileHandler::GetFileStucture(SCRIPTS_DIR);
$models_structure = FileHandler::GetFileStucture('./src');

function CreateFileMenu(array $arr, $folder_name = '') {

    $html = '<ul class="menu">';

    foreach($arr as $folder_name => $item) {
        if(is_array($item)) {
            $html .= '<li class="sub-menu"><div class="folder"><p>'.$folder_name.'</p></div>'.CreateFileMenu($item, $folder_name).'</li>';
        } else {
            $html .= '<li><div class="file" ><p>'.$item.'</p></div></li>';
        }
    }

    $html .= '</ul>';
    return $html;
}

$cp = new ScriptColorizer();

foreach($scripts as $script) {
    $colorized_scripts[] = $cp->ColorizeScript(SCRIPTS_DIR.'/'.$script);
}

function preparePageName(string $pageName, bool $replaceSpaces = true) : string {

    $addSpaces = $pageName;

    if($replaceSpaces) {
        $addSpaces = preg_replace("/\-/", ' ', $pageName);
    }
    $removeExstension = preg_replace("/\.php/", "", $addSpaces);
    return $removeExstension;
}