<?php
require_once "php/auth.php";

date_default_timezone_set('Asia/Tokyo');
$user=$_POST["user"];
$class="Nodepad";
$data=$_POST["data"];
$fp=fopen(BA_LOG."/$class-$user-data.log","a");
$time=date(DATE_ATOM);

fwrite($fp, "$data\n");
fclose($fp);
echo "Dump OK\n";
?>
