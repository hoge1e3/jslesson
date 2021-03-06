<?php
require_once "php/Modules.php";
require_once "php/fs/NativeFS.php";
require_once "php/auth.php";
require_once "php/ErrorHandler.php";

$fs=Auth::getFS();
header("Content-type: text/json");

if (!isset($_POST["base"])) {
    die("Specify base");
}
$base=$_POST["base"];
if (!isset($_POST["data"])) {
    die("Specify data");
}
$data=json_decode($_POST["data"]);
if (!$data) {
    die("Invalid JSON data: ".substr($_POST["data"],0,500));
}
$excludes=param("excludes","[]");
$excludes=json_decode($excludes);
foreach ($data as $path=>$cont) {
//print "cont $cont";
    $fp=PathUtil::rel($base, $path);
    if (isset($cont->{"trashed"})) {
        if ($fs->exists($fp)) $fs->rm($fp);
    } else {
        $fs->setContent($fp,$cont->{"text"});
        $fs->setMetaInfo($fp,array("lastUpdate"=>$cont->{"lastUpdate"}) );
    }
}
//header("Content-type: text/plain");
//print "OK";
require_once "php/getDirInfoLib.php";
print json_encode( getDirInfo($base,$excludes) );

//print $_POST["data"];

?>
