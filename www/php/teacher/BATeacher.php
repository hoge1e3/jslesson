<?php 
class BATeacher {
    var $name;//DEPRECATED
    var $id;
    function BATeacher($name) {
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
    function changePass($pass){
        $pdo = pdo();
        $sth=$pdo->prepare("update teacher set pass = ? where name = ?");
    	$sth->execute(array($pass,$this->id));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
}

?>