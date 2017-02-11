<?php
require_once __DIR__."/ScoreUtil.php";
require_once __DIR__."/LogUtil.php";

//echo ScoreUtil::$scoreDir->path();

$fs=LogUtil::getLogFiles();
foreach ($fs as $f) {
    $ls=LogUtil::readLog($f);
    $mod=false;
    foreach ($ls as $i=>$l) {
        $d=ScoreUtil::digest($l);
        $sf=ScoreUtil::scoreFile($d);
	    if ($sf->exists()) {
            $ls[$i]["score"]=$sf->obj();
            $mod=true;
        }
    }
    if ($mod) {
        LogUtil::writeJSONLines($f->sibling("new/")->rel($f->name()),$ls);
    }
}
?>