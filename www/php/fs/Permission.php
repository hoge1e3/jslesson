<?php
class Permission {
    private $authInfo; //   {class,user}
    public function Permission($authInfo) {
        $this->authInfo=$authInfo;
    }
    public function check($p,$opr) {// $p:Path String
        //$p=$f.path();
        $ps=split($p,"/");
        if (count($ps)>=2) $user=$p[1]; else $user="";
        if (count($ps)>=3) $class=$p[2]; else $class="";
        // other class
        if ($class!=$authInfo->class) {
            return false;
        }
        // his/her own folder
        if ($user==$authInfo->user) {
            return true;
        }
        // other students in his/her class
        return false;// toriaezu
        //if ($opr=="write") return false;
    }  
}
?>