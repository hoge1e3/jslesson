<?php
require_once "NativeFS.php";
require_once "json.php";

class Auth {
   function login($class,$user) {
        if (!$class)return "クラス名を入力してください。";
	if (!$user)return "ユーザ名を入力してください。";
	if (!file_exists("fs/home/$class")){
           return "存在しないクラスIDが入力されています。";
	}
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user)) {
	   setcookie("class",$class, time()+60*60*24*30*6);
           setcookie("user",$user, time()+60*60*24*30*6);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
        }
   }
   function loginTeacher($class,$pass) {
	$json = new Services_JSON();
        if (!$class)return "クラス名を入力してください。";
	if (!$pass)return "パスワードを入力してください。";
	if (!file_exists("fs/home/$class")){
           return "存在しないクラスIDが入力されています。";
	}
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$pass)) {
	   $fp=fopen("user/list.txt", "r");
	   //setcookie("class",$class, time()+60*60*24*30);
           //setcookie("user",$user, time()+60*60*24*30);
	   while($line=fgets($fp)){
	       $classlist=$json->decode($line);
	       //echo $classlist["classid"];
	       if($classlist["classid"] == $class){
	           break;
	       }
	   }
	   fclose($fp);
	   if(isset($classlist) && $classlist["pass"]==$pass){
	       // Success
	       setcookie("class",$class, time()+60*60*24*30);
	       return true;
	   }else{
	       return "クラスIDかパスワードが間違っています。";
           }
        } else {
           return "パスワードは半角英数とハイフン、アンダースコアだけが使えます。";
        }
   }
   function curUser() {
        return $_COOKIE["user"];
   }
   function curClass() {
        return $_COOKIE["class"];
   }
   function getFS() {
	    $class=self::curClass();
   	    $user=self::curUser();
   	    if ($user && $class) {
	   	    return new NativeFS("../fs/home/$class/$user");
	   	} else {
	   	    return null;
	   	}
   }
}
?>