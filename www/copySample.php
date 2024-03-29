<?php
require_once "php/Modules.php";
require_once "php/fs/NativeFS.php";
require_once "php/auth.php";
$fs=Auth::getFS();
header("Content-type: text/json");
if (!$fs) {
   print '{"NOT_LOGGED_IN":1}';
   exit;
}
$lessonDir="/home/lesson_samples/lesson_samples/";
if (!isset($_GET["src"]) || !isset($_GET["dst"])) {
    $res=array();
    foreach ($fs->ls($lessonDir) as $prj) {
        $prj=PathUtil::truncSep($prj);
        //echo "$lessonDir$prj/options.json";
        if ($fs->exists("$lessonDir$prj/options.json") ) {
            array_push($res, $prj);
        }
    }
    print json_encode($res);
    exit();
}
$dstdir=Auth::homeDir().$_GET["dst"]."/";
$srcdir=$lessonDir.$_GET["src"]."/";
copyFiles($srcdir, $dstdir);
function copyFiles($sd,$dd) {
    global $fs;
    foreach ($fs->ls($sd) as $fn) {
        $sfp=PathUtil::rel($sd, $fn);
        $dfp=PathUtil::rel($dd, $fn);
        //print "copy $sfp $dfp<BR>\n";
        if ($fs->isDir($sfp)) {
            copyFiles($sfp, $dfp);
        } else {
            $fs->setContent($dfp, $fs->getContent($sfp));
        }
    }
}
print json_encode('{"DONE":1}');

?>
