<?php
if (isset($_POST["files"])) var_dump($_POST["files"]);
?>
<form action="test.php" method="POST">
<input name="files" />
<input type="submit" value="OK" />
</form>
<?php
//require_once __DIR__."/../analysis/AddErrorInfoController.php";
//print_r($_SERVER["REQUEST_URI"]);
/*require_once "php/fs/SyncController.php";
header("Content-type: text/json");
echo ("{a:3}");*/
//throw new Exception("test");
//die("TEST");
//echo BA_TOP."<BR>".BA_FS."<BR>".BA_LOG."<BR>".BA_HOME."<BR>".BA_PUB."<BR>";
/*$mesg=true;
echo "hoge=".($mesg=="requirepass");
if ($mesg=="requirepass") {
    echo "requirepass";
}*/
/*req("BAClass","pdo","auth");
$c=new BAClass("devel");
echo "PassREQ==".$c->passwordRequired()."!";

$res=Auth::login("devel","devel");
echo "Auth res".$res.".";*/
//phpinfo();
//require_once "php/fs/PathUtil.php";
//echo PathUtil::rel("","/home/hoge/../test.txt");
exit;

$file=Auth::homeDirOf($class);
foreach ($file->listFiles() as $f) {
    echo $f->text();
    // $f->text("hoge");
    if ($f->isDir()) {
        $s=$f->rel("sub/");
        if ($s->exists()) {
            $s->rel("hoge.txt")->text("hoge");
        }
    }
}


//require_once "../fs/NativeFS.php";
//require_once "../fs/SFile.php";
//require_once "../data/JSONLines.php";
require_once __DIR__."/../data/pdo.php";

try {
    $pdo = pdo();
    // new PDO('sqlite:db/db.sqlite3');
    //$pdo = new PDO('pgsql:host=localhost;port=5432;dbname=ddb2013',"ddb","");
    //require_once "db/db.php";
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // デフォルトのフェッチモードを連想配列形式に設定
    // (毎回PDO::FETCH_ASSOCを指定する必要が無くなる)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    foreach ($pdo->query("select * from fruit") as $rec) {
    //foreach ($pdo->query("select * from 商品") as $rec) {
    	var_dump($rec);
    }
    //$pdo->close();
}catch(Exception $e) {
    //echo "えらー";
    header("Content-Type:text/plain;charset=shift_jis");
    echo $e->getMessage();
}

/*
$fs=new NativeFS("../../");
$f=new SFile($fs,"user/users_classA.txt");
//echo $f->text();
$l=new JSONLines($f);
echo "<HR>";
$l->delAll(function ($o) {
    return $o->pass=="xxxx";
});
foreach ($l as $ent) {
    echo "<hr>";
    var_dump($ent);
}*/
//var_dump($e);
//unset($e->reset);
//->pass="zzzz";
//$l->save();

//echo $_COOKIE["mysessionID"];
/*
require_once"ErrorHandler.php";
require_once"MySession.php";

if (!MySession::has("count")) {
    $c=0;
} else {
    $c=MySession::get("count");
}
$c++;
echo $c;
MySession::set("count",$c);
*/
/*require_once"PathUtil.php";

print PathUtil::rel("a","b");
print "<BR>\n";
print PathUtil::rel("a/","b");
print "<BR>\n";
print PathUtil::relPath("a/b/","a/");
print "<BR>\n";
print PathUtil::startsWith("a/b/","a/");
print "<BR>\n";
print PathUtil::startsWith("a/","a/b/");
print "<BR>\n";
print PathUtil::endsWith("a/b/","b/");
print "<BR>\n";
print PathUtil::endsWith("b/","a/b/");
print "<BR>\n";
print PathUtil::truncSep("b/c/d/");
print "<BR>\n";
print PathUtil::truncSep("b/c/d");
print "<BR>\n";
print join("," ,PathUtil::splitPath("b/c/d/"));
print "<BR>\n";
print join("," ,PathUtil::splitPath("b/c/d"));
print "<BR>\n";
print PathUtil::up("b/c/d/");
print "<BR>\n";
print PathUtil::up("b/c/d");
print "<BR>\n";
*/

?>
