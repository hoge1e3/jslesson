<?php
require_once "php/Modules.php";
require_once "php/fs/NativeFS.php"; #TOFS
require_once "php/auth.php";
require_once "php/ErrorHandler.php";
$fs=Auth::getFS();
header("Content-type: text/json");
if (!$fs) {
   print '{"NOT_LOGGED_IN":1}';
   exit;
}
if (!isset($_GET["base"])) {
    die("Specify base");
}
$base=$_GET["base"];
$excludes=param("excludes","[]");
$excludes=json_decode($excludes);
require_once "php/getDirInfoLib.php";
//try {
    //print $json->encode( $fs->ls("Tonyu/Projects/") );
    $inf=getDirInfo($base, $excludes);
    $inf["user"]=Auth::curUser();
    $inf["class"]=Auth::curClass();
    print json_encode( $inf );
/*}catch(Exception $e) {
    die($e);
}*/
?>
