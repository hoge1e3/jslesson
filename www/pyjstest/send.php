<?php
//$sourceDir = dirname(__DIR__);
$file="output.json";

$fp=fopen($file,"w");
fwrite($fp, $_POST["content"]);
fclose($fp);
print "OK";
