<?php
// This file should NOT place in httpd-reachable folder!

define("PDO_DSN","sqlite:".BA_DATA."/db/db2.sqlite3");
define("PYTHON_PATH","C:\\bin\\python.bat");
define("SUPER_PYTHON","superpython");
define("PYTHON_WORK",BA_DATA."/pythonwork/");

define("SHADOW_ALGO","sha256");
define("SHADOW_SALT","hogefuga");

define("ENC_PASS",1);
define("ENC_ALGO","openssl:AES-128-ECB");
define("ENC_KEY","fugahoge");

define("PAUTH_SERVER","http://localhost/sakumon/?Login/responsePAuth");

define("PHP_WORK","phpwork/");
define("PHP_URL","http://localhost/phpwork/{USER}/{PROJECT}/{FILE}");

require(__DIR__."/config.shadow.php");
/*
define('CONSUMER_KEY', 'XXX');
define('CONSUMER_SECRET', 'YYY');
define('TOKEN_URL', 'https://accounts.google.com/o/oauth2/token');
define('AUTH_URL', 'https://accounts.google.com/o/oauth2/auth');
define('INFO_URL', 'https://www.googleapis.com/oauth2/v1/userinfo');
define('CALLBACK_URL', 'http://localhost/?OAuth/login');
*/

//define("PDO_USER","");
//define("PDO_PASS","");

/*
define("BA_DATA", "/path/to/badata");
define("BA_LOG", BA_DATA."/log");
define("BA_FS",  BA_DATA."/fs");
define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");

define("PDO_DSN","mysql:host=localhost;dbname=bitarrow;charset=utf8mb4");
define("PDO_USER","XXX");
define("PDO_PASS","XXX");

define("SUPER_PYTHON","super");
define("PYTHON_WORK",BA_DATA."/pythonwork");
define("PYTHON_PATH","/path/to/pythonjs.sh");

*/

?>
