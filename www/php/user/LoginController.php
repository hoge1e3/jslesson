<?php
req("auth");
class LoginController {
    static $mesg;
    static function form() {
        if (!isset($_GET["class"])) {
            $class="";
        } else {
        	$class=$_GET["class"];
        }
    ?>
    	<meta charset="UTF-8">
    	<h1>Bit Arrow ログイン</h1>
    	<form action="a.php?Login/check" method="POST">
    	  クラスID <input name="class" value="<?= $class ?>"></br>
    	  ユーザ名 <input name="user">
    	  <font color=red><?= self::$mesg ?></font>
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
    static function curClass() {
    	print Auth::curClass();
    }
    static function curUser() {
    	print Auth::curUser();
    }
    static function check() {
        if (!isset($_POST["class"]) || !isset($_POST["user"])) {
            self::$mesg="クラス名，ユーザ名が入力されていません";
            return self::form();
        }
    	$class=$_POST["class"];
    	$user=$_POST["user"];
    	self::$mesg=Auth::login($class,$user);
    	if (self::$mesg===true) {
    	    $showForm=false;
    	    header("Location: index.html");
    	    //print "$mesg";
    	} else if (self::$mesg==="requirepass") {
    	    self::passForm();
    	} else if (self::$mesg==="register") {
    	    self::register();
    	} else {
    	    self::form();
    	}
    } 
    static function passForm() {
        $class=$_POST["class"];
    	//TODO:パスワード入力
    	
    }
    static function register() {
        $class=$_POST["class"];
    	//TODO:ユーザ登録(パスワードの登録)
    	
    }
}
?>