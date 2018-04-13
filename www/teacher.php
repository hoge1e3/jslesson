<?php
require_once __DIR__."/php/Modules.php";
require_once("php/auth.php");
$showForm=true;
$mesg="";
if (isset($_POST["class"])) {
	$class=$_POST["class"];
	$pass=$_POST["pass"];
	$ignoreNonexistent=isset($_POST["ignoreNonexistent"]);
	$mesg=Auth::loginTeacher($class,$pass,$ignoreNonexistent);
	if ($mesg===true) {
	    ?><a href="a.php?showTimeline">Show timeline</a><hr/>
	    <!--a href="a.php?resetRequests">再発行リクエスト一覧</a><hr/-->
	    <?php
	    if (!$ignoreNonexistent) {
    	    $mesg="";
    	    $handle=opendir(BA_FS."/home/$class/");
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
	}
}
?>
		<meta charset="UTF-8">
	<form action="a.php?teacher" method="POST">
	  クラスID<input name="class"></br>
	  パスワード<input name="pass" type="password">
	  <?php if (isset($_GET["ignoreNonexistent"])) { ?>
	    <input type="hidden" name="ignoreNonexistent" value="1">
	  <?php } ?>
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
