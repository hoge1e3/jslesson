<?php
req("pdo","BAClass");
class Assignment {
    var $id;
    var $_class;
    var $name;
    var $base; // "name"  or "id"
    static function schema() {
        return array(
            "description"=>"string",
            "files"=>"object",
            "time"=>"integer",
            "deadline"=>"integer"
        );
    }
    function __construct($classOrID,$name=null) {
        if ($name==null) {
            $this->base="id";
            $this->id=$classOrID;
        } else {
            $this->base="name";
            $this->_class=$classOrID;
            $this->name=$name;
        }
        $this->loaded=false;
    }
    function record() {
        if ($this->base=="name") {
            $s=pdo_select1("select * ".
            "from assignment where class=? and name=? ",
            $this->_class->id, $this->name);
        } else {
            $s=pdo_select1("select * ".
            "from assignment where id=? ",
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
            $this->_class=new BAClass($s->{"class"});
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
        pdo_update2("assignment",
        array("id"=>$this->id),array("name"=>$to));
    }
    function save() {
        if ($this->loaded) $this->update();
        else $this->insert();
    }
    function insert() {
        $rec=array(
            "class"=>$this->_class->id,
            "name"=>$this->name
        );
        foreach(self::schema() as $k=>$t) {
            $val=$this->{$k};
            if ($t==="object") $val=json_encode($val);
            $rec[$k]=$val;
        }
        pdo_insert("assignment",$rec);
    }
    function update() {
        $chk=pdo_select1("select * ".
        "from assignment where id<>? and name=? ",
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
        pdo_update2("assignment",array(
            "id"=>$this->id
        ),$rec);
    }
    function del() {
        pdo_exec("delete from assignment ".
        "where class=? and id=?",$this->_class->id,$this->id);
    }
}
?>
