<?php 
class BATeacher {
    var $name;
    function BATeacher($name) {
        $this->name=$name;
    }
    function isTeacherOf($class) {
        //TODO
        //このユーザは$class の教員roleを持つか？
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where class = ? and user = ? and type = ?");
    	$sth->execute(array($class->id,$this->name,Auth::TEACHER));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
}

?>