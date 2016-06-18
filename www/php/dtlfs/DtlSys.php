<?php
require_once"./json.php";

class DtlSys {
    public $scriptDir;
    public function DtlSys($scriptDir) {
        $this->scriptDir=$scriptDir;
    }
    public function _use($file){
        $f=$this->scriptDir->rel("$file.dtl.json");
        $root=Dtl::$root;
        $b=new DtlBlock($root, $f->getObj() );
        return $b->execute();
    }
    public function __toString() {return "system";}
}
?>