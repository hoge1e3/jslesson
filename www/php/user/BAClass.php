<?php
class BAClass{
    var $id;
    function __construct($id) {
    	if (!is_string($id)) {
            throw new Exception(" class->id should be string");
        }
        if (!self::isValidClassName($id)) {
            throw new Exception("クラス名 $id は適切な名称ではありません．");
        }
        $this->id=$id;
    }
    static function getAll($teacher=null){ // :BATeacher
        if (!$teacher) {
            $teacher=Auth::isTeacher2();
        }
        if (!$teacher) {
            throw new Exception("You are not a teacher");
        }
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where user = ? and type = ?");
        $sth->execute(array($teacher->name,AUTH::TEACHER));
        $res=array();
        foreach ($sth->fetchAll() as $rec) {
            $res[]=new BAClass($rec["class"]);
        }
        return $res;
    }
    function getAllStu(){
        $pdo = pdo();
        $sth=$pdo->prepare("select * from user where class = ?");
        $sth->execute(array($this->id));
        $res=array();
        foreach ($sth->fetchAll() as $u) {
            $res[]=new BAUser($this,$u["name"]);
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
        $optJSON=$c[0]["options"];
        if($optJSON==="" || !$optJSON){
            $opt=new stdClass;
        } else {
            $opt=json_decode($optJSON);
        }
        if (defined("DEFAULT_CLASS_OPTIONS")) {
            foreach (DEFAULT_CLASS_OPTIONS as $k=>$v) {
                if (!isset($opt->{$k})) $opt->{$k}=$v;
            }
        }
        return $opt;
    }
    function getOption($key) {
        $opts=$this->getOptions();
        if (!isset($opts->{$key})) return null;
        return $opts->{$key};
    }
    function setOptions($opts){
        $pdo=pdo();
        $sth=$pdo->prepare("update class set options = ? where id = ?");;
        $sth->execute(array(json_encode($opts),$this->id));
    }
    function setOption($key, $value) {
        $opts=$this->getOptions();
        $opts->{$key}=$value;
        $this->setOptions($opts);
    }
    function setPasswordPolicy($p){
        $opts=$this->getOptions();
        $opts->passwordPolicy=$p;
        $this->setOptions($opts);
    }
    function allowRegistrationByUser($t=true) {
        $opts=$this->getOptions();
        $opts->disableRegistrationByUser=($t?"no":"yes");
        $this->setOptions($opts);
    }
    function registrationByUserAllowed() {
        $opts=$this->getOptions();
        if(isset($this->getOptions()->disableRegistrationByUser) &&
        $this->getOptions()->disableRegistrationByUser=="yes"){
            return false;
        }
        return true;
    }
    function useAssignment($flag=null) {
        $opts=$this->getOptions();
        if ($flag===null) {
            if(isset($this->getOptions()->useAssignment) &&
            $this->getOptions()->useAssignment=="yes"){
                return true;
            }
            return false;
        }
        $opts->useAssignment=($flag?"yes":"no");
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
        Auth::assertTeacher();
        $teacher=Auth::curTeacher();
        $sth=$pdo->prepare("insert into class(id) values(?)");
        $sth->execute(array($this->id));
        $sth=$pdo->prepare("insert into role(user,class,type) values(?,?,?)");
        $sth->execute(array($teacher->id,$this->id,AUTH::TEACHER));
        $this->mkdir();
        return true;
    }
    function mkdir(){
        if (!Auth::isTeacherOf($this)) {
            throw new Exception(" You are not the teacher of ".$this->id);
        }
        $fs=new NativeFS(BA_FS."/");
        $f=new SFile($fs,"/home/".$this->id."/");
        if (!$f->exists()) {
            $f->mkdir();
        }
    }
    function getAllLogs($minTime,$maxTime){
        req("LogFileToDBController");
        LogFileToDBController::run();
        $pdo = pdo();
        $sth=$pdo->prepare("select * from log where class = ? and time > ? and time < ?");
        $sth->execute(array($this->id,$minTime,$maxTime));
        return new RecordIterator($sth,PDO::FETCH_ASSOC);
        $res=array();
        //foreach ($sth->fetchAll() as $rec) {
        //    $res[]=$rec;
        //}
        while($rec = $sth->fetch_assoc()){
          $res[]=$rec;
        }
        return $res;
    }
    function getLogById($logid){
        $pdo = pdo();
        $sth=$pdo->prepare("select * from log where class = ? and id = ?");
        $sth->execute(array($this->id,$logid));
        $res=array();
        foreach ($sth->fetchAll() as $rec) {
            $res[]=$rec;
        }
        return $res;
    }
    function getLogByUser($userid){
        $pdo = pdo();
        $sth=$pdo->prepare("select id from log where class = ? and user = ?");
        $sth->execute(array($this->id,$userid));
        $res=array();
        foreach ($sth->fetchAll() as $rec) {
            $res[]=$rec;
        }
        return $res;
    }
}


?>
