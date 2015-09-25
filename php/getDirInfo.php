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


function getDirInfo2($path, $base) {
    global $fs;
    $dst=array();
    if (!$fs->exists($path)) return $dst;
    $files=$fs->ls($path);
    foreach ($files as $e) {
        $fp=PathUtil::rel($path, $e);
        if ($fs->isDir($fp)) {
            $dst+=getDirInfo2($fp, $base);
        } else {
            $dst[PathUtil::relPath( $fp,$base )]=$fs->getMetaInfo($fp);
            //$dst+=array( PathUtil::relPath( $fp,$base ) => $fs->getMetaInfo($fp) );
        }
    }
    return $dst;
}
function getDirInfo($path) {
    $data=getDirInfo2($path,$path);
    return array(base=>$path, data=>$data);
}
//print $json->encode( $fs->ls("Tonyu/Projects/") );
print $json->encode( getDirInfo($base, $base) );

?>