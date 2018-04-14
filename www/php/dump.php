<?php
require_once "php/auth.php";

date_default_timezone_set('Asia/Tokyo');
$user=Auth::curUser();
$class=Auth::curClass();
$data=$_POST["data"];
$fp=fopen(BA_LOG."/$class-$user-data.txt","a");
$time=date(DATE_ATOM);
fwrite($fp, "--TIME--\n$time\n");
fwrite($fp, "--USER--\n$user\n");
fwrite($fp, "--CLASS--\n$class\n");
fwrite($fp, "--DATA--\n$data\n");
fclose($fp);
echo "Dump OK\n";
?>
