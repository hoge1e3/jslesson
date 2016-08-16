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
            if (isset($obj->$name)) {
                return $obj->$name;
            } else {
                if (isset($obj->__proto__)) return self::s_get($obj->__proto__ ,$name);
                return null;
            }
        }
        throw new Exception("$obj から属性$name を取得できません");
    }
    public static function s_set($obj,$name,$val) {
        if (is_null($name)) throw new Exception("名前が空です");
        if (is_object($obj)) {
            if (preg_match("/^__/",$name)) return null;
            return $obj->$name=$val;
        }
        throw new Exception("$obj には、属性$name を書き込めません");
    }
    public function create() {
        $this->IDSeq++;
        $r=new DtlObj($this,$this->ID."->".$this->IDSeq);
        $init=self::s_get($r,"initialize");
        if (!is_null($init)) {
            DtlThread::run($r,$init,func_get_args());
        }
        return $r;
    }
    public function __toString() {
        return "[Obj ".$this->ID."]";
    }
}
?>