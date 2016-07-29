<?php
require_once "php/json.php";
require_once "php/fs/NativeFS.php";
require_once "php/auth.php";
require_once "php/ErrorHandler.php";

$fs=Auth::getFS(); //new NativeFS("../fs");
$json=new Services_JSON;

if (!isset($_POST["base"])) {
    die("Specify base");
}
$base=$_POST["base"];
if (!isset($_POST["paths"])) {
    die("Specify paths");
}
$paths=$json->decode($_POST["paths"]);
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
print $json->encode(array("base"=>$base, "data"=>$data));

?>