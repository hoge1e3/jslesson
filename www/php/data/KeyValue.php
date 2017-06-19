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
    static function getRecord($key) {
        $class=Auth::curClass2();
        return pdo_select1("select * from `keyvalue` where `class`=? and `key`=?",$class->id,$key);
        /*$pdo=pdo();
        $sth=$pdo->prepare("select * from `keyvalue` where `class`=? and `key`=?");
        $sth->execute(array($class->id,$key));
        foreach ($sth->fetchAll() as $rec) {
            return $rec;
        }
        return null;*/
    }
    static function get($key) {
        $r=self::getRecord($key);
        if (is_null($r)) {
            return null;
        }
        return $r->value;
    }
    static function put($key,$value) {
        $class=Auth::curClass2();
        $r=self::getRecord($key);
        $pdo=pdo();
        if ($r==null) {
            pdo_insert("keyvalue", array("class"=>$class->id,"key"=>$key,"value"=>$value));
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
