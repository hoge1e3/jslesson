<?php
require_once __DIR__."/fs/NativeFS.php";
require_once __DIR__."/json.php";
require_once __DIR__."/MySession.php";
require_once __DIR__."/fs/AuthInfo.php";
require_once __DIR__."/fs/Permission.php";
require_once __DIR__."/fs/SFile.php";
require_once __DIR__."/data/JSONLines.php";
require_once __DIR__."/data/pdo.php";
require_once __DIR__."/user/BAClass.php";
require_once __DIR__."/user/BAUser.php";
require_once __DIR__."/Modules.php";
req("BATeacher");
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
        // TODO 戻り値：
        // ユーザ登録が必要 "register"
        // パスワード入力が必要 "requirepass"
        if (!$class)return "クラス名を入力してください。";
	    if (!$user)return "ユーザ名を入力してください。";
	    $c=new BAClass($class);
	    if (!$c->exists()){
           return "存在しないクラスIDが入力されています。";
	    }
	    $u=new BAUser($c,$user);
	    if($u->exists()){
	        if(!$c->passwordRequired()){
	            MySession::set("class",$class);
	            MySession::set("user",$user);
	            return true;
	        }else{
	            return "requirepass";
	        }
	    }else{
	        return "register";
	    }
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user) && $user!=self::TEACHER) {
            MySession::set("class",$class);
            MySession::set("user",$user);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
        }
    }
    static function resetPermitted() {
        curUser2()->resetPermitted(MySession::get("pin"));
    }
    static function userDir() {
        global $userDir;
        return $userDir;
    }
    static function classList() {//旧
        $classList=new JSONLines(self::userDir()->rel("list.txt"));
        return $classList;
    }
    static function loginTeacher($class,$pass,$ignoreNonexistent=false) {//旧
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
    	$sth=$pdo->prepare("select * from teacher where name = ? and pass = ?");
    	$sth->execute(array($name,$pass));
    	if (count($sth->fetchAll())==0){
	        return "メールアドレスかパスワードが間違っています。";
    	}else{
	        // Success
	        MySession::set("teacher",$name);
	        //MySession::set("class",self::TEACHER);
	        MySession::set("user",$name);
	        //setcookie("class",$class, time()+60*60*24*30);
	        return true;
	    }
    }
    static function loginUser($class,$user,$password){
        //TODO    
    }
    static function isTeacher() {//旧バージョン
        return self::curUser()==self::TEACHER;       
    }
    static function isTeacher2() {//新バージョン
	   if (MySession::has("teacher")) {
    	   $t=MySession::get("teacher");
    	   return new BATeacher($t);
	   } 
	   return null;
        //return self::curUser2()->isTeacher();
    }

    static function selectClass($class) {
        //(教員用) クラスを選択する
        $class=self::getClass($class);
        if (self::isTeacherOf($class)) {
            if (!is_string($class->id)) {
                throw new Exception("selClass: fail ".$class->id);
            }
            MySession::set("class",$class->id);
        } else {
            throw new Exception("You are not teacher of ".$class->id);
        }
    } 
    static function isTeacherOf($class){
        //現在ログインしているユーザは$class の教員roleを持つか？
        $t=self::isTeacher2();
        return $t->isTeacherOf(self::getClass($class));
        /*$pdo = pdo();
    	$sth=$pdo->prepare("select * from role where class = ? and user = ? and type = ?");
    	$sth->execute(array($class,self::curUser(),self::TEACHER));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}*/
    }
    static function getClass($class) {
        if ($class instanceof BAClass) return $class;
        return new BAClass($class);
    }
    static function curUser2() {
        if (!MySession::has("user")) return null;
        return self::curClass2()->getUser(MySession::get("user"));
    }
    static function curUser() {
        if (!MySession::has("user")) return null;
        return MySession::get("user");
    }
    static function curClass2() {
        if (!MySession::has("class")) return null;
        return new BAClass( MySession::get("class") );
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