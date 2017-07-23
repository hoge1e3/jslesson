<?php

define("BA_TOP", dirname(__DIR__));
define("BA_LOG", BA_TOP."/log");
define("BA_FS",  BA_TOP."/fs");
define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");

$ba_top_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$ba_top_url = preg_replace("/\\?.*/","",$ba_top_url);
$ba_top_url = preg_replace("/[^\\/]*$/","",$ba_top_url);
// ^This method is not perfect. It is recommeded that you set the URL directly.
// $ba_top_url="http://example.com/path/to/ba/";
define("BA_TOP_URL", $ba_top_url);
define("BA_PUB_URL", $ba_top_url.BA_PUB);

define("PDO_DSN","sqlite:".BA_TOP."/db/db2.sqlite3");
//define("PDO_USER","");
//define("PDO_PASS","");

 ?>
