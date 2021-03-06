<?php
req("auth","TeacherController");
//require_once("php/auth.php");
//require_once("php/teacher/TeacherController.php");
//require_once("php/teacher/classes.php");
class ClassController {
    static function select() {
        ?><h1>ユーザ一覧</h1><hr><?php
        if (!isset($_GET["class"])) {
            echo "クラスが指定されていません";
            return;
        }
        $class=$_GET["class"];
        Auth::selectClass($class);
        redirect("Class/show");
    }
    static function show() {
        $class=Auth::curClass2();
        if(!Auth::isTeacherOf($class)){
            return redirect("Teacher/login");
        }

        ?>
        <style>
        .assignment { display:block;}
        </style>
        <script src="runtime/lib/jquery-1.12.1.js"></script>
        <script type="text/javascript">
        $(function () {
            var input = [];
            var cmd = [38,38,40,40,37,39,37,39,66,65];
            $(window).keyup(function(e){
                input.push(e.keyCode);
                if (input.toString().indexOf(cmd) >= 0) {
                    $(".assignment").css("display","block");
                    input = [];
                } else if (cmd.toString().indexOf(input)<0) {
                    input=[];
                }
                console.log("cmd",input);
            });
        });
        </script>
        <a href="a.php?Teacher/home">クラス一覧に戻る</a><hr>
        <h1><?=$class->id?> - クラス管理</h1>
        <a href="a.php?Class/config">クラス設定</a><br>
        <a href="a.php?Class/registerUserForm">ユーザ登録</a><br>
        <a href="a.php?Class/showUsers">ユーザ一覧</a><br>
        <a href="a.php?TeacherLog/view">ユーザの状況一覧</a><BR>
        <a href="a.php?Zip/download">ユーザの全ファイルダウンロード</a><BR>
        <?php if ($class->useAssignment()) {  ?>
            <div class="assignment"><a href="a.php?Mark/notMarked">未採点の課題</a></div>
            <div class="assignment"><a href="a.php?Assignment/matrix">採点状況</a></div>
        <?php } ?>
        <?php if (!$class->getOption("disableNote")) { ?>
            <div class="note"><a href="a.php?Note/showAll">学生の全ノートを見る</a></div>
        <?php } ?>
        <hr>
        <a href="." target="student">演習画面へ</a><hr>
        <?php
    }
    static function make() {
        Auth::assertTeacher(true);
        if (isset($_POST["classname"])) {
            $classN=$_POST["classname"];
            try {
                $class=new BAClass($classN);
                $mesg=$class->make();
                header("Location: a.php?Teacher/home");
            } catch(Exception $e) {
                $mesg=$e->getMessage();
                TeacherController::home($mesg);
            }
        } else {
            $mesg = "クラスが指定されていません";
            TeacherController::home($mesg);
        }
    }
    static function getOptions() {
        // TODO
        // パスワードポリシーの設定とか
        //Auth::assertTeacher();
        $class=Auth::curClass2();
        header("Content-type: text/json");
        print json_encode($class->getOptions());
    }
    static function setOption() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $name=param("name");
        $value=param("value");
        $value=($value==="true" ||$value==="1");
        switch ($name) {
            case "usePassword":
            $class->setPasswordPolicy($value?"yes":"nouse");
            break;
            case "registByUser":
            $class->allowRegistrationByUser($value);
            break;
            case "useAssignment":
            $class->useAssignment($value);
            break;
            default:
            $class->setOption($name, $value);
            //die ("$name is not a option name");
        }
        redirect("Class/config");
    }
    static function optionItems($name) {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        switch ($name) {
        case "usePassword":
        $label="パスワード設定";
        $cur=$class->passwordRequired()?1:0;
        $options=array("使用しない","使用する");
        break;
        case "registByUser":
        $label="ユーザ登録方法";
        $cur=$class->registrationByUserAllowed()?1:0;
        $options=array("教員による登録のみ","ユーザ自身または教員による登録");
        break;
        case "useAssignment":
        $label="課題提出機能（試験運用中）";
        $cur=$class->useAssignment()?1:0;
        $options=array("使用しない","使用する");
        break;
        case "disableNote":
        $label="ノート機能";
        $cur=$class->getOption("disableNote")?1:0;
        $options=array("使用する","使用しない");
        break;
        case "showOtherStudentsLogs":
        $label="他の受講者のログの閲覧";
        $cur=$class->getOption($name)?1:0;
        $options=array("許可しない","許可する");
        break;
        case "showHint":
        $label="ヒントの閲覧";
        $cur=$class->getOption($name)?1:0;
        $options=array("許可しない","許可する");
        break;
        default:
        die ("$name is not a option name");
        }
        echo"<p>";
        echo "$label:".$options[$cur].'<br>';
        $inv=$cur?0:1;
        echo '<a href="a.php?Class/setOption&name='.$name.'&value='.$inv.'">「'.$options[$inv].'」に変更</a>';
        echo"</p>";
    }
    static function config() {
        // TODO
        // パスワードポリシーの設定とか
        Auth::assertTeacher();
        $class=Auth::curClass2();
        ?>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        <h1><?=$class->id?> - クラス設定</h1>
        <?php
        self::optionItems("usePassword");
        self::optionItems("registByUser");
        self::optionItems("useAssignment");
        self::optionItems("disableNote");
        self::optionItems("showOtherStudentsLogs");
        self::optionItems("showHint");
        self::fileMenuTemplate();
        self::botURLForm();
        ?>
        <hr>
        <?php
    }
    static function fileMenuTemplate() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $tmpl=$class->getOption("fileMenuTemplate");
        if (!$tmpl) $tmpl="";
        ?>
        <div>ファイルメニュー(試験運用)</div>
        <form action="a.php?Class/setFileMenuTemplate" method="POST">
        <textarea rows=5 cols=60 name="tmpl"><?= htmlspecialchars($tmpl) ?></textarea>
        <input type="submit">
        </form>
        <?php
    }
    static function setFileMenuTemplate() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $tmpl=param("tmpl");
        $class->setOption("fileMenuTemplate",$tmpl);
        $redirect="a.php?Class/config";
        ?>
        設定しました．
        <a href="<?= $redirect ?>">設定画面へ</a>
        <meta http-equiv="refresh" content="2;URL='<?= $redirect ?>'" />
        <?php
    }
    static function botURLForm() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $url=$class->getOption("botURL");
        if (!$url) $url="";
        ?>
        <div>Slack Bot送信用URL(試験運用)</div>
        <form action="a.php?Class/setBotURL" method="POST">
        <input size=80 name="url" value="<?= htmlspecialchars($url) ?>"/>
        <input type="submit">
        </form>
        <?php
    }
    static function setBotURL() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $url=param("url");
        $class->setOption("botURL",$url);
        $redirect="a.php?Class/config";
        ?>
        設定しました．
        <a href="<?= $redirect ?>">設定画面へ</a>
        <meta http-equiv="refresh" content="2;URL='<?= $redirect ?>'" />
        <?php
    }
    static function setUserRegistrationPolicy() {
        Auth::assertTeacher();
        $allow=param("allow");
        $class=Auth::curClass2();
        $class->allowRegistrationByUser($allow==="true"||$allow==="1");
        redirect("Class/config");
    }
    static function setPasswordNouse(){
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $class->setPasswordPolicy("nouse");
        redirect("Class/config");
    }
    static function setPasswordUse(){
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $class->setPasswordPolicy("yes");
        redirect("Class/config");
    }
    static function showUsers(){
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $students=$class->getAllStu();
        if (isset($_GET["card"])) {
            //echo"<h1>詳細一覧</h1>";
            //echo"このページを印刷し，ユーザごとに切り取って配布することができます．<hr>";
            $i=0;
            foreach($students as $s){
                $pass=$s->getPass();
                echo "<div style='padding:30px;'>";
                echo "BitArrow アカウント情報<BR>";
                echo "https://bitarrow.eplang.jp/bitarrow/<BR>";
                echo "クラス名: ".$class->id."<BR>";
                echo "ユーザ名: ".$s->name."<BR>";
                echo "パスワード: ".($pass?$pass:"（空欄）")."<BR>";
                echo "</div>";
                echo "<HR>";
                $i++;
                if ($i%5==0) echo "<div style='page-break-after: always;'></div>";
            }
            return;
        }
        ?>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        <h1><?=$class->id?> - ユーザ一覧</h1>
        <div><a href="a.php?Class/registerUserForm">ユーザ登録</a></div>
        <div><a href="a.php?Class/showUsers&card=1" target="_userCard">詳細一覧表示(アカウント配布用印刷)</a></div><hr>
        <!--div>※ユーザIDをクリックするとそのユーザとしてプログラムを閲覧できます。プログラムの編集も可能ですのでご注意ください。</div-->
        <table border=1>
            <tr><th>ユーザID</th><th>名前</th><th>パスワード</th></tr>
        <?php
        //<th>実行時刻</th><th>実行ファイル</th><th>実行結果</th><th>実行詳細</th><th>プログラム</th>
        foreach($students as $s){
            $pass=$s->getPass();
            $opt=$s->getOptions();
            if(!isset($opt->name)){
                $n="未登録";
            }else{
                $n=$opt->name;
                if($n==""){
                    $n="未登録";
                }
            }
            $lf=$s->getLog();
            $l=end($lf);
            if(gettype($l) == "string"){
                $l=json_decode($l);
            }
            $tmpf=explode("/",$l->filename);
            if(count($tmpf)>5){
                $l->filename=$tmpf[4]."/".$tmpf[5];
            }
            ?>
            <tr><th><?=$s->name?></th><th><?=$n?></th>
	            <th pass="<?=$pass?>" onclick="if(this.innerHTML=='表示')this.innerHTML=this.getAttribute('pass');else this.innerHTML='表示';">表示</th>
                <td><a href="a.php?Class/su&user=<?= htmlspecialchars($s->name) ?>">代理ログイン</a></td>
            </tr>

            <?php
            /*<th><?=$l->date?>, <?=$l->time?></th><th><?=$l->filename?></th><th><?=$l->result?></th><th res="<?=$l->detail?>" onclick="alert(this.getAttribute('res'));">詳細</th>
            <th prog='<?=$l->code->C."\n---------------\n".$l->code->HTML?>' onclick="alert(this.getAttribute('prog'));">コード</th>*/
        }

        ?>
        </table>
        <?php
    }
    static function su() {
        $user=param("user");
        $class=Auth::curClass2();
        $user=$class->getUser($user);
        Auth::su($user);
        header("Location: a.php");
    }
    static function distribute(){
        /*
        (BAのプロジェクト編集画面からAjaxで要求)
        メニュー構成：
        配布 →
            ファイル ${file}（ファイル名）を配布
            プロジェクト ${dir}（プロジェクト名）を配布

        パラメタ
        class クラスID
        prj   プロジェクト名
        file  ファイル名（ファイルのコピーの場合．ディレクトリまるごとの場合省略する)
        cont  中身（穴が開いている状態の）

        classの各ユーザの同一フォルダ/同一ファイルにコピー
        ファイルの場合，options.json もコピーする
        もし同一ファイルがあったらコピーしない
        */
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $teacher=Auth::curTeacher()->id;
        $prj=$_POST["prj"];
        $file=$_POST["file"];
        $cont=$_POST["cont"];
        $over=$_POST["over"];
        $html=$_POST["html"];
        $htmlText=$_POST["htmlText"];
        /*
        $cmttmp=explode(".",$file);
        $cmttmp[1]=".cmt.txt";
        $cmt=implode("",$cmttmp);
        */
        $home=Auth::homeOfClass($class);
        $optText=$home->rel($teacher)->rel($prj)->rel("options.json")->text();
        /*print($prj);
        print($file);
        print($cont);*/
        foreach($home->listFiles() as $u){
            if($u->isDir()){
                $p=$u->rel($prj);
                if(!$p->rel("options.json")->exists()){
                    //options copy
                    $p->rel("options.json")->text($optText);
                }
                $f=$p->rel($file);
                if(!$f->exists() || $over=="true"){
                    $f->text($cont);
                }
                if(!$p->rel($html)->exists() || $over=="true"){
                    $p->rel($html)->text($htmlText);
                }
        /*        if(!$p->rel($cmt)->exists()){
                    $p->rel($cmt)->text("");
                }
         */ }
        }

        foreach($class->getAllStu() as $bau){
            $u=$home->rel($bau->name."/");
            $p=$u->rel($prj);
            if(!$p->rel("options.json")->exists()){
                $p->rel("options.json")->text($optText);
            }
            $f=$p->rel($file);
            if(!$f->exists() || $over=="true"){
                $f->text($cont);
            }
            if(!$p->rel($html)->exists() || $over=="true"){
                $p->rel($html)->text($htmlText);
            }
        /*    if(!$p->rel($cmt)->exists()){
                $p->rel($cmt)->text("");
            }
            */
        }


        print("配布しました");
    }
    static function registerUserForm() {
        // TODO
        // ファイルアップロードフォーム
        // フォーマット(csv):
        //   id,name,pass   (id以外はオプション)
        Auth::assertTeacher();
        $class=Auth::curClass2();
        ?>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        <h1><?=$class->id?> - ユーザ登録</h1>
        <h2>CSVファイルによる一括登録</h2>
        <form action="a.php?Class/registerUser" method="POST" enctype="multipart/form-data">
            <ul>
                <li>CSVファイルの各行は「ID,名前,パスワード」にしてください．ID以外は省略可能です．</li>
                <li><a href="images/register-sample.csv">サンプルCSVファイル</a>を参考にしてください．</li>

    	    </ul>
            <input type="file" name="stuList" accept="text/comma-separated-values"><br>
    	    <input type="submit" value="OK"/>
    	</form>
        <h2>一人ずつ登録</h2>
        <form action="a.php?Class/registerOneUser" method="POST">
            ID<input name="id"><br>
            名前<input name="name"><br>
            パスワード<input name="pass"><br>
    	    <br/>
    	    <input type="submit" value="OK"/>
    	</form><hr>
        <?php
    }
    static function registerOneUser(){
        Auth::assertTeacher();
        if($_POST["id"]==""){
            return self::registerUserForm();
        }
        $id=$_POST["id"];
        $name=$_POST["name"];
        $pass=$_POST["pass"];
        echo "$id";
        $u=new BAUser(Auth::curClass2(),$id);
        if(!$u->exists()){
            $u->password=$pass;//ENC(at BAUser::make)
            $u->setOptions("name",$name);
            $u->make();
            echo "登録しました<br>";
        }else{
            $u->password=$pass;//ENC(at BAUser::edit)
            $u->setOptions("name",$name);
            $u->edit();
            echo "登録済ユーザの情報を更新しました<br>";
        }
        echo '<a href="a.php?Class/registerUserForm">ユーザ登録に戻る</a><br>';
        echo '<a href="a.php?Class/showUsers">ユーザ一覧を見る</a>';
    }
    static function registerUser() {
        Auth::assertTeacher();
        if (!isset($_FILES["stuList"]["name"]) || substr($_FILES["stuList"]["name"],strrpos($_FILES["stuList"]["name"],'.')+1)!='csv') {
            return self::registerUserForm();
        }
        $d=file_get_contents($_FILES["stuList"]["tmp_name"]);
        // php.iniの extension=php_mbstring.dll を有効にしないと死ぬっぽい
        $d=mb_convert_encoding($d,'UTF-8','SJIS-win');
        $tempFile=tmpFile();
        $meta=stream_get_meta_data($tempFile);
        fwrite($tempFile,$d);
        rewind($tempFile);
        $f=new SplFileObject($meta['uri']);
        $f->setFlags(SplFileObject::READ_CSV);
        $list=array();
        $created=0;$updated=0;
        ?>
        <table border=1>
            <tr><th>種別</th><th>ユーザID</th><th>名前</th><th>パスワード</th></tr>
        <?php
        foreach($f as $line){
            if(!is_null($line[0])){
                /*echo "<pre>";
                print_r($line);
                echo "</pre>";*/
                $list[]=$line;
                if(array_key_exists("0",$line) && isset($line[0])){
                    $u=new BAUser(Auth::curClass2(),$line[0]);
                    $u->password= array_key_exists("2",$line) ? $line[2] : "";
                    if(array_key_exists("1",$line) && isset($line[1])){
                        $u->setOptions("name",$line[1]);
                    }
                    if(!$u->exists()){
                        $u->make();
                        $created++;
                        ?>
                        <th>新規</th><th><?=$line[0]?></th><th><?=(isset($line[1])?$line[1]:"")?></th><th><?=(isset($line[2])?$line[2]:"")?></th></tr>
                        <?php
                    }else {
                        $u->edit();
                        $updated++;
                        ?>
                        <th>変更</th><th><?=$line[0]?></th><th><?=(isset($line[1])?$line[1]:"")?></th><th><?=(isset($line[2])?$line[2]:"")?></th></tr>
                        <?php
                    }
                }
            }
        }
        ?>
        </table>
        <?php
        echo "$created 件のユーザを登録しました<br>";
        echo "登録済ユーザの情報を$updated 件更新しました<br>";
        echo "登録情報に誤りがあった場合、同一ユーザIDでもう一度登録を行うとパスワードと名前を上書きできます。<br>";
        echo '<a href="a.php?Class/registerUserForm">ユーザ登録に戻る</a><br>';
        echo '<a href="a.php?Class/showUsers">ユーザ一覧を見る</a>';
        //header("Location: a.php?Class/showUsers");
    }
    static function showStatus(){
      header("Location: a.php?TeacherLog/view");
      exit();
    }
    /*static function calcTime($t){
        if(is_int($t)){
            $ret=Array();
            $ret['h']=floor($t/(3600));
            $ret['m']=floor(($t/60)%60);
            $ret['s']=floor($t%60);
            return $ret;
        }else{
            return Array('h'=>'--','m'=>'--','s'=>'--');
        }
    }*/
    static function getLog(){
        $class=Auth::curClass2();
        $logid=param("logid");//$_POST["logid"];
        $lg=$class->getLogById($logid);
        if (!$lg) {
            throw new Error("log id=$logid is not found.");
        }
        $user=Auth::curUser2();
        if (!$user) {
            throw new Error("Not logged in.");
        }
        if (!$class) {
            throw new Error("Not logged in to class.");
        }
        if (Auth::isTeacherOf($class) || $user->name==$lg[0]->user) {
            print(json_encode($lg[0]));
        }
    }
    static function getOneUsersLogId(){
        $class=Auth::curClass2();
        $user=Auth::curUser2();
        if (Auth::isTeacherOf($class)) {
            $userid=param("userid",$user->name);
        }
        $lg=$class->getLogByUser($userid);
        print(json_encode($lg));
    }
}

?>
