<?php
require_once __DIR__."/PathUtil.php";
class Permission {
    private $authInfo; //   {class,user}
    public function Permission($authInfo) {
        $this->authInfo=$authInfo;
    }
    public function isAccessible($p,$opr) {// $p:Path String
        //$p=$f.path();
        $ps=explode(PathUtil::SEP,$p);
        if (count($ps)<2 || $ps[1]!=="home") {
            return false;    
        }
        if (count($ps)>=3) $class=$ps[2]; else $class="";
        if (count($ps)>=4) $user=$ps[3]; else $user="";
        // other class
        if ($class!==$this->authInfo->class) {
            return false;
        }
        // his/her own folder
        if ($user===$this->authInfo->user) {
            return true;
        }
        // other students in his/her class
        return false;// toriaezu
        //if ($opr=="write") return false;
    }  
    public function check($p,$opr) {
        if ($this->isAccessible($p,$opr)) return $this;
        throw new Exception("Cannot $opr to $p");
    }
}
?>