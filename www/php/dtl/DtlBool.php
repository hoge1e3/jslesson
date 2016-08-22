<?php
class DtlBool {
    public $value;
    public function __construct($v) {
        $this->value=$v;
    }
    public function then() {
        return $this->value ? (new DtlTrue): (new DtlFalse);
    }
    public function toNumber() {
        return $this->value? 1 : 0 ;
    }
    public function __toString() {
        return $this->value;
    }
    public function not() {
        return !$this->value;        
    }
    public function _and() {
        if (!$this->value) return false;
        $c=func_get_args();
        for ($i=0;$i<$c;$i++) {
            if (!func_get_arg($i)) return false;
        }
        return true;
    }
    public function _or() {
        if ($this->value) return true;
        $c=func_get_args();
        for ($i=0;$i<$c;$i++) {
            if (func_get_arg($i)) return true;
        }
        return false;
    }
}
?>