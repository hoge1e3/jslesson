<?php
// Set the value to the www directory
//define("BA_WWW","../www");

require("../www/config/config.php");
require("../www/php/Modules.php");

req("TeacherController");

if (count($argv)<3) {
   print "Usage: $argv[0] mailaddr password\n";
   exit;
}
TeacherController::regSysAd($argv[1], $argv[2]);
