<?php

include_once '../../../../php/utility.php';
$scripts = FileHandler::GetFilesFromDir('../../src/scripts');
echo json_encode($scripts);