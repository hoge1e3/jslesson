# インストール方法（手動）

## 動作環境

- Linux
- Apache
- PHP 7
- mysql
- Pythonをサーバサイドで動作させる場合
  - python
  - nodejs

## 設定項目（例）

- mysqlアカウント
  - user=bauser/ dbname=bitarrow / pass=XXXX
- Webページディレクトリ(BA_WWW)
  - /var/www/html/bitarrow
- データディレクトリ(BA_DATA)
  - /var/www/data/bitarrow
- ホームページアドレス(BA_TOP_URL)
  - http://example.com/bitarrow
- システム管理者アカウント
  - ユーザ名 teacher@example.com / パスワード YYYY

他の設定にしたい場合は以下を適宜読み替えてください．

## データベース作成

~~~
% mysql -u root -p
# CREATE DATABASE bitarrow DEFAULT CHARACTER SET utf8;
# CREATE USER bauser IDENTIFIED BY 'XXXX';
# grant all on bitarrow.* to bauser;
~~~

## (SELinux が有効の場合)

~~~
% cd /var/www/data/bitarrow
% sudo semanage fcontext -a -t httpd_sys_rw_content_t /var/www/data/bitarrow
% sudo restorecon -vv .
% ls -Zla
drwxr-xr-x. 2 unconfined_u:object_r:httpd_sys_rw_content_t:s0 apache hoge   6  6月  7 12:30 .
drwxr-xr-x. 4 unconfined_u:object_r:httpd_sys_content_t:s0 root   root 37  6月  7 12:30 ..
~~~

## ダウンロードと解凍

https://github.com/hoge1e3/jslesson
からzipをダウンロード，~(ホームディレクトリ) にコピー
~~~
% cd ~
% unzip jslesson-babel.zip
~~~

## Webページディレクトリ(www_dir)にコピー

~~~
% cd /var/www/html/bitarrow
% cp -R ~/jslesson-babel/www/* .
% chmod 755 node/pythonjs.sh
% vi node/pythonjs.sh
(環境により nodejs を nodeに変える)
~~~

## Webページディレクトリのconfig.phpの編集

~~~
% vi config/config.php
~~~

~~~
<?php

//   You must set BA_DATA to data directory, it is recommended that BA_DATA cannot access via http
define("BA_DATA", "/var/www/data/bitarrow");
define("BA_WWW", "/var/www/html/bitarrow");
define("BA_TOP_URL", "http://example.com/bitarrow";
define("BA_PUB_URL", BA_TOP_URL."/fs/pub");

define("BA_LOG", BA_DATA."/log");
define("BA_FS",  BA_DATA."/fs");
define("PYTHON_HOME", BA_WWW."/node");
define("PYTHON_WORK", BA_DATA."/pythonwork");
define("PYTHON_PATH", PYTHON_HOME."/pythonjs.sh");

define("BA_HOME",BA_FS."/home");
define("BA_PUB", BA_FS."/pub");

// You should define PDO_* in BA_DATA/config.php to protect passowrd
require_once(BA_DATA."/config.php");
 ?>
~~~

## データベースにテーブルを作成

~~~
% mysql -u bauser -p bitarrow < ~/jslesson-babel/data/schema.db
~~~

## データディレクトリの初期化

~~~
% cd /var/www/data/bitarrow/
% mkdir fs log pythonwork
% cp -R ~/jslesson-babel/data/fs/scripts/ fs
% sudo chown apache fs log pythonwork
~~~

## データベース関連の設定（データディレクトリのconfig.php)

~~~
% cd /var/www/data/bitarrow/
% vi config.php
~~~

~~~
<?php
define("PDO_DSN","mysql:host=localhost;dbname=bitarrow;charset=utf8mb4");
define("PDO_USER","bauser");
define("PDO_PASS","XXXX");
?>
~~~

## システム管理者アカウント の作成

~~~
% mysql -u bauser -p bitarrow
mysql> insert into teacher values ("teacher@example.com","YYYY",NULL);
mysql> insert into role values("teacher@example.com",NULL,"sysad",NULL);
~~~

## URLの設定
~~~
% vi .htaccess
DirectoryIndex a.php
~~~

## 動作確認

http://example.com/bitarrow/?Teacher/home


## TODO:

- runDtl.php やめる
- a.php のあるなしをオプションで指定
