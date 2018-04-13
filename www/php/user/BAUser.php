<?php
req("BAClass","pdo");
class BAUser {
    var $_class;
    var $name;
    var $password;
    var $options;
    function __construct($class,$name) {
        if (!$class instanceof BAClass) {
            throw new Exception("class should be BAClass");
        }
        $this->_class=$class;
        $this->name=$name;
        if (!is_string($this->name)) {
            throw new Exception("$name should be string");
        }
    }
    function getPass(){
        $pdo = pdo();
        $sth=$pdo->prepare("select pass from user where class = ? and name = ?");
        $sth->execute(array($this->_class->id,$this->name));
        $p=$sth->fetchAll();
        return $p[0]["pass"];
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
    function make(){
        if ($this->exists()) {
            throw new Exception($this->name."はすでに存在します");
        }
        $pdo = pdo();
	    $sth=$pdo->prepare("insert into user(class,name,pass,options) values( ? , ? , ? , ? )");
	    $sth->execute(array($this->_class->id,$this->name,$this->password,$this->options));

    }
    // update
    function edit(){
        if (!$this->exists()) {
            throw new Exception($this->name."は登録されていません");
        }
        $pdo = pdo();
	    $sth=$pdo->prepare("update user set pass = ? , options = ? where class = ? and name = ?");
	    $sth->execute(array($this->password,$this->options,$this->_class->id,$this->name));

    }

    function setOptions($key,$value){
        if(self::exists()){
            $this->options=self::getOptions();
        }
        $this->options[$key]=$value;
        $this->options=json_encode($this->options);
    }
    function getOptions(){
        $pdo = pdo();
        $sth=$pdo->prepare("select options from user where class = ? and name = ?");
    	$sth->execute(array($this->_class->id,$this->name));
    	$u=$sth->fetchAll();
    	$this->options=$u[0];
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
    function exists(){
        $pdo = pdo();
        $sth=$pdo->prepare("select * from user where class = ? and name = ?");
    	$sth->execute(array($this->_class->id,$this->name));
    	if (count($sth->fetchAll())==0){
	        return false;
    	}else{
    	    return true;
    	}
    }
    function getLog(){
        $fn=BA_LOG."/".$this->_class->id."-".$this->name."-data.log";
        if(file_exists($fn)){
            return file($fn);
        }else{
            return array((object) array('date'=>'未実行','time'=>'未実行','filename'=>'','result'=>'','detail'=>'','code'=>(object) array('C'=>'','HTML'=>'')));
        }
    }
    function publishAccessToken() {
        $res=rand(1000000,
                  9999999);
        pdo_insertOrUpdate("accessToken",
            array("class"=>$this->_class->id, "user"=>$this->name),
            array("token"=>$res)
        );
        return $res;
    }
    function getAccessToken() {
        $r=pdo_select1(
            "select * from accessToken where class=? and user=?",
            $this->_class->id, $this->name);
        if ($r) return $r->token;
        return $this->publishAccessToken();
    }
    static function fromAccessToken($t) {
        $r=pdo_select1(
            "select * from accessToken where token=?",$t);
        if ($r) {
            return new BAUser(new BAClass($r->{"class"}),$r->user);
        }
    }
}
?>
