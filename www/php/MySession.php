<?php
require_once __DIR__."/json.php";
require_once __DIR__."/fs/NativeFS.php";
class MySession {
    static $fs,$j,$id,$data;
    public static function start() {
        if (isset(self::$id)) {
            return self::$id;
        } 
        self::$fs=new NativeFS("/tmp/");
        self::$j=new Services_JSON();
        $idname="mysessionID";
        if (isset($_COOKIE[$idname])) {
            self::$id=$_COOKIE[$idname];
        } else {
            self::$id=rand(1,99999999);
            setcookie($idname,self::$id,time()+60*60*24*30*6);
        }
        self::load();
    }
    public static function fileName() {
        return "myses".self::$id.".json";
    } 
    public static function get($key) {
        self::start();
        return self::$data[$key];
    }
    public static function has($key) {
        self::start();
        return isset(self::$data[$key]);
    }
    public static function set($key,$value) {
        self::start();
        self::$data[$key]=$value;
        self::save();
    }
    public static function load() {
        if (!self::$fs->exists(self::fileName())) {
            return self::$data=array();
        }
        $c=self::$fs->getContent(self::fileName());
        self::$data=self::$j->decode($c);
    }
    public static function save() {
        $c=self::$j->encode(self::$data);
        //print "Save to ".self::fileName();
        self::$fs->setContent(self::fileName(),$c);
    }
}


?>