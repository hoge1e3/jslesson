<?php
// This file should NOT be placed in httpd-reachable folder!

define("BA_LOG", BA_DATA."/log");
define("BA_FS",  BA_DATA."/fs");
define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");
define("BA_MIGRATION", BA_DATA."/migration");
//define("NEWS","<a href='https://bitarrow.eplang.jp/'>NEWS: KOWARETA</a>");
//define("MAINTENANCE","KOWARETEIMASU");
//$ba_top_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//$ba_top_url = preg_replace("/\\?.*/","",$ba_top_url);
//$ba_top_url = preg_replace("/[^\\/]*$/","",$ba_top_url);
// ^This method is not perfect. It is recommeded that you set the URL directly.
// $ba_top_url="http://example.com/path/to/ba/";
//define("BA_TOP_URL", $ba_top_url);
define("BA_PUB_URL", BA_SERVICE_URL."fs/pub");

// You should define PDO_* in BA_DATA/config.php to protect passowrd


define("PDO_DSN","sqlite:".BA_DATA."/db/db2.sqlite3");
define("PYTHON_PATH","C:\\bin\\python.bat");
define("SYSTEM_EX_OUT","c:\\bin\\out.txt");
define("PDO_LOG","C:\\bin\\pdo.log");
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

define("BA_MAIL", "bitarrow@example.com");
define("RESET_TEACHER_PASS_ALTERNATE",<<<EOF
<a href="">Visit here to reset teacher password</a>
EOF
);
define("BA_MESG_FOR_TEACHER", <<<EOF
<NAME> 様
BitArrow登録担当です。
以下の内容で登録を行いました．
ユーザ名   <MAIL>
パスワード  <PASS>

https://bitarrow.eplang.jp/bitarrow/の「教員用ログイン」からログインのご確認をよろしくお願いいたします。

使用方法を含め、ご不明な点等ございましたら、
Bit Arrow問い合わせ用メールアドレス: <BA_MAIL>
までご連絡ください。

よろしくお願いいたします。
EOF
);
require(__DIR__."/config.shadow.php");
define('DEFAULT_CLASS_OPTIONS',array('disableNote'=>true));

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
