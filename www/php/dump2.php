<?php
require_once "php/auth.php";

date_default_timezone_set('Asia/Tokyo');
$user=Auth::curUser();
$class=Auth::curClass();
$data=$_POST["data"];
$fp=fopen(BA_LOG."/$class-$user-data.log","a");
if (isset( $_SERVER["REMOTE_ADDR"] )) {
    $o=json_decode($data);
    $o->ip=$_SERVER["REMOTE_ADDR"];
    $data=json_encode($o);
}

$time=date(DATE_ATOM);

fwrite($fp, "$data\n");
fclose($fp);
echo "Dump OK\n";
?>
