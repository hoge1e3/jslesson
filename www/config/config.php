<?php

//   You must set BA_DATA to data directory, it is recommended that BA_DATA cannot access via http
define("BA_DATA", dirname(__DIR__)."/../data");
//define("BA_DATA", dirname(__DIR__));

//define("BA_TOP", dirname(__DIR__));
define("BA_LOG", BA_DATA."/log");
define("BA_FS",  BA_DATA."/fs");
define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");

$ba_top_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$ba_top_url = preg_replace("/\\?.*/","",$ba_top_url);
$ba_top_url = preg_replace("/[^\\/]*$/","",$ba_top_url);
// ^This method is not perfect. It is recommeded that you set the URL directly.
// $ba_top_url="http://example.com/path/to/ba/";
define("BA_TOP_URL", $ba_top_url);
define("BA_PUB_URL", $ba_top_url.BA_PUB);

// You should define PDO_* in BA_DATA/config.php to protect passowrd
require_once(BA_DATA."/config.php");


 ?>
