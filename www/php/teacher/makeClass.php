<?php
require_once("php/auth.php");
require_once __DIR__."/classes.php";
$showForm=true;
$mesg="";
$name="";
if (isset($_POST["classname"])) {
    $class=$_POST["classname"];
    if(Classes::get($class)){
        echo "クラスが存在しています";
        exit;
    }else{
        Classes::make($class);
/*	    $name=$_POST["name"];
    	$pass=$_POST["pass"];
    	$ignoreNonexistent=isset($_POST["ignoreNonexistent"]);
    	$mesg=Auth::loginTeacher2($name,$pass,$ignoreNonexistent);
    	if ($mesg===true) {
    	    ?>
    	    <form action="a.php?makeClass" method="POST">
    	    <input type="submit" value="新規クラス作成"/>
    	    </form>
    	    <hr>
    	    <!--a href="a.php?resetRequests">再発行リクエスト一覧</a><hr/-->
    	    <!-- ここで受け持ったクラス一覧を出す-->
    	    <?php
    	        foreach(Classes::get() as $c){
    	           ?><a href="a.php?showClass&class=<?=$c["class"];?>"><?=$c["class"];?></a><br>
    	    <?php    }
        }*/
    }
}
?>
		<meta charset="UTF-8">
	<form action="a.php?teacher2" method="POST">
	  クラス名<input name="name" value="<?php echo $name; ?>"></br>
	  パスワード<input name="pass" type="password">
	  <?php if (isset($_GET["ignoreNonexistent"])) { ?>
	    <input type="hidden" name="ignoreNonexistent" value="1">
	  <?php } ?>
	  <font color=red><?php print $mesg; ?></font>
	  <br/>
	  <input type="submit" value="OK"/>
	</form>
