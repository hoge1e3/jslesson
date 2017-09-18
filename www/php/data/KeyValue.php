<?php
/*
create table keyvalue (
	id integer primary key autoincrement,
	`class` varchar(32),
	`user` varchar(32),
	`key` varchar(32),
	`value` text
);
*/
req("pdo","auth");
class KeyValue {
    static $class;
    static function selectClassByURL($url) {
        //TODO: will deprecate by security issues
        req("Published");
        $class=Published::getClass($url);
        if ($class) {
            self::$class=new BAClass($class);
        }
    }
    static function getRecord($key,$group="default") {
        if (!self::$class) {
            $class=Auth::curClass2();
        } else {
            $class=self::$class;
        }
        if (!$class) throw new Exception("cannot get class info");
        /*if (!$class) {
            req("Published");
            $class=Published::getClass($_SERVER["REQUEST_URI"]);
            if (!$class) throw new Exception("cannot get class info: ".$_SERVER["REQUEST_URI"]);
            $class=new BAClass($class);
        }*/
        return pdo_select1("select * from `keyvalue` ".
        "where `class`=? and `key`=? and `group`=?",
        $class->id,$key,$group);
        /*$pdo=pdo();
        $sth=$pdo->prepare("select * from `keyvalue` where `class`=? and `key`=?");
        $sth->execute(array($class->id,$key));
        foreach ($sth->fetchAll() as $rec) {
            return $rec;
        }
        return null;*/
    }
    static function get($key,$group="default") {
        $r=self::getRecord($key,$group);
        if (is_null($r)) {
            return null;
        }
        return $r->value;
    }
    static function put($key,$value,$group="default") {
        $class=Auth::curClass2();
        $r=self::getRecord($key,$group);
        $pdo=pdo();
        if ($r==null) {
            pdo_insert("keyvalue", array("class"=>$class->id,"key"=>$key,"value"=>$value,"group"=>$group));
            //$sth=$pdo->prepare("insert into keyvalue(`class`,`key`,`value`) values(?,?,?)");
            //$sth->execute(array($class->id,$key,$value));
        } else {
            $r->value=$value;
            pdo_update("keyvalue", "id", $r);
            //$sth=$pdo->prepare("update keyvalue set `value`=?  where `id`=?");
            //$sth->execute(array($value, $r["id"]));
        }
    }
}

 ?>
