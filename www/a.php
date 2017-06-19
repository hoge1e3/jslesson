<?php
// Branch: master
require_once __DIR__."/config/config.php";
require_once __DIR__."/php/Modules.php";
req("ErrorHandler");
//require_once __DIR__."/php/ErrorHandler.php";
function redirect($url,$params=null) {
    header("Location: a.php?$url&$params");
}
if (isset($argv[1]) && $argv[1]!="") {
    $qs=$argv[1];
    req("MySession");
    MySession::startWith($argv[2]);
} else {
    $qs=$_SERVER["QUERY_STRING"];
}
$action=preg_replace("/&.*/","",$qs);

if (isset($_POST["action"])) $action=$_POST["action"];
if (preg_match("/=/",$action)) {
    $action="";
}
$actionAry=explode("/",$action);
if (count($actionAry)==2) {
    $action=$actionAry[0];
    $method=$actionAry[1];
    $controller=$action."Controller";
    req($controller);
    $controller::$method();
    return;
}
$actions=array(
    "login"=>"login.php",
    "teacher"=>"teacher.php",
    "teacher2"=>"php/teacher/teacher2.php",
    "showTimeline"=>"showTimeline.php",
    "showClass"=>"php/teacher/showClass.php",
    "makeClass"=>"php/teacher/makeClass.php",
    "dump2"=>"php/dump2.php",
    "grep"=>"grep.php",
    "Mkvec"=>"php/analysis/Mkvec.php",
    "DetectFile"=>"php/analysis/DetectFile.php",
    "MkScoreSheet"=>"php/analysis/MkScoreSheet.php",
    "MkCluster"=>"php/analysis/MkCluster.php",
    "Score"=>"php/analysis/Score.php",
    "AddScoreInfo"=>"php/analysis/AddScoreInfo.php",
    "TagVsCluster"=>"php/analysis/TagVsCluster.php",
    "runit"=>"php/runit.php",
    "test"=>"php/test/test.php",
    "resetRequests"=>"php/teacher/resetRequests.php",
    ""=>"index.html",
    "dummy"=>"hoge"
);
if (isset($actions[$action])) {
    require_once $actions[$action];
    if (isset($method)) {
        $controller=$action."Controller";
        $controller::$method();
    }
} else {
    echo "Action $action not found. Add '$action' to \$actions in a.php";
}
?>
