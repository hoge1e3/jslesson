<?php
class DtlObj {
    private $ID;
    private $IDSeq;
    public function DtlObj($proto, $id) {
        $this->__proto__=$proto;
        if (is_null($proto)) $this->ID="ROOT";
        else $this->ID=$id;
    }
    public static function s_get($obj,$name) {
        if (is_null($name)) throw new Exception("名前が空です");
        if (is_object($obj)) {
            if (preg_match("/^__/",$name)) return null;
            $v=$obj->$name;
            if (is_null($v)) {
                $p=$obj->__proto__;
                if (is_null($p)) return $v;
                return self::s_get($p,$name);
            } else {
                return $v;
            }
        }
        throw new Exception("$obj から属性$nameを取得できません");
    }
    public static function s_set($obj,$name,$val) {
        if (is_null($name)) throw new Exception("名前が空です");
        if (is_object($obj)) {
            if (preg_match("/^__/",$name)) return null;
            return $obj->$name=$val;
        }
        throw new Exception("$obj には、属性$nameを書き込めません");
    }
    public function create() {
        $this->IDSeq++;
        $r=new DtlObj($this,$this->ID."->".$this->IDSeq);
        return $r;
    }
    public function __toString() {
        return "[Obj ".$this->ID."]";
    }
}
?>