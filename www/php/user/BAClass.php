<?php
class BAClass{
    var $id;
    function BAClass($id) {
    	if (!is_string($id)) {
            throw new Exception(" class->id should be string");
        }
        if (!self::isValidClassName($id)) {
            throw new Exception("クラス名 $id は適切な名称ではありません．");
        }
        $this->id=$id;
    }
    static function getAll(){
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where user = ? and type = ?");
        $sth->execute(array(Auth::curUser(),AUTH::TEACHER));
        $res=array();
        foreach ($sth->fetchAll() as $rec) {
            $res[]=new BAClass($rec["class"]);    
        }
        return $res;
    }
    function getUser($name) {
        return new BAUser($this,$name);
    }
    function getRequests() {
        //TODO
        //このクラスの再発行リクエスト一覧を取得(arrayで)
        
    }
    function passwordRequired() {
        //TODO
        //このクラスのユーザはパスワードを要求されるか？
        if(isset($this->getOptions()->passwordPolicy) && $this->getOptions()->passwordPolicy=="yes"){
            return true;
        }
        return false;
    }
    function getOptions(){
        $pdo=pdo();
        $sth=$pdo->prepare("select options from class where id = ?");
        $sth->execute(array($this->id));
        $c=$sth->fetchAll();
        if($c[0]["options"]==""){
            return new stdClass;
        }
        return json_decode($c[0]["options"]);
    }
    function setOptions($opts){
        $pdo=pdo();
        $sth=$pdo->prepare("update class set options = ? where id = ?");;
        $sth->execute(array(json_encode($opts),$this->id));
    }
    function setPasswordPolicy($p){
        $opts=$this->getOptions();
        $opts->passwordPolicy=$p;
        $this->setOptions($opts);
    }
    static function isValidClassName($classname) {
        //TODO
        return true;
    }

    function exists() {
        $pdo=pdo();
        $sth=$pdo->prepare("select * from class where id = ?");
        $sth->execute(array($this->id));
        $c=$sth->fetchAll();
        if(count($c)==0){
            return false;
        }else{
            return true;
        }
    }
    function make(){
        if ($this->exists()) {
            throw new Exception("クラス ".$this->id." は存在します");
        }
        $pdo=pdo();
        $sth=$pdo->prepare("insert into class(id) values(?)");
        $sth->execute(array($this->id));
        $sth=$pdo->prepare("insert into role(user,class,type) values(?,?,?)");
        $sth->execute(array(Auth::curUser(),$this->id,AUTH::TEACHER));
        $this->mkdir();
        return true;
    }
    function mkdir(){
        if (!Auth::isTeacherOf($this)) {
            throw new Exception(" You are not the teacher of ".$this->id);
        }
        $fs=new NativeFS("fs/");
        $f=new SFile($fs,"/home/".$this->id."/");
        if (!$f->exists()) {
            $f->mkdir();
        }
    }
}


?>