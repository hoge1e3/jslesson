<?php

require_once __DIR__."/../ErrorHandler.php";
require_once __DIR__."/../json.php";
require_once __DIR__."/../auth.php";
require_once __DIR__."/../fs/SFile.php";
require_once __DIR__."/../fs/NativeFS.php";
require_once __DIR__."/VecUtil.php";
require_once __DIR__."/LogUtil.php";


$fs=new NativeFS(BA_LOG."/");
$logD=new SFile($fs,"/");
$files=$logD->listFiles();
$j=new Services_JSON();
$class=Auth::curClass();
#print $class;

$vec=$logD->rel("$class-vector.json");
if (!$vec->exists()) {
    ?>Run <a href="a.php?MkCluster">MkCluster</a><?php
    return;
}
$vecs=$vec->obj();
$cluster=new VecCluster($vecs);
$count=0;
foreach ($files as $file) {
    if ($file->startsWith($class) && $file->endsWith("-data.log")) {
        $data=array_map(function ($line) {
            global $count,$cluster;
            $e=json2array($line);
            $code=LogUtil::detectProgram($e);
            $vec=VecUtil::mkvec($code);
            $a=$cluster->nearest($vec);
            $e["nearest"]=$a[0];
            $e["dist"]=$a[1];
            /*if (isset($e["code"])) {
                $code=$e["code"];
                if (is_array($code)) {
                    $e["nearest"]=array();
                    $e["dist"]=array();
                    foreach ($code as $k=>$c) {
                        $v=VecUtil::mkvec($c);
                        $a=$cluster->nearest($v);
                        $e["nearest"][$k]=$a[0];
                        $e["dist"][$k]=$a[1];
                    }
                } else {
                    $v=VecUtil::mkvec($e["code"]);
                    $e["nearest"]=$cluster->nearest($v);
                }
                if ($count++<100) {
                //    print htmlspecialchars(json_encode($e))."\n";
                }
            }*/
            return json_encode($e);
        },$file->lines());
        $file->sibling("new/")->rel($file->name())->lines($data);
	}
}
print "Done! Check log/new/*.log and copy them to log/";
?>
