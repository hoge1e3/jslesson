<?php
class BAUser {
    var $_class;
    var $name;
    function BAUser($class,$name) {
        $this->_class=$class;
        $this->name=$name;
        if (!is_string($this->name)) {
            throw new Exception("$name should be string");
        }
    }
    function setPass($pass) {
        //TODO
        //パスワードを登録(変更)する．
        //reset_requestから 該当ユーザのエントリを削除
    }
    function requireReset() {
        //TODO
        //再発行リクエストを行なう   
        //PINを生成して，reset_request と セッションに書き込む
        //PINが他とかぶらないように！
        //PINを返す
    }
    function permitReset($pin) {
        //TODO
        //このユーザで，$pinをもっているセッションに対して
        //再発行を許可する．
        //reset_requestの該当レコードに allowed:trueを書き込む
    }
    function resetPermitted($pin) {
        //TODO
        //再発行を許可されているか？booleanを返す
        //該当$pin がallowed:trueとなっているか？
        
    }

    function isTeacherOf($class) {
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
    function isTeacher() {
        return $this->_class->id==Auth::TEACHER;       
    }
}
?>