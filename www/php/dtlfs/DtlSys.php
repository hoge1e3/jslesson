<?php
require_once __DIR__."/../json.php";

class DtlSys {
    public $root,$fs;
    public function DtlSys($root,$fs) {
        $this->root=$root;
        $this->fs=$fs;
    }
    public function _use($path){
        $scr=$this->fs->getContent($path);
        $vmc=json_decode($scr, JSON_OBJECT_AS_ARRAY);
        $root=$this->root;
        return Dtl::run($root,$vmc);
    }
    public function __toString() {return "system";}
    public static function initRoot($root) {// should call after DtlFS::initRoot
        $root->system=new DtlSys($root,$root->FS);
        $root->JSON=new DJSON;
    }
}
class DJSON {
    function encode($obj) {
        return json_encode($obj);
    }
    function decode($json) {
        return json_decode($json, JSON_OBJECT_AS_ARRAY);
    }
}

?>
