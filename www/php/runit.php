<?php

require_once __DIR__."/auth.php";
require_once __DIR__."/ErrorHandler.php";

$home=Auth::home();
$prj=$home->rel("/_test_run/");
$files=json_decode($_POST["files"], JSON_OBJECT_AS_ARRAY);
foreach ($files as $name=>$cont) {
    $prj->rel($name)->text($cont);
}
echo"/index.html?r=jsl_edit&dir=".$prj->path().
"&autoexec=".$_POST["autoexec"];


?>
