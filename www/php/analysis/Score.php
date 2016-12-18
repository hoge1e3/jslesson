<?php
require_once __DIR__."/ScoreUtil.php";
/*require_once __DIR__."/../fs/NativeFS.php";
require_once __DIR__."/../fs/SFile.php";
require_once __DIR__."/../ErrorHandler.php";


$scoreDir=new SFile(new NativeFS("./"),"/scoreSheet/score/");*/
require_once __DIR__."/TagUtil.php";
require_once __DIR__."/../json.php";

if (isset($_GET["cmd"]) && $_GET["cmd"]=="tags") {
    echo json_encode(TagUtil::tagList($_GET["cmt"]));
    exit;
}
$cmd=$_POST["cmd"];
$digest=$_POST["digest"];
$f=ScoreUtil::scoreFile($digest);
if ($cmd=="write") {
    $data=$_POST["data"];
    $f->text($data);
    $o=json_decode($data);
    TagUtil::add($o->com);
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