<?php
class PQuery {
    var $key;
    public function PQuery($obj) {
        $this->obj=$obj;
        if (func_num_args()==1) {    
            $this->key=null;
        } else {
            $this->key=func_get_arg(1);
        }
    }
    public function isArray() {
        if ($this->key==null) {
            return is_array($this->obj);
        }
        return $this->exists() && is_array($this->resolve());
    }
    public function isObject() {
        if ($this->key==null) {
            return is_object($this->obj);
        }
        return $this->exists() && is_object($this->resolve());
    }
    public function exists() {
        if ($this->key==null) {
            return isset($this->obj);
        } else if ($this->obj instanceof PQuery) {
            return self::_exists($this->obj->resolveDef(null),$this->key);
        } else {
            return self::_exists($this->obj,$this->key);
        }
    }
    public static function _exists($obj,$key) { 
        if (is_array($obj)) {
            return isset($obj[$key]);
        } else if (is_object($this->obj)) {
            return isset($obj->$key);
        }
    }
    public function rel($path) {
        if ($this->exists()) {
            return new PQuery($this->resolve(),$path);
        } else {
            return new PQuery($this,$path);
        }
    }
    public function resolve() {
        if ($this->key==null) {
            return $this->obj;
        } else if ($this->obj instanceof PQuery) {
            return self::_resolve($this->obj->resolve(),$this->key);
        } else {
            return self::_resolve($this->obj,$this->key);
        }
    }
    public static function _resolve($obj,$key) { 
        if (is_array($obj)) {
            return $obj[$key];
        } else if (is_object($this->obj)) {
            return $obj->$key;
        }
    }
    public function resolveDef($def) {
        if ($this->exists()) return $this->resolve();
        return $def;
    }
    public function attrDef($key,$def) {
        return $this->rel($key)->resolveDef($def);
    }
    public function attr($key,$val) {
        if (func_num_args()==1) {    
            return $this->rel($key)->resolve();
        } else {
            self::_val($this->obj, $this->key,$val);
            return $this;
            //return $this->rel($key)->val($val);
        }
        
    }
    public function val($val) {
        if (func_num_args()==0) {    
            return $this->resolve();
        } else if ($this->key!=null) {
            self::_val($this->resolve(),$this->key,$val);
            return $this;
        } else {
            throw new Error("Cannot set");
        }
    }
    public static function _val($obj,$key,$val) { 
        if (is_array($obj)) {
            return $obj[$key]=$val;
        } else if (is_object($this->obj)) {
            return $obj->$key=$val;
        } else {
            throw new Error("Cannot _val");
        }
    }

}

?>