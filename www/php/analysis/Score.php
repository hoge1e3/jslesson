<?php
require_once __DIR__."/ScoreUtil.php";
/*require_once __DIR__."/../fs/NativeFS.php";
require_once __DIR__."/../fs/SFile.php";
require_once __DIR__."/../ErrorHandler.php";


$scoreDir=new SFile(new NativeFS("./"),"/scoreSheet/score/");*/
$cmd=$_POST["cmd"];
$digest=$_POST["digest"];
$f=ScoreUtil::scoreFile($digest);
if ($cmd=="write") {
    $f->text($_POST["data"]);
} else {
    header("Content-type","text/json;charset=utf8");
    if ($f->exists()) echo $f->text();
    else echo "{}";
}

/*function scoreFile($digest) {
    global $scoreDir;
    $m=md5($digest);
    return $scoreDir->rel($m);
}*/

?>