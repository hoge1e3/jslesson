<?php
class DtlString {
    public $value;
    public function __construct($v) {
        $this->value=$v;
    }
    public function add($a) {
        return $this->value.$a;
    }
    public function toNumber() {
        return $this->value+0;
    }
    public function __toString() {
        return $this->value;
    }
    public function gt($a) {
        return $this->value>$a;
    }
    public function lt($a) {
        return $this->value<$a;
    }
    public function ge($a) {
        return $this->value>=$a;
    }
    public function le($a) {
        return $this->value<=$a;
    }
    public function eq($a) {
        return $this->value==$a;
    }
    public function ne($a) {
        return $this->value!=$a;
    }
}
?>