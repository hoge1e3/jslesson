<?php
/*define('CURRY_PATH', realpath(dirname(__FILE__) . '/php/curry'));
set_include_path(implode(PATH_SEPARATOR, array(
	CURRY_PATH,
	get_include_path(),
)));*/


$qs=$_SERVER["QUERY_STRING"];
$action=preg_replace("/&.*/","",$qs);
if (isset($_POST["action"])) $action=$_POST["action"];
$actions=array(
    "login"=>"login.php",
    "teacher"=>"teacher.php",
    "teacher2"=>"php/teacher/teacher2.php",
    "showTimeline"=>"showTimeline.php",
    "showClass"=>"php/teacher/showClass.php",
    "makeClass"=>"php/teacher/makeClass.php",
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
    "dummy"=>"hoge"
);
if (isset($actions[$action])) {
    require_once $actions[$action];
} else {
    echo "Action $action not found. Add '$action' to \$actions in a.php";
}
?>