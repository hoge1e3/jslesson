<?php
require_once "json.php";
require_once "PathUtil.php";
require_once "NativeFS.php";
require_once "auth.php";
$dstfs=Auth::getFS(); 
$srcfs=new NativeFS("../fs/home/lesson_samples/lesson_samples");
header("Content-type: text/json");
if (!$dstfs) {
   print '{"NOT_LOGGED_IN":1}';
   exit;
}
$json=new Services_JSON;

if (!isset($_GET["src"]) || !isset($_GET["dst"])) {
    $res=array();
    foreach ($srcfs->ls("/") as $prj) {
        $prj=PathUtil::truncSep($prj);
        if ($srcfs->exists("/$prj/options.json") ) {
            array_push($res, $prj);
        }
    }
    print $json->encode($res);
    exit();
}
$dstdir="/".$_GET["dst"]."/";
$srcdir="/".$_GET["src"]."/";
copyFiles($srcdir, $dstdir); 
function copyFiles($sd,$dd) {
    global $srcfs,$dstfs;
    //print "copydir $sd $dd<BR>\n";
    foreach ($srcfs->ls($sd) as $fn) {
        $sfp=PathUtil::rel($sd, $fn);
        $dfp=PathUtil::rel($dd, $fn);
        //print "copy $sfp $dfp<BR>\n";
        if ($srcfs->isDir($sfp)) {    
            copyFiles($sfp, $dfp);   
        } else {
            $dstfs->setContent($dfp, $srcfs->getContent($sfp));
        }
    }
}
print $json->encode('{"DONE":1}');

?>