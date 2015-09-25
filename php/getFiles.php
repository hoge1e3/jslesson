<?php
require_once "json.php";
require_once "PathUtil.php";
require_once "NativeFS.php";
require_once "auth.php";
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
    $c=$fs->getContent($fp);
    $info=$fs->getMetaInfo($fp);
    $info["text"]=$c;
    $data[$path]=$info;
}
header("Content-type: text/json");
print $json->encode(array(base=>$base, data=>$data));

?>