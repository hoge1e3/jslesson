<?php
require_once __DIR__."/../json.php";

class DtlSys {
    public $scriptDir,$root;
    public function DtlSys($root,$scriptDir) {
        $this->root=$root;
        $this->scriptDir=$scriptDir;
    }
    public function _use($file){
        $f=$this->scriptDir->rel("$file.dtl.json");
        $root=$this->root;
        $b=new DtlBlock($root, $f->getObj() );
        return $b->execute();
    }
    public function __toString() {return "system";}
}
?>