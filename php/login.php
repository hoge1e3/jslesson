<?php
require("auth.php");
$showForm=true;
if (isset($_GET["user"])) {
	$user=$_GET["user"];
	$mesg=Auth::login($user);
	if ($mesg===true) {
	    $showForm=false;
	    header("Location: ../");
	    //print "$mesg";
	}
} 
if ($showForm) { 
?>
	<form action="login.php">   
	  ユーザ名<input name="user">
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
<?php 
} 
?>