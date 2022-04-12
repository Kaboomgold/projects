<?php

define('MAIN_INIT_DIR', __FILE__);

include_once './php/classes/Project/Projects_manager.class.php';
include_once './php/classes/Project/Project.class.php';
include_once './php/utility.php';

$pm = new Projects_manager('./projects');
$projects = $pm -> Getprojects();