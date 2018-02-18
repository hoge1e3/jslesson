<?php
req("pdo","Assignment");
class Testcase {
    var $id;
    var $assignment;
    var $name;
    var $base;
    static function schema() {
        return array(
            "input"=>"string"
        );
    }
    function __construct($assignmentOrID,$name=null) {
        if ($name==null) {
            $this->base="id";
            $this->id=$assignmentOrID;
            if (!is_int($this->id)) throw new Exception("invalid arg for id");
        } else {
            $this->base="name";
            $this->assignment=$assignmentOrID;
            $this->name=$name;
            $this->loaded=false;
        }
    }
    function record() {
        if ($this->base=="name") {
            $s=pdo_select1("select * ".
            "from testcase where assignment=? and name=? ",
            $this->assignment->id, $this->name);
        } else {
            $s=pdo_select1("select * ".
            "from testcase where id=? ",
            $this->id);
        }
        return $s;
    }
    function exists() {
        return $this->record();
    }
    function load() {
        $s=$this->record();
        $this->id=$s->id;
        $this->name=$s->name;
        if ($this->base=="id") {
            $this->assignment=new Assignment($s->assignment);
            $this->assignment->load();
        }
        foreach(self::schema() as $k=>$t) {
            $val=$s->{$k};
            if ($t==="object") $val=json_decode($val);
            $this->{$k}=$val;
        }
        $this->loaded=true;
    }
    function renameTo($to) {
        $this->load();
        pdo_update2("testcase",
        array("id"=>$this->id),array("name"=>$to));
    }
    function save() {
        if ($this->loaded) $this->update();
        else $this->insert();
    }
    function insert() {
        $rec=array(
            "assignment"=>$this->assignment->id,
            "name"=>$this->name
        );
        foreach(self::schema() as $k=>$t) {
            $val=$this->{$k};
            if ($t==="object") $val=json_encode($val);
            $rec[$k]=$val;
        }
        pdo_insert("testcase",$rec);
    }
    function update() {
        $chk=pdo_select1("select * ".
        "from testcase where id<>? and name=? ",
        $this->id, $this->name);
        if ($chk) throw new Exception($this->name."はすでに存在します．");
        $rec=array(
            "name"=>$this->name
        );
        foreach(self::schema() as $k=>$t) {
            $val=$this->{$k};
            if ($t==="object") $val=json_encode($val);
            $rec[$k]=$val;
        }
        pdo_update2("testcase",array(
            "id"=>$this->id
        ),$rec);
    }
    function del() {
        pdo_exec("delete from testcase ".
        "where id=?",$this->id);
    }
}
?>
