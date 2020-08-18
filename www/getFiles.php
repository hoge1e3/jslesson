<?php
require_once "php/Modules.php";
require_once "php/fs/NativeFS.php";
require_once "php/auth.php";
require_once "php/ErrorHandler.php";

$fs=Auth::getFS();

/*if (!isset($_POST["base"])) {
    die("Specify base");
}*/
$base=param("base");//$_POST["base"];
/*if (!isset($_POST["paths"])) {
    die("Specify paths");
}
$paths=json_decode($_POST["paths"]);*/
$paths=json_decode(param("paths"));
$data=array();
foreach ($paths as $path) {
    $fp=PathUtil::rel($base, $path);
    if ($fs->exists($fp)) {
        $c=$fs->getContent($fp);
        $info=$fs->getMetaInfo($fp);
        $info["text"]=$c;
    } else {
        $info=array("trashed"=>true);
    }
    $data[$path]=$info;
}
header("Content-type: text/json");
print json_encode(array("base"=>$base, "data"=>$data));

?>
