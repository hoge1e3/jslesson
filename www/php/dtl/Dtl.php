<?php
require_once"DtlNumber.php";
require_once"DtlString.php";
require_once"DtlObj.php";
require_once"DtlBlock.php";
require_once"DtlBool.php";
require_once"DtlArray.php";
require_once"DtlThread.php";
require_once"DtlUtil.php";
class Dtl {
    //public static $root;
    public static function initRoot($root) {
        $root->Array=new DtlArray;
        $root->Dict=$root->Array;
        $root->root=$root;
        $root->self=$root;
        return $root;
    }
    public static function createEmptyRoot() {
        return new DtlObj(null,"ROOT");
    }
    public static function run($root,$vmcode) {
        //$root=self::createEmptyRoot();
        //self::initRoot($root);
        $b=new DtlBlock($root,$vmcode);
        return DtlThread::run($root,$b,array());
    }
}
?>