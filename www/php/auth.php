<?php
require_once __DIR__."/../config/config.php";
require_once __DIR__."/fs/NativeFS.php";
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

$fs=new NativeFS(BA_DATA."/");
$userDir=new SFile($fs,"user/");
class Auth {
    const TEACHER="teacher";
    const SYSAD="sysad";
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
	    if(!$u->exists()){
            if (!$c->registrationByUserAllowed()) {
                return "usernotexist";
            }
            return "register";
	    }else{
	        if(!$c->passwordRequired()){
	            MySession::set("class",$class);
	            MySession::set("user",$user);
	            return true;
	        }else{
	            return "requirepass";
	        }
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
        self::curUser2()->resetPermitted(MySession::get("pin"));
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
	    if (!$class)return "クラス名を入力してください。";
	    if (!$pass)return "パスワードを入力してください。";
    	if (!file_exists(BA_FS."/home/$class") && !$ignoreNonexistent){
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

    static function logAuthErr($mesg) {
        req("DateUtil");
        $line=DateUtil::toString(DateUtil::now()).": $mesg\n";
        $logFile=BA_LOG."/authErr.log";
        $fp=fopen($logFile,"a");
        fwrite($fp,$line);
        fclose($fp);
    }
    static function loginTeacher2($name,$pass,$ignoreNonexistent=false) {
	    if (!$name)return "メールアドレスを入力してください。";
	    if (!$pass)return "パスワードを入力してください。";
	    $pdo = pdo();

        $sth=$pdo->prepare("select * from teacher where name = ? and pass = ?");
    	$sth->execute(array($name,$pass));
        $sth_c=count($sth->fetchAll());

        $shadow=BATeacher::pass2shadow($pass);
        $sth2=$pdo->prepare("select * from teacher where name = ? and shadow = ?");
    	$sth2->execute(array($name,$shadow));
        $sth2_c=count($sth2->fetchAll());
        /*if ($sth_c!==$sth2_c) {
            self::logAuthErr(" pass!=shadow on Teacher $name pass=$sth_c, shadow=$sth2_c ");
        }*/
    	if ($sth_c==0 && $sth2_c==0){
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
    static function loginByToken($token) {
        $u=BAUser::fromAccessToken($token);
        if (!$u) return false;
        $uname=$u->name;
        $cid=$u->_class->id;
        MySession::set("class",$cid);
        MySession::set("user",$uname);
        return $u;
    }
    static function loginUser($class,$user,$pass){
        //TODO
	    $pdo = pdo();
        $enc=(defined("ENC_PASS") && ENC_PASS);
        if ($enc) {
            $sth=$pdo->prepare("select * from user where class = ? and name = ? and passenc = ?");//ENC
        	$sth->execute(array($class,$user,BAUser::pass2enc( $pass )));//ENC
        } else {
            $sth=$pdo->prepare("select * from user where class = ? and name = ? and pass = ?");//ENC
        	$sth->execute(array($class,$user,$pass));//ENC
        }
    	if (count($sth->fetchAll())==0){
    	    return false;
    	}else{
            MySession::set("class",$class);
            MySession::set("user",$user);
            return true;
    	}
    }
    static function su($user) {//nariSUmasi   $user:BAUser
        $t=self::curTeacher();
        if ($t->isTeacherOf($user->_class)) {
            MySession::set("class",$user->_class->id);
            MySession::set("user",$user->name);
        } else {
            throw new Exception("You are not the sudoer");
        }
    }
    static function assertTeacher($ignoreClass=false) {
      $t=self::curTeacher();
      if (!$t) {
        throw new Exception("You are not the teacher");
      }
      // when creating class...
      if ($ignoreClass) return $t;
      $c=self::curClass2();
      if (!$c) {
          return $t;
      }
      if ($t->isTeacherOf($c)) {
        return $t;
      }
      throw new Exception("You are not the teacher");
    }
    static function isTeacher() {//旧バージョン
        return self::curUser()==self::TEACHER;
    }
    static function curTeacher() {
        return self::isTeacher2();
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
        return $t && $t->isTeacherOf(self::getClass($class));
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
        $c=self::curClass2();
        if (!$c) return null;
        return $c->getUser(MySession::get("user"));
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
    static function logout() {
        MySession::clear();
    }
    static function homeDir(){
        if (!self::loggedIn()) throw new Exception("Not logged in");
        return "/home/".self::curClass()."/".self::curUser()."/";
    }
    static function home() {
        return new SFile(self::getFS(),self::homeDir());
    }
    static function homeOfClass($class) {//BAClass
        return new SFile(self::getFS(),"/home/".$class->id."/");
    }
    static function getFS() {
   	    $user=self::curUser2();
   	    $teacher=self::curTeacher();
   	    if ($user) {
   	        $ap=new Permission(new AuthInfo($user,$teacher));
            return new NativeFS(BA_FS."/",$ap);
	   	} else {
	   	    return null;
	   	}
    }
    static function getPublishedDir($project) {
        req("Published");
        $user=self::curUser2();
        return Published::getURL($user->_class->id, $user->name, $project);
    }
    static function context() {
        return new AuthContext();
    }
}
class AuthContext {
    function __construct() {
        $this->userObj=$this->user=Auth::curUser2();
        if (!$this->user) {
            throw new Exception("Not logged in");
        }
        $this->userId=$this->userID=$this->userName=$this->user->name;
        $this->classObj=$this->{"class"}=$this->_class=$this->user->_class;
        $this->classID=$this->classId=$this->className=$this->_class->id;
        $this->teacher=Auth::isTeacherOf($this->{"class"});
        // NOTE: this.teacher !== this.user
        //       (If the teacher predend to be him/her).
    }
    function isTeacher() {
        return $this->teacher;
    }
}
?>
