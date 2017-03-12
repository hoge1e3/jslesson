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
        <h1><?=$class->id?> - ユーザ一覧</h1>
        <a href="a.php?Teacher/home">クラス一覧に戻る</a><hr>
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
    }
}

?>