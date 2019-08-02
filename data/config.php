<?php
// This file should NOT place in httpd-reachable folder!

define("PDO_DSN","sqlite:".BA_DATA."/db/db2.sqlite3");
define("PYTHON_PATH","C:\\bin\\python.bat");
define("SUPER_PYTHON","superpython");
define("PYTHON_WORK",BA_DATA."/pythonwork/");

define("SHADOW_ALGO","sha256");
define("SHADOW_SALT","hogefuga");

define("ENC_PASS",0);
define("ENC_ALGO","openssl:AES-128-ECB");
define("ENC_KEY","fugahoge");

//define("PDO_USER","");
//define("PDO_PASS","");

?>
