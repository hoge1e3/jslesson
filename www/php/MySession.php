<?php
require_once __DIR__."/data/pdo.php";
if (!defined("SESSION_TIMEOUT")) {
    define("SESSION_TIMEOUT",60*60*24*30*1);
}
if (!defined("MYSESSION_DATA")) {
    define("MYSESSION_DATA","MYSESSION_DATA");
}
class MySession {
    static $id,$data;
    public static function startWith($i) {
        self::$id=$i;
        self::load();
    }
    public static function start() {
        if (isset(self::$id)) {
            return self::$id;
        }
        $idname="mysessionID";
        if (isset($_COOKIE[$idname])) {
            self::$id=$_COOKIE[$idname];
        } else {
            self::$id=self::publish();
            setcookie($idname,self::$id,time()+SESSION_TIMEOUT);
        }
        self::load();
    }
    public static function publish() {
        do {
            $id=rand(100000000 ,999999999);
        } while (pdo_select1("select id from mysession where id=?",$id));
        return $id;
    }
    public static function get() {
        self::start();
        $a=func_get_args();
        $key=$a[0];
        if (count($a)===2) {
            $default=$a[1];
            if (!self::has($key)) return $default;
        }
        return self::$data->{$key};
    }
    public static function has($key) {
        self::start();
        return isset(self::$data->{$key});
    }
    public static function set($key,$value) {
        self::start();
        self::$data->{$key}=$value;
        self::save();
    }
    public static function load() {
        self::session_start_once();
        if (isset($_SESSION[MYSESSION_DATA]) && $_SESSION[MYSESSION_DATA]) {
            $data_json=$_SESSION[MYSESSION_DATA];
        } else {
            $rec=pdo_select1("select data from mysession where id=?",self::$id);
            if (!$rec) {
                return self::$data=new stdClass();
            }
            $data_json=$rec->data;    
            $_SESSION[MYSESSION_DATA]=$data_json;
        }
        self::$data=json_decode($data_json);
    }
    public static function save() {
        self::session_start_once();
        $data_json=json_encode(self::$data);
        $_SESSION[MYSESSION_DATA]=$data_json;
        pdo_insertOrUpdate("mysession",array("id"=>self::$id),array("time"=>time(), "data"=>$data_json));
    }
    public static function clear() {
        self::session_start_once();
        if (isset($_SESSION[MYSESSION_DATA])) unset($_SESSION[MYSESSION_DATA]);
        self::start();
        pdo_exec("delete from mysession where id=?",self::$id);
    }
    public static function clean() {
        pdo_exec("delete from mysession where time < ?" ,time()-SESSION_TIMEOUT);
    }
    static function session_start_once() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }
}


?>
