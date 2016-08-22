<?php
require_once"NativeFS.php";
require_once"PathUtil.php";
require_once"Permission.php";
require_once"SFile.php";
require_once"AuthInfo.php";
require_once"../ErrorHandler.php";

$class="classA";
$user="userA1";
$ap=new Permission(new AuthInfo($class,$user));
$ap=null;
$fs=new NativeFS("../../fs/", $ap);
$fs->mv("/kesunayo/","/kesitemoii/");
echo join(", ",$fs->ls("/"));
/*$root=new SFile($fs,"/");
$home=$root->rel("home/")->rel($class)->rel($user);
$txt=$home->rel("myprj/test.txt");
$txt->text("tesutou!!");
print "Wrote to ".$txt->path()." Actual: ".$fs->resolve($txt->path());
$otherHome=$home->rel("../userA2/");
print $otherHome->rel("topsecret.txt")->text();*/
//$otherHome->text("hack!!");

//echo "txtpath= ".$txt->path()."<BR>";
/*if (isset($_POST["con"])) {
    $txt->setText($_POST["con"]);
}*/
?><form action="test.php" method="POST">
<textarea name="con" rows=10 cols=40><?php
//echo $txt->getText();
?></textarea><input type=submit></form>
