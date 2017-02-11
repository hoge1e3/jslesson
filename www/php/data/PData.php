<?php
class PMap {
    var $raw;
    function PMap($src) {
        if (func_get_args()==0) {
            $this->raw=array();
        } else if (is_object($src)) {
            $this->raw=$src;
        } else if (is_array($src)) {
            $this->raw=$src;
        }   
    }
    
}

class PList {
    function PList($src) {
        
    }

}
?>