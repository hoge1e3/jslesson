<?php
require_once __DIR__."/fs/NativeFS.php";
require_once __DIR__."/json.php";
require_once __DIR__."/MySession.php";
require_once __DIR__."/fs/AuthInfo.php";
require_once __DIR__."/fs/Permission.php";

//session_save_path("/tmp");
//ini_set('session.gc_maxlifetime',60*60*24);
//ini_set('session.gc_maxlifetime',10);
//ini_set('session.gc_divisor',1);
//ini_set('session.gc_probability',1);

class Auth {
    const TEACHER="teacher";
   static function login($class,$user) {
        if (!$class)return "クラス名を入力してください。";
	    if (!$user)return "ユーザ名を入力してください。";
	    if (!file_exists("fs/home/$class")){
           return "存在しないクラスIDが入力されています。";
	    }
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user) && $user!=self::TEACHER) {
	        //setcookie("class",$class, time()+60*60*24*30*6);
            //setcookie("user",$user, time()+60*60*24*30*6);
            /*if(session_id() == '') {
                session_start();
            }
            $_SESSION['class']=$class;
            $_SESSION['user']=$user;*/
            MySession::set("class",$class);
            MySession::set("user",$user);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
        }
    }
    static function loginTeacher($class,$pass) {
	    $json = new Services_JSON();
        if (!$class)return "クラス名を入力してください。";
	    if (!$pass)return "パスワードを入力してください。";
    	if (!file_exists("fs/home/$class")){
               return "存在しないクラスIDが入力されています。";
    	}
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$pass)) {
    	$fp=fopen("user/list.txt", "r");
    	while($line=fgets($fp)){
    	       $classlist=$json->decode($line);
    	       if($classlist["classid"] == $class){
    	           break;
    	       }
    	}
    	fclose($fp);
	   if(isset($classlist) && $classlist["pass"]==$pass){
	       // Success
            MySession::set("class",$class);
            MySession::set("user",self::TEACHER);
	       setcookie("class",$class, time()+60*60*24*30);
	       return true;
	   }else{
	       return "クラスIDかパスワードが間違っています。";
           }
        } else {
           return "パスワードは半角英数とハイフン、アンダースコアだけが使えます。";
        }
   }
   static function isTeacher() {
        return self::curUser()==self::TEACHER;       
   }
   static function curUser() {
        /*if(session_id() == '') {
            session_start();
        }
        if (!isset($_SESSION['user'])) return null;
        //return $_COOKIE["user"];
        return $_SESSION['user'];*/
        if (!MySession::has("user")) return null;
        return MySession::get("user");
   }
   static function curClass() {
        /*if(session_id() == '') {
            session_start();
        }
        //return $_COOKIE["class"];
        if (!isset($_SESSION['class'])) return null;
        return $_SESSION['class'];*/
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
   static function getFS() {
	    $class=self::curClass();
   	    $user=self::curUser();
   	    if ($user && $class) {
   	        $ap=new Permission(new AuthInfo($class,$user));
            return new NativeFS("fs/",$ap);//changeHOME(1)
            //return new NativeFS("fs/home/$class/$user/");//changeHOME
	   	} else {
	   	    return null;
	   	}
   }
}
?>