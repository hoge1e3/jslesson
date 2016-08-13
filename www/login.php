<?php
require_once("php/auth.php");
$showForm=true;
$class="";
$mesg="";
if (isset($_GET["curclass"])){
	$showForm=false;
	print Auth::curClass();
}
if (isset($_GET["curuser"])) {
	$showForm=false;
	print Auth::curUser();
} else if (isset($_GET["class"]) && isset($_GET["user"])) {
	$class=$_GET["class"];
	$user=$_GET["user"];
	$mesg=Auth::login($class,$user);
	if ($mesg===true) {
	    $showForm=false;
	    header("Location: .");
	    //print "$mesg";
	}
} else if (isset($_GET["class"])) {
    $class=$_GET["class"];
}
if ($showForm) { 
          // setcookie("user","", time()-18000);
         //  session_start();
?>
	<meta charset="UTF-8">
	<h1>Bit Arrow ログイン</h1>
	<form action="login.php">
	  クラスID <input name="class" value="<?php print $class; ?>"></br>
	  ユーザ名 <input name="user">
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
	クラスIDは授業で指定されたものを入力してください。<br/>
	授業以外で利用する場合は、クラス名を guest としてください。<br/>
	ユーザ名には半角英数字を使ってください。<br/>
	<a href="index.html">戻る</a>
<?php 
} 
?>