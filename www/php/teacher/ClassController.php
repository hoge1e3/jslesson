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
        <a href="a.php?Class/registerUserForm">履修者を一括登録する</a>
        <hr>
        <a href="." target="student">学生としてログイン</a><hr>
        <?php
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
            <a href="a.php?login&class=<?=$class->id?>&user=<?=$files[$sortedKeys[$i]]?>" 
                target="stutab">
            <?= $files[$sortedKeys[$i]] ?>
            </a><br/>
            <?php 
        }
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
    static function distribute(){
        /*
        (BAのプロジェクト編集画面からAjaxで要求)
        メニュー構成：
        配布 → 
            ファイル ${file}（ファイル名）を配布
            プロジェクト ${dir}（プロジェクト名）を配布
        
        パラメタ
        src  ファイル名またはフォルダ名（home/${teacher}/ からの相対パス)
        このクラスの各ユーザの同一ファイルにコピー
        もし同一ファイルがあったらコピーしない
        */
        $class=Auth::curClass2();
        
        ?>
        <!-- ajax なのでこれらHTMLは表示しない？ -->
        <h1><?=$class->id?> - 課題配布</h1><hr>
        <h2>教員のプロジェクト一覧</h2>ファイルの中身を含めて履修者に配布されます<hr>
        <a href="a.php?Class/show">クラス管理に戻る</a>
        <?php
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
        <a href="a.php?Class/show">クラス管理に戻る</a>
        <?php
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
}

?>