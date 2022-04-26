<?php
// Set the value to the www directory
define("BA_WWW","../www");

require(BA_WWW."/config/config.php");
require(BA_WWW."/php/Modules.php");

req("TeacherController");

if (count($argv)<3) {
   print "Usage: $argv[0] mailaddr password";
   exit;
}
TeacherController::regSysAd($argv[1], $argv[2]);
