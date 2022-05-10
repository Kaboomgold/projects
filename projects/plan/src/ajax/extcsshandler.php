<?php
include_once '../classes/csseditor.class.php';

$content = file_get_contents('php://input');

echo $content;

$ajax_data = json_decode($content, true);

$cssEditor = new CSSEditor();

$cssEditor -> AddStyleGroup($ajax_data['selector'], $ajax_data['properties']);
?>