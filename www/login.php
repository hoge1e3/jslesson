<?php
require("php/auth.php");
$showForm=true;
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
} 
if ($showForm) { 
           setcookie("user","", time()-18000);
?>
	<form action="login.php">
	  クラスID<input name="class"></br>
	  ユーザ名<input name="user">
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
<?php 
} 
?>