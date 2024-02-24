<?php
req("auth","BAClass","DateUtil","Mail","PathUtil");
//require_once"php/auth.php";
//require_once"php/teacher/Classes.php";
class TeacherController {
    public static $mesg="";
    public static $name="";
    static function bauth() {
        $code=param("code",null);
        $ba_top_url=PathUtil::truncSep(BA_TOP_URL);
        if (!$code) {
            header("Location: ".TEACHER_BAUTH_URL."?Teacher/login&callback=$ba_top_url/?Teacher/bauth");
            return;
        }
        $r=file_get_contents(TEACHER_BAUTH_URL."?Login/bauth&status=$code");
        if ($r==="OK") {
            $s=json_decode($code);
            MySession::set("teacher",$s->teacher);
	        MySession::set("user",$s->teacher);
            header("Location: $ba_top_url/?Teacher/home");
        } else {
            print $r;
        }
    }
    static function login() {
        if (defined("TEACHER_BAUTH_URL")) {
            return self::bauth();
        }
        req("LoginController");
        redirectFromServiceDomain();
    ?>
    <title>教員ログイン - Bit Arrow</title>
		<meta charset="UTF-8">
      <h1>Bit Arrow教員ログイン</h1>
      <script src="js/lib/spacechecker.js"></script>
    	<form action="a.php?Teacher/check" method="POST">
    	  メールアドレス<input class="spacecheck" name="name" value="<?= self::$name ?>"></br>
    	  パスワード<input class="spacecheck" name="pass" type="password">
          <input type="hidden" name="callback" 
          value="<?= htmlspecialchars(param("callback","")) ?>" />
    	  <?php if (isset($_GET["ignoreNonexistent"])) { ?>
    	    <input type="hidden" name="ignoreNonexistent" value="1">
    	  <?php } ?>
    	  <font color=red><?= self::$mesg ?></font>
    	  <br/>
    	  <input type="submit" value="OK"/>
    	</form>
        ※パスワードをお忘れの場合，<a href="https://bitarrow.eplang.jp/index.php?preparation" target="help">教員用アカウントを登録</a>し直してください．以前登録に使用されたメールアドレスも利用可能です．
    <?php
    }
    static function check() {
    	self::$name=$_POST["name"];
    	$pass=$_POST["pass"];
    	$ignoreNonexistent=isset($_POST["ignoreNonexistent"]);
    	self::$mesg=Auth::loginTeacher2(self::$name,$pass,$ignoreNonexistent);
    	if (self::$mesg===true) {
            $c=param("callback","");
            if ($c) {
                req("LoginController");
                LoginController::curStatus();
                return;
            } else {
                redirect("Teacher/home");
            }
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
        if (defined("TEACHER_BAUTH_URL") && defined("BA_TOP_URL")) {
            header("Location: ".PathUtil::truncSep(TEACHER_BAUTH_URL)."/a.php?Teacher/changePass&batop=".BA_TOP_URL);
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
            <input type="hidden" name="batop" value="<?= htmlspecialchars( param("batop","")) ?>" />
    	    <input type="submit" value="変更"/>
	    </form>
	    <br>
        <?php if (param("batop","")) { ?>
            <a href='<?= param("batop") ?>/?Teacher/home'>教員トップに戻る</a>
        <?php } else { ?>
            <a href='?Teacher/home'>教員トップに戻る</a>
	    <?php }
    }
    static function changePassCheck(){
        $teacher=Auth::isTeacher2();
        $nowPass=$_POST["nowpass"];
        $newPass1=$_POST["newpass1"];
        $newPass2=$_POST["newpass2"];
        $batop=param("batop","");
        if ($batop) {
            $batop=PathUtil::truncSep($batop)."/";
        }
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
        echo "<br><a href='$batop?Teacher/home'>教員トップに戻る</a>";
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
        <?php if(!defined("NO_MORE_CLASS")) { ?>
        <form action="a.php?Class/make" method="POST">
            <font color="red"><?= self::$mesg ?></font><br/>
            <div id="news"></div>
            クラス名<input name="classname">
            <input type="submit" value="新規クラス作成"/>
        </form>
        <?php } else { ?>
            <div id="news"></div>
        <?php } ?>
        <script src="js/lib/jquery-1.12.1.js" type="text/javascript"></script>
        <script>
            $.get("a.php?Login/news").then((r)=>$("#news").html(r));
        </script>
        <?php
        if ($teacher->isSysAd()) {
            ?>
            <hr>
            <h1>システム管理メニュー</h1>
            <ul>
            <li><a href="a.php?Teacher/add">教員追加</a></li>
            <li><a href="a.php?Teacher/lastLogin">教員ログイン状況</a></li>
            <ul>
            <?php
        }
    }
    static function lastLogin() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        $teachers=pdo_select ("select * from teacher");
        foreach ($teachers as $teacher) {
            $options=$teacher->options;
            $teacher->lastLogin=0;
            if (is_string($options)) {
                $options=json_decode($options);
                if (is_object($options) && isset($options->lastLogin)) {
                    $teacher->lastLogin=$options->lastLogin;
                    //echo $teacher->name." - ".DateUtil::toString($options->lastLogin)."<BR>";
                }
            }
        }
        usort($teachers, function ($a,$b) {
            return $b->lastLogin-$a->lastLogin;
        });
        foreach ($teachers as $teacher) {
            echo $teacher->name." - ".DateUtil::toString($teacher->lastLogin)."<BR>";
        }
    }
    static function add() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        ?>
        <title>教員追加 - Bit Arrow</title>
        <h1>教員追加</h1>
        <script src="js/lib/spacechecker.js"></script>
        <form action="?Teacher/addDone" method="POST">
            所属と氏名 <input class="spacecheck" name="cname" size=50>様<BR>
            メールアドレス <input class="spacecheck" name="mail"><BR>
            パスワード <input class="spacecheck" name="pass" id="pasu"><BR>
            <input type="submit">
        </form>
        <script>
        document.querySelector("#pasu").value=(Math.random()+"").substring(2,8);
        const ui_name=document.querySelector("[name='cname']");
        function placemail() {
            const ui_mail=document.querySelector("[name='mail']");
            const [aff, name, done, mail]=ui_name.value.split("\t");
            if (!done && mail) {
                ui_name.value=`${aff} ${name}`;
                ui_mail.value=mail;
            }
        }
        ui_name.addEventListener("input",placemail)
        </script>
        <?php
    }
    static function addDone() {
        $teacher=Auth::isTeacher2();
        if (!$teacher || !$teacher->isSysAd()) {
            header("Location: a.php?Teacher/login");
            return;
        }
        $cname=param("cname");
        $name=param("mail");
        $pass=param("pass");
        $shadow=BATeacher::pass2shadow($pass);
        $r=pdo_select1("select * from teacher where name=?",$name);
        if ($r) {
            pdo_update("teacher",array("name"=>$name), array("shadow"=>$shadow));
            echo "$name はすでに登録されています．パスワードを更新しました。";
        } else {
            pdo_insert("teacher",array("name"=>$name, "shadow"=>$shadow));
            echo "$name を登録しました．";
        }
        if (defined("BA_MESG_FOR_TEACHER") && $cname!=="") {
            $mesg=BA_MESG_FOR_TEACHER;
            $mesg=preg_replace("/<NAME>/", $cname,$mesg);
            $mesg=preg_replace("/<MAIL>/", $name,$mesg);
            $mesg=preg_replace("/<PASS>/", $pass,$mesg);
            $mesg=preg_replace("/<BA_MAIL>/", BA_MAIL,$mesg);

            $opt=array(
                "From"=>BA_MAIL, "Cc"=> BA_MAIL, "Reply-to"=> BA_MAIL
            );
            if (defined("BA_MAIL")) {
                Mail::send($name, "BitArrow教員ID登録のお知らせ", $mesg, $opt);
                echo "<div>$name にメール送信しました。</div>";
            }
            ?>
            <h2>送信本文</h2>
            <textarea rows=20 cols=80><?= htmlspecialchars(Mail::content($name, "BitArrow教員ID登録のお知らせ", $mesg, $opt)) ?></textarea>
            <?php
        }
        ?>
        <hr/>
        <a href="?Teacher/add">もう1件追加する</a>
        <?php
    }
    static function regSysad($name, $pass) {
        $shadow=BATeacher::pass2shadow($pass);
        $r=pdo_select1("select * from teacher where name=?",$name);
        if ($r) {
            pdo_update("teacher",array("name"=>$name), array("shadow"=>$shadow));
            echo "$name はすでに登録されています．パスワードを更新しました。";
        } else {
            pdo_insert("teacher",array("name"=>$name, "shadow"=>$shadow));
            echo "$name を登録しました．";
        }
        $t=new BATeacher($name);
        if (!$t->isSysAd()) {
            //("select * from role where user = ? and type = ?")
            pdo_insert("role",array("user"=>$name, "type"=>Auth::SYSAD));
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

  static function langStatAll(){
      $teacher=Auth::isTeacher2();
      if (!$teacher || !$teacher->isSysAd()) {
          header("Location: a.php?Teacher/login");
          return;
      }
      date_default_timezone_set('Asia/Tokyo');
      $now=time();
      ?>
      <table border="1">
          <tr><th>クラス</th><th>開講年月</th><th>主たる言語</th><th>アクティブユーザ数</th>
              <th>c</th><th>dncl</th><th>dtl</th><th>py</th><th>js</th><th>tonyu</th><th>合計</th><th>教員</th><th>プロジェクト</th></tr>
              <?php
              foreach(glob(BA_HOME."/*") as $class){
                  if(!is_file($class)){
                      $temp=explode("/",$class);
                      $className=$temp[count($temp)-1];
                      $begin=$now;
                      $overall = array();
                      $users=0;
                      foreach(glob($class."/*") as $user){
                          if(!is_file($user)){
                              $temp=explode("/",$user);
                              $userName=$temp[count($temp)-1];
                              $isAct=false;
                              foreach(glob($user."/*") as $prj){
                                  if(is_file($prj."/options.json")){
                                      $isAct=true;
                                      $createdTime=filemtime($prj."/options.json");
                                      $temp=explode("/",$prj);
                                      $prjName=$temp[count($temp)-1];
                                      if($createdTime<$begin){
                                          $begin=$createdTime;
                                      }

                                      $opt=json_decode(file_get_contents($prj."/options.json"));
                                      $lang=isset($opt->language) ? $opt->language : 'js';
                                      if(!isset($overall[$lang])) $overall[$lang]=1;
                                      else $overall[$lang]++;
                                      $path=explode("/",$prj);
                                      //$path[count($path)-3]."/".$path[count($path)-2]."/".$path[count($path)-1]."<BR>";
                                  }
                              }
                              if($isAct) $users++;
                          }
                      }
                      $ml=self::mainLang($overall);
                      ?>
                      <tr><td><?=$className?></td><td><?=DateUtil::toString($begin)?></td>
                          <td><?=$ml?></td>
                          <td><?=$users?></td>
                          <td><?=isset($overall['c'])? $overall['c']:0 ?></td>
                          <td><?=isset($overall['dncl'])?$overall['dncl'] :0 ?></td>
                          <td><?=isset($overall['dtl'])?$overall['dtl'] :0 ?></td>
                          <td><?=isset($overall['py'])? $overall['py']:0 ?></td>
                          <td><?=isset($overall['js'])? $overall['js']:0 ?></td>
                          <td><?=isset($overall['tonyu'])? $overall['tonyu']:0 ?></td>
                          <td><?=array_sum($overall) ?></td></tr>
                          <?php
                      }
                  }
                  ?>
              </table>
              <?php
              foreach ($overall as $key => $value) {
                  echo $key.":".$value."<BR>";
              }
          }
    static function mainLang($overall){
        // todo
        asort($overall);
        $ml=array_key_last($overall);
        return is_null($ml)? 'none' : ($overall[$ml]/array_sum($overall)>0.8 ? $ml : 'mix');
    }
}
if (! function_exists("array_key_last")) {
    function array_key_last($array) {
        if (!is_array($array) || empty($array)) {
            return NULL;
        }
        return array_keys($array)[count($array)-1];
    }
}

?>
