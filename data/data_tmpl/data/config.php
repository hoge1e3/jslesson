<?php
// Legends :[!] Mandatory settings, [?] optional settings

// BA_WWW, BA_DATA and BA_TOP_URL should be set at BA_WWW/config/config.php
// (It is convenient when place multiple BitArrow instance.)
// These settings may not be changed.
define("BA_LOG", BA_DATA."/log");
define("BA_FS",  BA_DATA."/fs");
define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");
define("PYTHON_WORK",BA_DATA."/pythonwork");
define("PYTHON_PATH",BA_WWW."/node/pythonjs.sh");

//[!] set mysql database info
define("PDO_DSN","mysql:host=localhost;dbname=bitarrow;charset=utf8mb4");
define("PDO_USER","bitarrow");
define("PDO_PASS","password");

//[!] make symlink:   ln -s {BA_DATA}/fs/pub {BA_WWW}/fs/
define("BA_PUB_URL", BA_TOP_URL."fs/pub");

//[!] Setting for encrpyting teacher passwords
define("SHADOW_ALGO","sha256");
define("SHADOW_SALT","xxxxxxxxx");// set random string

//[!] Setting for encrpyting student passwords
define("ENC_PASS",1);
define("ENC_ALGO","openssl:AES-128-ECB");
define("ENC_KEY","xxxxxxxxxxxxxxxxxxx");// set random string

//[?] Mail settings (send teachers registraion notification)
//define("BA_MAIL", "contact@example.com"); // leave it commented if not use mail
define("MAIL_FROM","contact@example.com");
define("BA_MESG_FOR_TEACHER", <<<EOF
<NAME> 様
BitArrow登録担当です。
以下の内容で登録を行いました．
ユーザ名   <MAIL>
パスワード  <PASS>

https://example.com/bitarrow/ の「教員用ログイン」からログインのご確認をよろしくお願いいたします。

使用方法を含め、ご不明な点等ございましたら、
Bit Arrow問い合わせ用メールアドレス: <BA_MAIL>
までご連絡ください。

よろしくお願いいたします。
EOF
);
define('DEFAULT_CLASS_OPTIONS',array('disableNote'=>true));

//[?] Google oauth settings
//define('CONSUMER_KEY', 'xxxxx.apps.googleusercontent.com');// leave it commented if not use oauth
define('CONSUMER_SECRET', 'xxxxx');
define('CALLBACK_URL', BA_TOP_URL.'?OAuth/login');
define('TOKEN_URL', 'https://accounts.google.com/o/oauth2/token');
define('AUTH_URL', 'https://accounts.google.com/o/oauth2/auth');
define('INFO_URL', 'https://www.googleapis.com/oauth2/v1/userinfo');

