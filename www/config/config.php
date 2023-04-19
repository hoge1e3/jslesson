<?php
//define("BA_TOP_URL", "http://localhost/");
define("BA_WWW",dirname(__DIR__));
//   You must set BA_DATA to data directory, it is recommended that BA_DATA cannot access via http
define("BA_DATA", "/var/www/data/bitarrow");
define("DOCKER_WORK", "/var/www/data/dpy/work");
define("DOCKER_IMAGE", "matplotlib10");
//define("DOCKER_IMAGE", "python");
define("DOCKER_TASKRUN", "/dpy/taskrun.py");
define("DOCKER_TIMEOUT", 10);
//define("BA_DATA", dirname(__DIR__)."/../data");
//define("BA_DATA", dirname(__DIR__));

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
define("BA_PUB_URL", $ba_top_url."/pub");

define("PHP_WORK","/var/www/data/php/html/");
define("PHP_URL","https://cho.is.meisei-u.ac.jp/bp_{CLASS}/{USER}/{PROJECT}/{FILE}");
if (empty($_SERVER["HTTPS"])){
    // http
} else {
    // https
      

}


// You should define PDO_* in BA_DATA/config.php to protect passowrd
require_once(BA_DATA."/config.php");
define("NTK_CLASS","notekey");

 ?>
