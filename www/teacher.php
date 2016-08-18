<?php
require_once("php/auth.php");
$showForm=true;
$mesg="";
if (isset($_POST["class"])) {
	$class=$_POST["class"];
	$pass=$_POST["pass"];
	$mesg=Auth::loginTeacher($class,$pass);
	if ($mesg===true) {
	    ?><a href="showTimeline.php">Show timeline</a><hr/><?php
	    $mesg="";
	    //print "$mesg";
            //echo "login successful";
	    $handle=opendir("fs/home/$class/");
	    $files=array();
	    $sortedKeys=array();
	    $i=0;
	    while(($tmp=readdir($handle)) !== false){
		//print $files[$i];
		if($tmp!="." && $tmp!=".."){
		    $files[$i]=$tmp;
		    $i++;
		}
	    }
	    natcasesort($files);
	    $sortedKeys=array_keys($files);
	    for($i=0;$i<count($files);$i++){
?>
	<a href="login.php?class=<?=$class?>&user=<?=$files[$sortedKeys[$i]]?>" target="stutab"><?php print $files[$sortedKeys[$i]]; ?></a>
	  <br/>
<?php 
	    }
	}
}
?>
		<meta charset="UTF-8">
	<form action="teacher.php" method="POST">
	  クラスID<input name="class"></br>
	  パスワード<input name="pass" type="password">
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
