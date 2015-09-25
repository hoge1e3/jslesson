<?php
require_once "NativeFS.php";

class Auth {
   function login($user) {
        if (!$user) return "ユーザ名を入力してください。";
        if (preg_match('/^[a-zA-Z0-9\\-_]+$/',$user)) {
           setcookie("user",$user, time()+60*60*24*30);
           return true;
        } else {
           return "ユーザ名は半角英数とハイフン、アンダースコアだけが使えます。";
        }
   }
   function curUser() {
        return $_COOKIE["user"];
   }
   function getFS() {
   	    $user=self::curUser();
   	    if ($user) {
	   	    return new NativeFS("../fs/home/$user");
	   	} else {
	   	    return null;
	   	}
   }
}
?>