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
      <h1>Bit Arrow教員ログイン</h1>
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
    static function changePass(){
        $teacher=Auth::isTeacher2();
        if (!$teacher) {
            header("Location: a.php?Teacher/login");
            return;
        }
        ?>
    	<title><?= $teacher->id ?> - 教員パスワード変更</title>
    	<h1><?= $teacher->id ?> - 教員パスワード変更</h1>
    	<font color="red"><?= self::$mesg ?></font><br/>
	    <form action="a.php?Teacher/changePassCheck" method="POST">
	        現在のパスワード<input name="nowpass" type="password"><br>
    	    新しいパスワード<input name="newpass1" type="password"><br>
    	    新しいパスワード(確認用)<input name="newpass2" type="password"><br>
    	    <input type="submit" value="変更"/>
	    </form>
	    <br><a href='?Teacher/home'>教員トップに戻る</a>
	    <?php
    }
    static function changePassCheck(){
        $teacher=Auth::isTeacher2();
        $nowPass=$_POST["nowpass"];
        $newPass1=$_POST["newpass1"];
        $newPass2=$_POST["newpass2"];
        if(Auth::loginTeacher2($teacher->name,$nowPass)!==true){
            echo "パスワードが違います";
            echo "<br><a href='?Teacher/changePass'>変更画面に戻る</a>";
        }else{
            if(($newPass1==$newPass2) && ($newPass1 !="")){
                $teacher->changePass($newPass1);
                echo "変更しました";
                //redirect("Teacher/changePass");
            }else{
                echo "新しいパスワードが一致しません";
                //redirect("Teacher/changePass");
                echo "<br><a href='?Teacher/changePass'>変更画面に戻る</a>";
            }
        }
        echo "<br><a href='?Teacher/home'>教員トップに戻る</a>";
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
        <a href="a.php?Teacher/changePass">教員パスワード変更</a>

	    <hr>
        <h2>クラス一覧</h2>
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
        ?>
        <form action="a.php?Class/make" method="POST">
            <font color="red"><?= self::$mesg ?></font><br/>
            クラス名<input name="classname">
            <input type="submit" value="新規クラス作成"/>
        </form>
        <?php
        if ($teacher->isSysAd()) {
            ?>
            <hr>
            <h1>システム管理メニュー</h1>

            <a href="a.php?Teacher/add">教員追加</a>
            <?php
        }
    }
    static function add() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        ?>
        <h1>教員追加</h1>
        <form action="?Teacher/addDone" method="POST">
            メールアドレス <input name="mail"><BR>
            パスワード <input name="pass"><BR>
            <input type="submit">
        </form>
        <?php
    }
    static function addDone() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        $name=param("mail");
        $pass=param("pass");
        $r=pdo_select1("select * from teacher where name=?",$name);
        if ($r) echo "$name はすでに登録されています．";
        else {
            pdo_insert("teacher",array("name"=>$name, "pass"=>$pass));
            echo "$name を登録しました．";
        }
    }
    static function shadowize() {
        BATeacher::shadowize();
        echo "DONE";
    }
    static function enc() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        BAUser::enc();
        echo "DONE";
    }
    static function encv() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        BAUser::encv();
        echo "DONE";
    }

}

?>
