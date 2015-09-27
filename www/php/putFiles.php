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
if (!isset($_POST["data"])) {
    die("Specify data");
}
$data=$json->decode($_POST["data"]);
foreach ($data as $path=>$cont) {
//print "cont $cont";
    $fp=PathUtil::rel($base, $path);
    if (isset($cont["trashed"])) {
        $fs->rm($fp);
    } else {
        $fs->setContent($fp,$cont["text"]);
        $fs->setMetaInfo($fp,array(lastUpdate=>$cont["lastUpdate"]) );
    }
}
header("Content-type: text/plain");
print "OK";
//print $_POST["data"];

?>