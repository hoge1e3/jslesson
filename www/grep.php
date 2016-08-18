<?php
$file=$_GET["file"];
$word=$_GET["word"];
$around=50;

require_once __DIR__."/php/auth.php";
require_once __DIR__."/php/fs/NativeFS.php";
if (!Auth::isTeacher()) {
    echo ("alert('study more!');</script>");
    exit(0);
}

?>