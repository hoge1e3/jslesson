<?php
require_once "json.php";
require_once "PathUtil.php";
require_once "NativeFS.php";
require_once "auth.php";
$fs=Auth::getFS(); //new NativeFS("../fs");
header("Content-type: text/json");
if (!$fs) {
   print '{"NOT_LOGGED_IN":1}';
   exit;
}
$json=new Services_JSON;

if (!isset($_GET["base"])) {
    die("Specify base");
}
$base=$_GET["base"];
require_once "getDirInfoLib.php";

//print $json->encode( $fs->ls("Tonyu/Projects/") );
print $json->encode( getDirInfo($base, $base) );

?>