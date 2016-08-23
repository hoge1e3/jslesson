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
        $j=new Services_JSON;
        $vmc=$j->decode($scr);
        $root=$this->root;
        return Dtl::run($root,$vmc);
    }
    public function __toString() {return "system";}
    public static function initRoot($root) {// should call after DtlFS::initRoot
        $root->system=new DtlSys($root,$root->FS);
        $root->JSON=new Services_JSON;
    }
}
?>