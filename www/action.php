<?php
if (isset($_GET["action"])) $action=$_GET["action"];
if (isset($_POST["action"])) $action=$_POST["action"];
$actions=array(
    "login"=>"login.php",
    "teacher"=>"teacher.php",
    "showTimeline"=>"showTimeline.php",
    "grep"=>"grep.php",
    "Mkvec"=>"php/analysis/Mkvec.php"
);
if (isset($actions[$action])) {
    require_once $actions[$action];
} else {
    echo "Action $action not found";
}
?>