<?php
require("php/auth.php");
$showForm=true;
if (isset($_POST["class"])) {
	$class=$_POST["class"];
	$pass=$_POST["pass"];
	$mesg=Auth::loginTeacher($class,$pass);
	if ($mesg===true) {
	    $mesg="";
	    //print "$mesg";
            //echo "login successful";
	    $handle=opendir("fs/home/$class/");
	    $files=array();
	    $i=0;
	    while(($tmp=readdir($handle)) !== false){
		//print $files[$i];
		if($tmp!="." && $tmp!=".."){
		    $files[$i]=$tmp;
?>
	<a href="login.php?class=<?=$class?>&user=<?=$files[$i]?>" target="stutab"><?php print $files[$i]; ?></a>
	  <br/>
<?php 
		    $i++;
		}
	    }
	}
}
?>

	<form action="teacher.php" method="POST">
	  クラスID<input name="class"></br>
	  パスワード<input name="pass" type="password">
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
