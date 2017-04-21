<?php
require_once("php/auth.php");
require_once("php/data/pdo.php");
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
    $pdo=pdo();
	$sth=$pdo->prepare("select * from class where id = ?");
	$sth->execute(array($class));
	$c=$sth->fetchAll();
	if(count($c)>0){
	    if($c[0]["options"]!="" && json_decode($c[0]["options"])->passwordPolicy=="yes"){
		    header("Location: ../bitarrowbeta/?Login/form");
		    exit;
	    }
	}
	$mesg=Auth::login($class,$user);
	if ($mesg===true) {
	    $showForm=false;
	    header("Location: .");
	    //print "$mesg";
	} else if ($mesg==="requirepass") {
	    //TODO:パスワード入力
	} else if ($mesg==="register") {
	    //TODO:ユーザ登録
	    
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
	<ul>
	<li>授業で使用する場合、クラスIDとユーザ名は授業で指定されたものを入力してください。</li>
	<li>授業以外で利用する場合は、クラスIDを guest とし、任意のユーザ名を入力してください。</li>
	<li>ユーザ名には半角英数字を使ってください。</li>
	</ul>
	<a href="index.html">戻る</a>
<?php 
} 
?>