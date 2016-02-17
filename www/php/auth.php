<?php
require_once "NativeFS.php";

class Auth {
   function login($class,$user) {
        if (!$class)return "クラス名を入力してください。";
	if (!$user)return "ユーザ名を入力してください。";
	if (!file_exists("fs/home/$class")){
           return "存在しないクラスIDが入力されています。";
	}
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user)) {
	   setcookie("class",$class, time()+60*60*24*30);
           setcookie("user",$user, time()+60*60*24*30);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
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