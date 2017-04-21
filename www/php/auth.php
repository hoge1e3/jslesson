<?php
require_once __DIR__."/fs/NativeFS.php";
require_once __DIR__."/json.php";
require_once __DIR__."/MySession.php";
require_once __DIR__."/fs/AuthInfo.php";
require_once __DIR__."/fs/Permission.php";
require_once __DIR__."/fs/SFile.php";
require_once __DIR__."/data/JSONLines.php";
require_once __DIR__."/data/pdo.php";

//session_save_path("/tmp");
//ini_set('session.gc_maxlifetime',60*60*24);
//ini_set('session.gc_maxlifetime',10);
//ini_set('session.gc_divisor',1);
//ini_set('session.gc_probability',1);

$fs=new NativeFS(); 
$userDir=new SFile($fs,"user/");
class Auth {
    const TEACHER="teacher";
    static function login($class,$user,$pass=null) {
        // 戻り値：
        // ユーザ登録が必要 "register"
        // パスワード入力が必要 "requirepass"
        if (!$class)return "クラス名を入力してください。";
	    if (!$user)return "ユーザ名を入力してください。";
	    if (!file_exists("fs/home/$class")){
           return "存在しないクラスIDが入力されています。";
	    }
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user) && $user!=self::TEACHER) {
            MySession::set("class",$class);
            MySession::set("user",$user);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
        }
    }
    static function setPass($class,$user,$pass) {
        //パスワードを登録する．users_$class$.txtに書く
        // request_$class$.txt から $userに関するエントリを全削除
    }
    static function resetRequest($class,$user) {
        //再発行リクエストを行なう   
        //PINを生成して，request_$class$.txt と セッションに書き込む
        //PINが他とかぶらないように！
    }
    static function permitReset($class,$user,$pin) {
        //$class/$userのユーザで，$pinをもっているユーザ（セッション）に対して
        //再発行を許可する（request_$class$.txt に allowed:trueを書き込む
    }
    static function resetPermitted() {
        //再発行を許可されているか？
        //セッション情報からpin取得->該当pin がallowed:trueとなっているか？
        
    }
    static function getRequests($class) {
        // $class の再発行リクエスト一覧を取得
    }
    static function userDir() {
        global $userDir;
        return $userDir;
    }
    static function classList() {
        // list.txtを取得
        /*使い方：
        $classList=self::classList();
        $classObj=$classList->find1("classid",$classid);
        $newClass=new stdClass;
        $newClass->classid="newclass";
        $newClass->pass="newpass";
        $classList->add($newClass);
        $classList->del($classObj);
        $classObj->pass=$newPass;
        $classList->save();
        */
        $classList=new JSONLines(self::userDir()->rel("list.txt"));
        return $classList;
    }
    static function loginTeacher($class,$pass,$ignoreNonexistent=false) {
	    $json = new Services_JSON();
        if (!$class)return "クラス名を入力してください。";
	    if (!$pass)return "パスワードを入力してください。";
    	if (!file_exists("fs/home/$class") && !$ignoreNonexistent){
               return "存在しないクラスIDが入力されています。";
    	}
        $classObj=self::classList()->find1("classid",$class);
	    if($classObj!=null && $classObj->pass==$pass){
	        // Success
            MySession::set("class",$class);
            MySession::set("user",self::TEACHER);
	        //setcookie("class",$class, time()+60*60*24*30);
	        return true;
	    }else{
	        return "クラスIDかパスワードが間違っています。";
        }
   }
    static function loginTeacher2($name,$pass,$ignoreNonexistent=false) {
	    $json = new Services_JSON();
        if (!$name)return "メールアドレスを入力してください。";
	    if (!$pass)return "パスワードを入力してください。";
	    $pdo = pdo();
	    //echo "select * from user where class = 'teacher' and name ='$name' and pass = '$pass'";
    	$sth=$pdo->prepare("select * from user where class = ? and name = ? and pass = ?");
    	$sth->execute(array(self::TEACHER,$name,$pass));
    	if (count($sth->fetchAll())==0){
	        return "メールアドレスかパスワードが間違っています。";
    	}else{
	        // Success
	        MySession::set("class",self::TEACHER);
	        MySession::set("user",$name);
	        //setcookie("class",$class, time()+60*60*24*30);
	        return true;
	    }
   }
   static function isTeacher() {
        return self::curUser()==self::TEACHER;       
   }
   static function isTeacherOf($class){
        $pdo = pdo();
    	$sth=$pdo->prepare("select * from role where class = ? and user = ? and type = ?");
    	$sth->execute(array($class,self::curUser(),self::TEACHER));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
   }
   static function curUser() {
        if (!MySession::has("user")) return null;
        return MySession::get("user");
   }
   static function curClass() {
        if (!MySession::has("class")) return null;
        return MySession::get("class");
   }
    static function loggedIn() {
	    $class=self::curClass();
   	    $user=self::curUser();
   	    return ($user && $class);
    }
    static function homeDir(){
        if (!self::loggedIn()) throw new Exception("Not logged in");
        return "/home/".self::curClass()."/".self::curUser()."/";   
    }
    static function home() {
        return new SFile(self::getFS(),self::homeDir());
    }
    static function mkdir($class) {
        if (!self::isTeacherOf($class)) {
            throw new Error(" You are not the teacher of $class");
        }
        $fs=new NativeFS("fs/");
        $f=new SFile($fs,"/home/".$class."/");
        if (!$f->exists()) {
            $f->mkdir();
        }
    }
    static function getFS() {
	    $class=self::curClass();
   	    $user=self::curUser();
   	    if ($user && $class) {
   	        $ap=new Permission(new AuthInfo($class,$user));
            return new NativeFS("fs/",$ap);
	   	} else {
	   	    return null;
	   	}
    }
}
?>