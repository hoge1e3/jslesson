<?php
req("pdo","BAClass","BAUser","Assignment","DateUtil");
class Submission {
    var $id;
    var $assignment;
    var $time;
    var $user;
    var $files;
    static function schema() {
        return array(
            "assignment"=>"extkey",
            //"user"=>"string",
            "files"=>"object",
            "source"=>"string",
            "time"=>"integer"
        );
    }
    static function table() {
        return "submission";
    }
    function __construct($id=null) {
        if ($id==null) {
        } else {
            $this->id=$id;
        }
        $this->time=DateUtil::now();
        $this->loaded=false;
    }
    function record() {
        $s=pdo_select1("select * ".
        "from ".self::table()." where id=? ",
        $this->id);
        return $s;
    }
    function exists() {
        return $this->record();
    }
    function load() {
        $s=$this->record();
        $this->fromRecord($s);
        $this->loaded=true;
    }
    function fromRecord($s) {
        $this->id=$s->id;
        foreach(self::schema() as $k=>$t) {
            $val=$s->{$k};
            if ($t==="extkey") {
                $val=new Assignment($val);
            }
            if ($t==="object") $val=json_decode($val);
            $this->{$k}=$val;
        }
        $this->user=new BAUser($this->assignment->getClass(), $s->user);
    }
    function toRecord() {
        $rec=array(
        );
        $this->assignment->load();
        foreach(self::schema() as $k=>$t) {
            $val=$this->{$k};
            if ($t==="extkey") $val=$val->id;
            if ($t==="object") $val=json_encode($val);
            $rec[$k]=$val;
        }
        $rec["user"]=$this->user->name;
        return $rec;
    }
    function save() {
        if ($this->loaded) $this->update();
        else $this->insert();
    }
    function insert() {
        $rec=$this->toRecord();
        pdo_insert(self::table(),$rec);
    }
    function update() {
        $rec=$this->toRecord();
        pdo_update2(self::table(),array(
            "id"=>$this->id
        ),$rec);
    }
    function del() {
        pdo_exec("delete from ".self::table().
        " where id=?",$this->id);
    }
    function getMark() {
        return pdo_select1("select * from mark where submission=?",$this->id);
    }
    static function getLastByFile($user, $fileName) {
        $r=pdo_select("select * from submission ".
        "where user=? order by time desc ",$user->name);
        foreach ($r as $re) {
            $fs=json_decode($re->files);
            if ($fs && isset($fs->{$fileName})) {
                $s=new Submission();
                $s->fromRecord($re);
                return $s;
            }
        }
    }
    static function getLast($user, $name) {
        $a=new Assignment($user->_class,$name);
        if (!$a->exists()) throw new Exception("Assignment $name not found");
        $a->load();
        $r=pdo_select1("select * from submission ".
        "where assignment=? and user=? ".
        "order by time desc limit 1",$a->id,$user->name);
        if (!$r) return $r;
        $s=new Submission();
        $s->fromRecord($r);
        return $s;
    }
}
?>
