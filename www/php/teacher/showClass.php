<?php
require_once("php/auth.php");
?><h1>ユーザ一覧</h1><hr><?php
if (isset($_GET["class"])) {
/*	$class=$_POST["class"];
	$pass=$_POST["pass"];
	$ignoreNonexistent=isset($_POST["ignoreNonexistent"]);
	$mesg=Auth::loginTeacher($class,$pass,$ignoreNonexistent);
	if ($mesg===true) {
	    ?><a href="a.php?showTimeline">Show timeline</a><hr/>
	    <!--a href="a.php?resetRequests">再発行リクエスト一覧</a><hr/-->
	    <?php
*/
        $class=$_GET["class"];
        if(Auth::isTeacherOf($class)){
            $mesg="";
            $handle=opendir("fs/home/$class/");
            $files=array();
            $sortedKeys=array();
            $i=0;
            while(($tmp=readdir($handle)) !== false){
    	    	if($tmp!="." && $tmp!=".."){
    	    	    $files[$i]=$tmp;
    	    	    $i++;
    		    }
            }
            natcasesort($files);
            $sortedKeys=array_keys($files);
            for($i=0;$i<count($files);$i++){
        ?>
	           <a href="a.php?login&class=<?=$class?>&user=<?=$files[$sortedKeys[$i]]?>" 
	           target="stutab">
	               <?php print $files[$sortedKeys[$i]]; ?>
	            </a><br/>
            <?php 
    	    }
        }
//	}
}
?>		<meta charset="UTF-8">
	  <?php if (isset($_GET["ignoreNonexistent"])) { ?>
	    <input type="hidden" name="ignoreNonexistent" value="1">
	  <?php } ?>
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
