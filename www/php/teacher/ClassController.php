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
        <h1><?=$class->id?> - クラス管理</h1>
        <a href="a.php?Teacher/home">クラス一覧に戻る</a><br>
        <a href="a.php?Class/config">クラスの設定をする</a><br>
        <a href="a.php?Class/registerUserForm">履修者を登録する</a><br>
        <a href="a.php?Class/showUsers">ユーザ一覧</a><br>
        <a href="a.php?Class/showStatus">ユーザの状況一覧</a>
        <hr>
        <a href="." target="student">演習画面へ</a><hr>
        <?php
    }
    static function make() {
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
    static function config() {
        // TODO
        // パスワードポリシーの設定とか
        $class=Auth::curClass2();
        ?>
        <h1><?=$class->id?> - クラス設定</h1>
        <?php
        if($class->passwordRequired()){
            echo 'パスワード設定:使用する<br>';
            echo '<a href="a.php?Class/setPasswordNouse">使用しないに変更</a>';
        }else{
            echo 'パスワード設定:使用しない<br>';
            echo '<a href="a.php?Class/setPasswordUse">使用するに変更</a>';
        }
        ?>
        <hr>
        <a href="a.php?Class/show">クラス管理に戻る</a><br>
        <?php
    }
    static function setPasswordNouse(){
        $class=Auth::curClass2();
        $class->setPasswordPolicy("nouse");
        redirect("Class/config");
    }
    static function setPasswordUse(){
        $class=Auth::curClass2();
        $class->setPasswordPolicy("yes");
        redirect("Class/config");
    }
    static function showUsers(){
        $class=Auth::curClass2();
        ?>
        <h1><?=$class->id?> - ユーザ一覧</h1>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        <table border=1>
            <tr><th>ユーザID</th><th>パスワード</th><th>名前</th></tr>
        <?php
        //<th>実行時刻</th><th>実行ファイル</th><th>実行結果</th><th>実行詳細</th><th>プログラム</th>
        $students=$class->getAllStu();
        foreach($students as $s){
            $pass=$s->getPass();
            $s->getOptions();
            if(!$s->options){
                $n="未登録";
            }else{
                $n=$s->options["options"];
                if($n==""){
                    $n="未登録";
                }else{
                    $n=json_decode($n)->name;
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
            <tr><th><a href="a.php?Login/check&class=<?=$class->id?>&user=<?=$s->name?>"
	            target="stutab"><?=$s->name?></a></th>
	            <th pass="<?=$pass?>" onclick="if(this.innerHTML=='表示')this.innerHTML=this.getAttribute('pass');else this.innerHTML='表示';">表示</th>
            <th><?=$n?></th>
            </tr>

            <?php
            /*<th><?=$l->date?>, <?=$l->time?></th><th><?=$l->filename?></th><th><?=$l->result?></th><th res="<?=$l->detail?>" onclick="alert(this.getAttribute('res'));">詳細</th>
            <th prog='<?=$l->code->C."\n---------------\n".$l->code->HTML?>' onclick="alert(this.getAttribute('prog'));">コード</th>*/
        }
        /*


        $class->mkdir();
        $mesg="";
        $handle=opendir("fs/home/".$class->id."/");
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
            <!--
            <a href="a.php?Login/su&class=<?=$class->id?>&user=<?=$files[$sortedKeys[$i]]?>"
                target="stutab">
            -->
            <?= $files[$sortedKeys[$i]] ?>
            <!--</a>--><br/>
            <?php
        }*/
        ?>
        </table>
        <?php
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
        $class=Auth::curClass2();
        ?>
        <h1><?=$class->id?> - 履修者登録</h1><hr>
        <form action="a.php?Class/registerUser" method="POST" enctype="multipart/form-data">
            <input type="file" name="stuList" accept="text/comma-separated-values"><br>
            CSVファイルを読み込んで一括登録します。
    	    <br/>
    	    <input type="submit" value="OK"/>
    	</form><hr>
        <form action="a.php?Class/registerOneUser" method="POST">
            ID<input name="id"><br>
            名前<input name="name"><br>
            パスワード<input name="pass"><br>
            一人ずつ登録します。
    	    <br/>
    	    <input type="submit" value="OK"/>
    	</form><hr>
        <a href="a.php?Class/show">クラス管理に戻る</a>
        <?php
    }
    static function registerOneUser(){
        if($_POST["id"]==""){
            return self::registerUserForm();
        }
        $id=$_POST["id"];
        $name=$_POST["name"];
        $pass=$_POST["pass"];
        echo "$id";
        $u=new BAUser(Auth::curClass2(),$id);
        if(!$u->exists()){
            $u->password=$pass;
            $u->setOptions("name",$name);
            $u->make();
            echo "登録しました<br>";
        }else{
            echo "すでに登録されているユーザIDです<br>";
        }
        echo '<a href="a.php?Class/registerUserForm">ユーザ登録に戻る</a>';
    }
    static function registerUser() {
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
        foreach($f as $line){
            if(!is_null($line[0])){
                echo "<pre>";
                print_r($line);
                echo "</pre>";
                $list[]=$line;
                if(array_key_exists("0",$line) && isset($line[0])){
                    $u=new BAUser(Auth::curClass2(),$line[0]);
                    $u->password= array_key_exists("2",$line) ? $line[2] : "";
                    if(array_key_exists("1",$line) && isset($line[1])){
                        $u->setOptions("name",$line[1]);
                    }
                    if(!$u->exists()){
                        $u->make();
                    }
                }
            }
        }

    }
    static function showStatus(){
        date_default_timezone_set('Asia/Tokyo');
        $class=Auth::curClass2();
        $now=time();
        if(!isset($_POST["Y"])){
            if(!isset($_POST['min'])){
                $min=$now-600;
            }else{
                $min=$_POST['min'];
            }
            if(!isset($_POST['max'])){
                $max=$now;
            }else{
                $max=$_POST['max'];
            }
        }else{
            $min=strtotime($_POST['Y']."/".$_POST['m']."/".$_POST['d']." ".$_POST['H'].":".$_POST['i'].":".$_POST['s']);
            $max=strtotime($_POST['aY']."/".$_POST['am']."/".$_POST['ad']." ".$_POST['aH'].":".$_POST['ai'].":".$_POST['as']);
        }
        $logs=$class->getAllLogs($min,$max);
        $runcount=Array();
        $students=$class->getAllStu();
        foreach($students as $s){
            $runcount[$s->name]=0;
            $errcount[$s->name]=0;
            $latestrun[$s->name]='実行していません';
            $runhistory[$s->name]="";
            $latestfile[$s->name]="";
        }
        foreach($logs as $log){
            if(isset($runcount[$log['user']])){
                $runcount[$log['user']]++;
            }else{
                $runcount[$log['user']]=1;
            }
            if(!isset($runhistory[$log['user']])){
                $runhistory[$log['user']]='';
            }
            if(strpos($log['result'],'Error')!==false){
                if(isset($errcount[$log['user']])){
                    $errcount[$log['user']]++;
                }else{
                    $errcount[$log['user']]=1;
                }
                $runhistory[$log['user']].='<span data-id='.$log['id'].' onClick="openFrame(this.getAttribute('."'".'data-id'."'".'));"><font color="red">E</font></span>';
            }else{
                $runhistory[$log['user']].='<span data-id='.$log['id'].' onClick="openFrame(this.getAttribute('."'".'data-id'."'".'));">R</span>';
            }
            if(!isset($errcount[$log['user']])){
                $errcount[$log['user']]=0;
            }
            $latestrun[$log['user']]=$max-$log['time'];
            $latestfile[$log['user']]=$log['filename'];
        }
        ?>
        <script type="text/javascript" src="js/lib/jquery-1.12.1.js"></script>
        <script type="text/javascript" src="js/lib/jquery-ui.js"></script>
        <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
        <link rel="stylesheet" href="css/jquery-ui.css"></link>
        <script>
            $(document).ready(function() {
                dx=0,dy=0;
                $('#detail').dialog({
                    autoOpen:false,
                    width:550,
                    height:400,
                    modal:true,
                    open:function(content){
                        res='<pre id="res">'+$(this).dialog('option',"res")+'</pre>';
                        $("#detail").append(res);
                    },
                    close:function(){
                        $("#res").remove();
                    }
                });

            // call the tablesorter plugin
                $("table").tablesorter({
                // define a custom text extraction function
                    textExtraction: function(node) {
                        // extract data from markup and return it
                        console.log(node.getAttribute("data-rate"));
                        if(node.getAttribute("data-rate")!=null){
                            return (parseInt(node.getAttribute("data-rate"))+100)+"";
                        }
                        return node.innerHTML;
                    }
                });
            });
            $(window).click(function(e){
                $("#detail").dialog('option',{position:{
                    of:e,
                    at:"center bottom",
                    my:"center top+10"

                }});
            })
            function openFrame(logid){
                $.ajax({
                    type: "POST",
                    url: "a.php?Class/getLog",
                    data: "logid="+logid,
                    dataType: "json",
                    success: function(data,dataType){
                        //alert("SUCCESS\n"+data.detail+"\n\n"+data.code.C);
                        //console.log(data.code.C);
                        //console.log(data);
                        res=data.filename+"\n"+data.result+"\n-------------\n"+data.code.C;
                        //ifrm=document.getElementById("viewDetail");
                        //ifrm.contentDocument.body.innerText=res;
                        res=res.replace(/</g,"&lt;");
                        res=res.replace(/>/g,"&gt;");
                        console.log(res);
                        $("#detail").dialog('option',{"res":res});
                        $("#detail").dialog('open');
                    },
                    error: function(xhr, textStatus, errorThrown){
                        console.log("ログデータの取得に失敗しました。",xhr,textStatus,errorThrown);
                        alert("ログデータの取得に失敗しました。"+textStatus);
                    }
                });
                //alert(logid);
            }
        </script>
        <div id="detail" style="display:none;"></div>
        <h1><?=$class->id?> - ユーザ一覧</h1>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        対象の時刻を変える<br>
        <form action="a.php?Class/showStatus" method="POST" style="display: inline">
            <input name="min" value="<?=time()-1800?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近30分間"/>
    	</form>
        <form action="a.php?Class/showStatus" method="POST" style="display: inline">
            <input name="min" value="<?=time()-3600?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近60分間"/>
    	</form>
        <form action="a.php?Class/showStatus" method="POST" style="display: inline">
            <input name="min" value="<?=time()-5400?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近90分間"/>
    	</form>
        <form action="a.php?Class/showStatus" method="POST">
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
    	<hr>
    	<?php
    	    echo date("Y/m/d H:i:s",$min)." から ".date("Y/m/d H:i:s",$max)."までの実行状況";
    	?>
        <table border=1 class="tablesorter">
            <thead>
            <tr><th>ユーザID</th><th>エラー/実行</th><th>実行からの経過時間</th><th>今実行しているファイル</th><th>実行結果履歴</th></tr>
            </thead>
            <tbody>
        <?php
        //<th>実行時刻</th><th>実行ファイル</th><th>実行結果</th><th>実行詳細</th><th>プログラム</th>
        foreach($runcount as $k => $v){
            $time=self::calcTime($latestrun[$k]);
            $rate=$v!=0?floor($errcount[$k]/$v*100):'--';
            if($rate<40){
                $errcaution="white";
            }else if($rate<60){
                $errcaution="yellow";
            }else if($rate<80){
                $errcaution="orange";
            }else{
                $errcaution="red";
            }
            if($time['m']>15 || $time['h']>0){
                $timecaution="red";
            }else if($time['m']>10){
                $timecaution="orange";
            }else if($time['m']>5){
                $timecaution="yellow";
            }else{
                $timecaution="white";
            }
            ?>
            <tr><td><?=$k?></td><td data-rate="<?=$rate?>" bgcolor=<?=$errcaution?>><?=$errcount[$k]?>/<?=$v?>(<?=$rate?>%)</td>
            <td bgcolor=<?=$timecaution?>><?=str_pad($time['h'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['m'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['s'],2,0,STR_PAD_LEFT)?></td>
            <td><?=$latestfile[$k]?></td><td><?=$runhistory[$k]?></td>
            </tr>

            <?php
        }
        ?>
        </tbody>
        <?php
    }
    static function calcTime($t){
        if(is_int($t)){
            $ret=Array();
            $ret['h']=floor($t/(3600));
            $ret['m']=floor(($t/60)%60);
            $ret['s']=floor($t%60);
            return $ret;
        }else{
            return Array('h'=>'--','m'=>'--','s'=>'--');
        }
    }
    static function getLog(){
        $class=Auth::curClass2();
        $logid=$_POST["logid"];
        $lg=$class->getLogById($logid);
        print_r($lg[0]["raw"]);
    }
}

?>
