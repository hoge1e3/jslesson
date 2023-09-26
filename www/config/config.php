<?php
define("BA_TOP_URL", "http://localhost/");
define("BA_WWW",dirname(__DIR__));
//   You must set BA_DATA to data directory, it is recommended that BA_DATA cannot access via http
define("BA_DATA", dirname(__DIR__)."/../data");
// BA_SERVICE_URL: URL for server-side program accessed from published pages. 
//  It recommended that placed another domain and accessing using Virtual Host or Reverse Proxy.
//  The page of BA_SERVICE_URL looks like BA_TOP_URL but login should be prohibited.
define("BA_SERVICE_URL", "http://localhost/");
require_once(BA_DATA."/config.php");

 ?>
