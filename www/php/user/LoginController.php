<?php
req("auth");
class LoginController {
    static $mesg;
    static function form() {
        $class=param("class","");
        /*if (!isset($_GET["class"])) {
            $class="";
        } else {
        	$class=$_GET["class"];
        }*/
        $isPersonal=($class==="personal");
    ?>
    	<meta charset="UTF-8">
    	<h1>Bit Arrow ログイン<?= $isPersonal?"（個人利用）":"" ?></h1>
      <div><!--span class="notice">【お知らせ】</span>新しいバージョン(2018_0815)になりました．
      <a href="https://bitarrow.eplang.jp/?change1808" target="wikiTab">主な変更点...</a></div-->
      <hr>
        <div><font color=red><?= self::$mesg ?></font></div>
    	<form action="a.php?Login/check" method="POST">
    	  クラスID <input name="class" value="<?= $class ?>"></br>
    	  ユーザ名 <input name="user"></br>
    	  パスワード <input name="pass" type="password">
    	  <br/>
    	  <input type="submit" value="OK"/>
    	</form>
    	<ul>
        <?php if(!$isPersonal) { ?>
        	<li>授業で使用する場合、クラスIDとユーザ名は授業で指定されたものを入力してください。</li>
        	<li>授業以外で利用する場合は、クラスIDを guest とし、任意のユーザ名を入力してください。</li>
        	<li>ユーザ名には半角英数字を使ってください。</li>
        	<li>パスワード欄は、授業で指示があった場合のみ記入してください。</li>
            <li><a href="?Login/form&class=personal">個人利用の方はこちら</a></li>
        <?php } else { ?>
            <li><a href="?Personal/regReqForm">ユーザ登録</a></li>
            <li><a href="?Personal/resetReqForm">パスワード再発行</a></li>
            <li><a href="?Login/form">クラス単位での利用の方はこちら</a></li>
        <?php } ?>
    	</ul>
    	<a href="index.html">戻る</a><br>
    	<a href="?Teacher/login">教員の方はこちら</a>
    <?php
    }
    static function isValidUserName($u) {
        return preg_match("/^[@a-zA-Z_0-9\-\.]+$/",$u);
    }
    static function curStatus() {
        $u=Auth::curUser2();
        if ($u) {
            $res=array(
                "user"=>$u->name,
                "class"=>$u->_class->id
            );
        } else {
            $res=array();
        }
        $t=Auth::curTeacher();
        if ($t) $res["teacher"]=$t->name;
        print json_encode($res);
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
        if (!self::isValidUserName($user)) {
            self::$mesg="ユーザ名には半角英数字を使ってください．余分がスペースがないかどうか確認してください．";
            return self::form();
        }
    	$pass=$_POST["pass"];
      $afterLogin=param("afterLogin","index.html");
    	self::$mesg=Auth::login($class,$user);
    	if (self::$mesg===true) {
    	    $showForm=false;
    	    header("Location: $afterLogin");
    	    //print "$mesg";
        } else if (self::$mesg==="usernotexist") {
            self::$mesg="ユーザ'$user'は登録されていません．";
            self::form();
    	} else if (self::$mesg==="register") {
    	    self::register();
    	} else if (self::$mesg==="requirepass") {
    	    self::$mesg=Auth::loginUser($class,$user,$pass);
    	    //self::passForm();
    	    if (self::$mesg===true) {
        	    $showForm=false;
    	        header("Location: $afterLogin");
    	        //print "$mesg";
    	    } else {
                self::$mesg="パスワードを入力してください";
    	        self::passForm();
    	    }
    	} else {
    	    self::form();
    	}
    }
    static function su() {// nariSUmasi
        $class=$_GET["class"];
        $userN=$_GET["user"];
        $c=new BAClass($class);
        $user=$c->getUser($userN);
        Auth::su($user);
        header("Location: index.html");
    }
    static function checkPass() {
        $password=param("password");
        /*if (!$password) {
            self::$mesg="パスワードが入力されていません";
            return self::passForm();
        }*/
    	$class=$_POST["class"];
    	$user=$_POST["user"];
    	self::$mesg=Auth::loginUser($class,$user,$password);
    	if (self::$mesg===true) {
    	    $showForm=false;
    	    header("Location: index.html");
    	    //print "$mesg";
    	} else {
            if (!self::$mesg) self::$mesg="ユーザ名かパスワードが違います";
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
        <font color="red"><?= self::$mesg?></font>
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
        self::$mesg="クラス $class にユーザ  $user が登録されていません。";
    	?>
    	<meta charset="UTF-8">
    	<h1><?= $class?> クラス新規ユーザ登録</h1>
        <font color="red"><?= self::$mesg?></font>
        <p>
        新しく登録する場合は次のフォームを確認して登録してください。<br>
        ユーザ名を間違えた場合は<a href="a.php?Login/form&class=<?=$class?>">ログイン画面</a>に
        戻ってログインをやり直してください。
    </p>
    	<form action="a.php?Login/registerConfirm" method="POST">
    	  クラスID: <input type="hidden" name="class" value="<?= $class ?>"><?= $class ?></br>
    	  ユーザ名: <input type="hidden" name="user" value="<?= $user?>"><?= $user?></br>
    	  <?php
    	  if($c->passwordRequired()){
    	      echo 'パスワード <input name="password" type="password"/><Br/>';
    	      echo 'パスワード(確認用) <input name="passwordconf" type="password"/><Br/>';
    	  }
    	  ?>
    	  <br/>
    	  <input type="submit" value="登録"/>
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
    static function getPublishedDir() {
        $p=$_GET["project"];
        echo Auth::getPublishedDir($p);
    }
    static function test() {
        $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        //$SRV=($_SERVER['REQUEST_SCHEME']."://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])    ;
        //echo $actual_link;
        $dir=preg_replace("/\\?.*/","",$actual_link);
        $dir=preg_replace("/[^\\/]*$/","",$dir);
        echo $dir;
    }
    static function logout() {
        Auth::logout();
        header("Location: .?Login/form");
    }
}
?>
