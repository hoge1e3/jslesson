<?php

require_once __DIR__."/../ErrorHandler.php";
require_once __DIR__."/../json.php";
require_once __DIR__."/../auth.php";
require_once __DIR__."/../fs/SFile.php";

$prj=$_GET["project"];
$fs=Auth::getFS();
$prjD=(new SFile($fs,Auth::homeDir()))->rel($prj);
$files=$prjD->listFiles();
$j=new Services_JSON();
$vecs=array();
foreach ($files as $file) {
    $vec=array();
	$c=$file->text();
	preg_replace_callback("/[a-zA-Z0-9]+/",function ($a) {
    	global $vec;
    	//print $a[0]."\n";
    	if (!isset($vec[$a[0]])) $vec[$a[0]]=0;
    	$vec[$a[0]]++;
    },$c);
    $vecs[$file->name()]=$vec;
}
print $j->encode($vecs);
?>