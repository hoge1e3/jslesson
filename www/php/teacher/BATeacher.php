<?php
class BATeacher {
    var $name;//DEPRECATED
    var $id;
    function __construct($name) {
        $this->name=$name;//DEPRECATED
        $this->id=$name;
    }
    function isTeacherOf($class) {
        //このユーザは$class の教員roleを持つか？
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where class = ? and user = ? and type = ?");
    	$sth->execute(array($class->id,$this->id,Auth::TEACHER));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
    function isSysAd() {
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where user = ? and type = ?");
    	$sth->execute(array($this->id,Auth::SYSAD));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
    function changePass($pass){
        $pdo = pdo();
        $shadow=self::pass2shadow($pass);
        $sth=$pdo->prepare("update teacher set pass = ?, shadow=? where name = ?");
    	$sth->execute(array($pass,$shadow, $this->id));
    	if ($sth->rowCount()==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
    static function pass2shadow($pass) {
        return hash(SHADOW_ALGO,SHADOW_SALT.$pass);
    }
    static function shadowize() {
        $ts=pdo_select("select * from teacher ");
        foreach ($ts as $t) {
            if (strlen( $t->pass )>0 ) {
                $t->shadow=self::pass2shadow($t->pass);
                pdo_update2("teacher",
                array("name"=>$t->name),
                array("shadow"=>$t->shadow) );
            }
        }
    }
}

?>
