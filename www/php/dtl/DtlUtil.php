<?php
class DtlUtil {
    public static function wrap($raw) {//non-recursive
        if (is_array($raw)) {
            return new DtlArray($raw);
        }
        return $raw;
    }
    public static function unwrap($wrapped) {// recursive(for JSON.stringify)
        if ($wrapped instanceof DtlArray) {
            $a=array();
            foreach ($wrapped->raw as $k=>$v) {
                $a[$k]=self::unwrap($v);
            }
            return $a;
        } else if (is_object($wrapped)) {
            $a=get_object_vars($wrapped);
            unset ($a["__proto__"]);
            return $a;
        }
        return $wrapped;
    }
    
}
?>