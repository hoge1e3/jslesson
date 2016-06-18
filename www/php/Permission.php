<?php
class Permission {
    private $top;
    public function Permission($top) {//$top:SFile
        $this->top=$top;
    }
    public function check($f,$opr) {
        if (is_null($this->top) || $this->top->contains($f)) return true;
        throw new Exception("Canno access to ".$f->path());
    }  
}
?>