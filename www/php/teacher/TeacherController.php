<?php
req("auth","BAClass","DateUtil");
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
        $shadow=BATeacher::pass2shadow($pass);
        $r=pdo_select1("select * from teacher where name=?",$name);
        if ($r) echo "$name はすでに登録されています．";
        else {
            pdo_insert("teacher",array("name"=>$name, "shadow"=>$shadow));
            echo "$name を登録しました．";
        }
    }
    static function shadowize() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        BATeacher::shadowize();
        echo "DONE";
    }
    /*static function enc() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        BAUser::enc();
        echo "DONE";
    }*/
    static function encv() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        BAUser::encv();
        echo "DONE";
    }
    static function nullenc() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }

        $e=BAUser::pass2enc(null);
        echo "strlen(null)=".strlen(null)."<BR>";
        echo "enc(NULL)=$e<BR>";
        echo "dec(NULL)=".(BAUser::enc2pass(null)===false?"false":"?")."<BR>";
        echo "enc('')=".BAUser::pass2enc('')."<BR>";
        echo "dec($e)=".(BAUser::enc2pass($e)===''?"''":"?")."<BR>";
        echo "is ''<BR>";
        foreach (pdo_select("select pass from user where pass='' ") as $r) {
            echo ($r->pass===null?"null":"not null")."<BR>";
        }
        echo "is null<BR>";
        foreach (pdo_select("select pass from user where pass is null ") as $r) {
            echo ($r->pass===null?"null":"not null")."<BR>";
        }

    }
    static function langStat(){
      $teacher=Auth::isTeacher2();
      if (!$teacher || !$teacher->isSysAd()) {
          header("Location: a.php?Teacher/login");
          return;
      }
      date_default_timezone_set('Asia/Tokyo');
      $thisURL="a.php?Teacher/langStat";
      $now=time();
      if(!param("Y",false)){
          $min=$now-2592000;
          $max=$now;
      }else{
          $min=DateUtil::toInt(param('Y')."-".param('m')."-".param('d')." ".param('H').":".param('i').":".param('s'));
          $max=DateUtil::toInt(param('aY')."-".param('am')."-".param('ad')." ".param('aH').":".param('ai').":".param('as'));
      }
      ?>
      <form action="<?= $thisURL ?>" method="POST">
          <input name="Y" value="<?=date("Y",$min)?>" maxlength="4" size="4">年
          <input name="m" value="<?=date("m",$min)?>" maxlength="2" size="2">月
          <input name="d" value="<?=date("d",$min)?>" maxlength="2" size="2">日
          <input name="H" value="<?=date("H",$min)?>" maxlength="2" size="2">時
          <input name="i" value="<?=date("i",$min)?>" maxlength="2" size="2">分
          <input name="s" value="<?=date("s",$min)?>" maxlength="2" size="2">秒から<br>
          <input name="aY" value="<?=date("Y",$max)?>" maxlength="4" size="4">年
          <input name="am" value="<?=date("m",$max)?>" maxlength="2" size="2">月
          <input name="ad" value="<?=date("d",$max)?>" maxlength="2" size="2">日
          <input name="aH" value="<?=date("H",$max)?>" maxlength="2" size="2">時
          <input name="ai" value="<?=date("i",$max)?>" maxlength="2" size="2">分
          <input name="as" value="<?=date("s",$max)?>" maxlength="2" size="2">秒までの<br>
        <input type="submit" value="状況を見る"/>
    </form>
    <table>
      <tr><th>クラス</th><th>ユーザ</th><th>プロジェクト</th><th>言語</th></tr>
    <?php
      $overall = array();
      foreach(glob(BA_HOME."/*") as $class){
        if(!is_file($class)){
          foreach(glob($class."/*") as $user){
            if(!is_file($user)){
              foreach(glob($user."/*") as $prj){
                if(is_file($prj."/options.json") && (filemtime($prj."/options.json")>=$min && filemtime($prj."/options.json")<=$max)){
                  $opt=json_decode(file_get_contents($prj."/options.json"));
                  if(isset($opt->language)){
                    if(!isset($overall[$opt->language])) $overall[$opt->language]=1;
                    else $overall[$opt->language]++;
                    $path=explode("/",$prj);
                    //$path[count($path)-3]."/".$path[count($path)-2]."/".$path[count($path)-1]."<BR>";
                    ?>
                    <tr><td><?=$path[count($path)-3]?></td><td><?=$path[count($path)-2]?></td><td><?=$path[count($path)-1]?></td><td><?=$opt->language?></td></tr>
                    <?php
                  }
                }
              }
            }
          }
        }
      }
      ?>
    </table>
      <?php
      foreach ($overall as $key => $value) {
        echo $key.":".$value."<BR>";
      }
  }
}

?>
