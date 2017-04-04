<?php
req("auth","BAClass");
//require_once"php/auth.php";
//require_once"php/teacher/Classes.php";
class TeacherController {
    public static $mesg="";
    public static $name="";
    static function login() {
    ?>
		<meta charset="UTF-8">
    	<form action="a.php?Teacher/check" method="POST">
    	  メールアドレス<input name="name" value="<?= self::$name ?>"></br>
    	  パスワード<input name="pass" type="password">
    	  <?php if (isset($_GET["ignoreNonexistent"])) { ?>
    	    <input type="hidden" name="ignoreNonexistent" value="1">
    	  <?php } ?>
    	  <font color=red><?= self::$mesg ?></font>
    	  <br/>
    	  <input type="submit" value="OK"/>
    	</form>
    <?php
    }
    static function check() {
    	self::$name=$_POST["name"];
    	$pass=$_POST["pass"];
    	$ignoreNonexistent=isset($_POST["ignoreNonexistent"]);
    	self::$mesg=Auth::loginTeacher2(self::$name,$pass,$ignoreNonexistent);
    	if (self::$mesg===true) {
    	    redirect("Teacher/home");
        } else {
            self::login();
        }
    }
    static function home($mesg=null) {
        $teacher=Auth::isTeacher2();
        if (!$teacher) {
            header("Location: a.php?Teacher/login");
            return;
        }
        if ($mesg) self::$mesg=$mesg;
    	?>
    	<title><?= $teacher->id ?> - 教員ページトップ</title>
    	<h1><?= $teacher->id ?> - 教員ページトップ</h1>
    	<font color="red"><?= self::$mesg ?></font><br/>
	    <form action="a.php?Class/make" method="POST">
	        クラス名<input name="classname">
    	    <input type="submit" value="新規クラス作成"/>
	    </form>
	    <hr>
	    <!--a href="a.php?resetRequests">再発行リクエスト一覧</a><hr/-->
	    <!-- ここで受け持ったクラス一覧を出す-->
	    <?php
        foreach(BAClass::getAll($teacher) as $c){
        ?>
            <a href="a.php?Class/select&class=<?= $c->id ?>">
                <?= $c->id ?>
            </a><br>
        <?php  
	    }
    }
}

?>