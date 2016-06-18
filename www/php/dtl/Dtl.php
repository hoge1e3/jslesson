<?php
require_once"DtlNumber.php";
require_once"DtlString.php";
require_once"DtlObj.php";
require_once"DtlBlock.php";
require_once"DtlArray.php";
require_once"DtlThread.php";
require_once"DtlUtil.php";
class Dtl {
    public static $root;
    public static function init() {
        self::$root=new DtlObj(null,"ROOT");
        self::$root->Array=new DtlArray;
        self::$root->Dict=self::$root->Array;
        self::$root->root=self::$root;
        self::$root->self=self::$root;
        self::$root->rootDir=$rootDir;
        return self::$root;
    }
    public static function run($vmcode) {
        $b=new DtlBlock(self::$root,$vmcode);
        return DtlThread::run(self::$root,$b,array());
    }
}
?>