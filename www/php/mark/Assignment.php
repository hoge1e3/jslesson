<?php
req("pdo");
class Assignment {
    var $id;
    var $_class;
    var $name;
    static function schema() {
        return array(
            "description"=>"string",
            "files"=>"object",
            "time"=>"integer",
            "deadline"=>"integer"
        );
    }
    function __construct($class,$name) {
        $this->_class=$class;
        $this->name=name;
    }
    function load() {
        $s=pdo_select1("select * ".
        "from assignment where class=? and name=? ",
        $this->_class->id, $this->name);
        $this->id=$s->id;
        $this->name=$s->name;
        foreach(self::schema() as $k=>$t) {
            $val=$s->{$k};
            if ($t==="object") $val=json_decode($val);
            $this->{$k}=$val;
        }
        $this->loaded=true;
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
}
?>
