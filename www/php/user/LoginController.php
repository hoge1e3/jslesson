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
    	  ユーザ名 <input name="user"></br>
    	  パスワード <input name="pass" type="password">
    	  <font color=red><?= self::$mesg ?></font>
    	  <br/>
    	  <input type="submit" value="OK"/>
    	</form>
    	<ul>
    	<li>授業で使用する場合、クラスIDとユーザ名は授業で指定されたものを入力してください。</li>
    	<li>授業以外で利用する場合は、クラスIDを guest とし、任意のユーザ名を入力してください。</li>
    	<li>ユーザ名には半角英数字を使ってください。</li>
    	<li>パスワード欄は、授業で指示があった場合のみ記入してください。</li>
    	</ul>
    	<a href="index.html">戻る</a>
    <?php 
    } 
    static function curClass() {
        $u=Auth::curUser2();
        if ($u)	print $u->_class->id;
    }
    static function curUser() {
        $u=Auth::curUser2();
        if ($u)	print $u->name;
    }
    static function curTeacher(){
        $t=Auth::curTeacher();
        if ($t)	print $t->name;
    }
    static function check() {
        if (!isset($_POST["class"]) || !isset($_POST["user"])) {
            self::$mesg="クラス名，ユーザ名が入力されていません";
            return self::form();
        }
    	$class=$_POST["class"];
    	$user=$_POST["user"];
    	$pass=$_POST["pass"];
    	self::$mesg=Auth::login($class,$user);
    	if (self::$mesg===true) {
    	    $showForm=false;
    	    header("Location: index.html");
    	    //print "$mesg";
    	} else if (self::$mesg==="register") {
    	    self::register();
    	} else if (self::$mesg==="requirepass") {
    	    self::$mesg=Auth::loginUser($class,$user,$pass);
    	    //self::passForm();
    	    if (self::$mesg===true) {
        	    $showForm=false;
    	        header("Location: index.html");
    	        //print "$mesg";
    	    } else {
    	        self::passForm();
    	    }
    	} else {
    	    self::form();
    	}
    } 
    static function su() {// nariSUmasi
        $class=$_GET["class"];
        $userN=$_GET["user"];
        $user=(new BAClass($class))->getUser($userN);
        Auth::su($user);
        header("Location: index.html");
    }
    static function checkPass() {
        if (!isset($_POST["password"])) {
            self::$mesg="パスワードが入力されていません";
            return self::passForm();
        }
    	$class=$_POST["class"];
    	$user=$_POST["user"];
    	$password=$_POST["password"];
    	self::$mesg=Auth::loginUser($class,$user,$password);
    	if (self::$mesg===true) {
    	    $showForm=false;
    	    header("Location: index.html");
    	    //print "$mesg";
    	} else {
    	    self::passForm();
    	}
    } 
    static function passForm() {
        $class=$_POST["class"];
        $user=$_POST["user"];
    	//TODO:パスワード入力
    	?>
    	<meta charset="UTF-8">
    	<h1>Bit Arrow ログイン</h1>
    	<form action="a.php?Login/checkPass" method="POST">
    	  クラスID: <?= $class ?></br>
    	  <input type="hidden" name="class" value="<?= $class ?>"/>
    	  ユーザ名: <?= $user ?></br>
    	  <input type="hidden" name="user" value="<?= $user ?>"/>
    	  パスワード <input name="password" type="password"/>
    	  <br/>
    	  <input type="submit" value="OK"/>
    	</form>
    	<?php
    }
    static function register() {
        $class=$_POST["class"];
        $user=$_POST["user"];
        $c=new BAClass($class);
    	//TODO:ユーザ登録(パスワードの登録)
    	?>
    	<meta charset="UTF-8">
    	<h1><?= $class?> クラス新規ユーザ登録</h1>
    	<form action="a.php?Login/registerConfirm" method="POST">
    	  クラスID: <input type="hidden" name="class" value="<?= $class ?>"><?= $class ?></br>
    	  ユーザ名<input name="user" value="<?= $user?>"></br>
    	  <?php
    	  if($c->passwordRequired()){
    	      echo 'パスワード <input name="password" type="password"/>';
    	      echo 'パスワード(確認用) <input name="passwordconf" type="password"/>';
    	  }
    	  ?>
    	  <br/>
    	  <input type="submit" value="OK"/>
    	  <br><font color="red"><?= self::$mesg?></font>
    	</form>
    	<?php
    }
    static function registerConfirm(){
        $class=$_POST["class"];
        $user=$_POST["user"];
        $c=new BAClass($class);
        $u=new BAUser($c,$user);
        if($c->passwordRequired()){
            if($_POST["password"]==""){
                self::$mesg="パスワードが入力されていません。";
                return self::register();
                //$pass="";
            }else if($_POST["passwordconf"]=="" || $_POST["password"]!=$_POST["passwordconf"]){
                self::$mesg="確認用パスワードが一致しません。";
                return self::register();
            }else{
                $pass=$_POST["password"];
            }
            $u->password=$pass;
            $u->make();
            $mesg=Auth::loginUser($class,$user,$pass);
        } else {
            $u->make();
        	$mesg=Auth::login($class,$user);
        }
        if($mesg===true){
            header("Location: index.html");
        } else {
            self::$mesg=$mesg;
            return self::register();
        }
    	
    }
}
?>