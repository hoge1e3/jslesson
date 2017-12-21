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
req("pdo","auth","DateUtil");
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
    static function getCurClass() {
        if (!self::$class) {
            $class=Auth::curClass2();
        } else {
            $class=self::$class;
        }
        if (!$class) throw new Exception("cannot get class info");
        return $class;
    }
    static function ls($group="default") {
        $class=self::getCurClass();
        $a=pdo_select("select * from `keyvalue` ".
        "where `class`=? and `group`=?",
        $class->id,$group);
        $res=array();
        $res['class']=$class->id;
        $res['group']=$group;
        $res['data']=array();
        foreach ($a as $e) {
            $rese=new stdClass;
            $rese->lastUpdate=$e->time-0;
            //$rese->name=$e->key;
            $res['data'][$e->key]=$rese;
        }
        return $res;
    }
    static function getRecord($key,$group="default") {
        $class=self::getCurClass();
        return pdo_select1("select * from `keyvalue` ".
        "where `class`=? and `key`=? and `group`=?",
        $class->id,$key,$group);
    }
    static function get($key,$group="default") {
        $r=self::getRecord($key,$group);
        if (is_null($r)) {
            return null;
        }
        return $r->value;
    }
    static function put($key,$value,$group="default") {
        $class=self::getCurClass();
        $r=self::getRecord($key,$group);
        $pdo=pdo();
        if ($r==null) {
            pdo_insert("keyvalue",
            array("time"=>DateUtil::now(), "class"=>$class->id,"key"=>$key,"value"=>$value,"group"=>$group));
            //$sth=$pdo->prepare("insert into keyvalue(`class`,`key`,`value`) values(?,?,?)");
            //$sth->execute(array($class->id,$key,$value));
        } else {
            $r->time=DateUtil::now();
            $r->value=$value;
            pdo_update("keyvalue", "id", $r);
            //$sth=$pdo->prepare("update keyvalue set `value`=?  where `id`=?");
            //$sth->execute(array($value, $r["id"]));
        }
    }
}

 ?>
