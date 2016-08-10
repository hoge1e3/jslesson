<?php
require_once"NativeFS.php";
require_once"PathUtil.php";
require_once"Permission.php";
require_once"SFile.php";

//echo PathUtil::rel("../tmp/","../test.php");
echo PathUtil::rel("../tmp/","test.txt")."<BR>";
$fs=new NativeFS("../tmp/");
$ap=new Permission(null);
//$p=new Permission(new SFile($fs,"../tmp/",$ap));
$s=new SFile($fs,"/",$ap);
$txt=$s->rel("test.txt");
echo "txtpath= ".$txt->path()."<BR>";
if (isset($_POST["con"])) {
    $txt->setText($_POST["con"]);
}
?><form action="test.php" method="POST">
<textarea name="con" rows=10 cols=40><?php
echo $txt->getText();
?></textarea><input type=submit></form>
