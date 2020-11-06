<?php
req("BAClass","pdo");
class BAUser {
    var $_class;
    var $name;
    var $password;
    var $options;
    static function pass2enc($pass) {
        return openssl_encrypt($pass, 'AES-128-ECB', ENC_KEY);
    }
    static function enc2pass($enc) {
        return openssl_decrypt($enc, 'AES-128-ECB', ENC_KEY);
    }
    static function enc() {
        $ts=pdo_select("select * from user ");
        foreach ($ts as $t) {
            //if (strlen( $t->pass )>0 ) {
                $t->passenc=self::pass2enc($t->pass);
                if ($t->pass===self::enc2pass($t->passenc)) {
                    pdo_update2("user",
                    array("class"=>$t->class,"name"=>$t->name),
                    array("passenc"=>$t->passenc) );
                } else {
                    echo "No match ".$t->class.":".$t->name."<BR>";
                }
            //}
        }
    }
    static function encv() {
        $ts=pdo_select("select * from user ");
        foreach ($ts as $t) {
            //if (strlen( $t->pass )>0 ) {
                if ( $t->passenc===self::pass2enc($t->pass) &&
                     $t->pass===self::enc2pass($t->passenc)) {
                } else {
                    echo "No match ".$t->class.":".$t->name."<BR>";
                }
            //}
        }
    }

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
        $enc=(defined("ENC_PASS") && ENC_PASS);
        if ($enc) {
            $sth=$pdo->prepare("select passenc from user where class = ? and name = ?");//ENC
            $sth->execute(array($this->_class->id,$this->name));
            $p=$sth->fetchAll();
            return BAUser::enc2pass( $p[0]["passenc"] );//ENC
        } else {
            $sth=$pdo->prepare("select pass from user where class = ? and name = ?");//ENC
            $sth->execute(array($this->_class->id,$this->name));
            $p=$sth->fetchAll();
            return $p[0]["pass"];//ENC
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
    function make(){
        if ($this->exists()) {
            throw new Exception($this->name."はすでに存在します");
        }
        $pdo = pdo();
        $enc=(defined("ENC_PASS") && ENC_PASS);
        if ($enc) {
            $sth=$pdo->prepare("insert into user(class,name,passenc,options) values( ? , ? , ? , ? )");//ENC
    	    $sth->execute(array($this->_class->id,$this->name,BAUser::pass2enc($this->password),$this->options));//ENC
        } else {
            $sth=$pdo->prepare("insert into user(class,name,pass,options) values( ? , ? , ? , ? )");//ENC
    	    $sth->execute(array($this->_class->id,$this->name,$this->password,$this->options));//ENC
        }

    }
    // update
    function edit(){
        if (!$this->exists()) {
            throw new Exception($this->name."は登録されていません");
        }
        $pdo = pdo();
        $enc=(defined("ENC_PASS") && ENC_PASS);
        if ($enc) {
	        $sth=$pdo->prepare("update user set passenc = ? , options = ? where class = ? and name = ?");//ENC
	        $sth->execute(array(BAUser::pass2enc($this->password),$this->options,$this->_class->id,$this->name));//ENC
        } else {
            $sth=$pdo->prepare("update user set pass = ? , options = ? where class = ? and name = ?");//ENC
            $sth->execute(array($this->password,$this->options,$this->_class->id,$this->name));//ENC
        }
    }
    function update() {
        $this->edit();
    }

    function setOptions($key,$value){
        if(self::exists()){
            $this->options=self::getOptions();
        } else {
            $this->options=new stdClass;
        }
        $this->options->{$key}=$value;
        $this->options=json_encode($this->options);
    }
    function getOptions(){
        $pdo = pdo();
        $sth=$pdo->prepare("select options from user where class = ? and name = ?");
    	$sth->execute(array($this->_class->id,$this->name));
    	$u=$sth->fetchAll();
        $j=$u[0]["options"];
        if (!$j) $this->options=new stdClass;
    	else $this->options=json_decode($j);
        return $this->options;
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
        do {
            $res=rand(1000000,
                  9999999);
        } while ($this->fromAccessToken($res));
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

    function getAllLogs($minTime,$maxTime){
        req("LogFileToDBController");
        LogFileToDBController::run();
        $pdo = pdo();
        $sth=$pdo->prepare("select * from log where class = ? and user= ? and time > ? and time < ?");
        $sth->execute(array($this->_class->id,$this->name,$minTime,$maxTime));
        $res=array();
        foreach ($sth->fetchAll() as $rec) {
            $res[]=$rec;
        }
        return $res;
    }
    function getClass() {
        return $this->_class;
    }
}
?>
