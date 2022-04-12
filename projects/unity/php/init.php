<?php
include_once '../../php/utility.php';
include_once './php/colorizer/colorizer.php';

define('SCRIPTS_DIR', './src/scripts');

$files = FileHandler::GetFilesFromDir('./pages');
$scripts = FileHandler::GetFilesFromDir(SCRIPTS_DIR);

$cp = new ScriptColorizer();

foreach($scripts as $script) {
    $colorized_scripts[] = $cp->ColorizeScript(SCRIPTS_DIR.'/'.$script);
}