<?php
require_once __DIR__."/PathUtil.php";
class Permission {
    const READ=1,WRITE=2,READMETA=4,WRITEMETA=8,LS=16;
    public static function opr2str($opr) {
        switch($opr) {
        case self::READ: return "read";
        case self::WRITE: return "write";
        case self::READMETA: return "readmeta";
        case self::WRITEMETA: return "writemeta";
        case self::LS: return "ls";
        }
        return $opr;
    }
    private $authInfo; //   {class,user}
    public function __construct($authInfo) {
        $this->authInfo=$authInfo;
    }
    public function isAccessible($p,$opr) {// $p:Path String
        $p=PathUtil::resolveDotDot($p);
        if (PathUtil::endsWith($p,".php")) return false;
        if (PathUtil::endsWith($p,".cgi")) return false;
        $anyRead=(self::READ|self::LS|self::READMETA);
        //$p=$f.path();
        $ps=explode(PathUtil::SEP,$p);
        // scripts
        if (count($ps)>=2 && $ps[1]=="scripts" && ($opr & $anyRead)) {
            return true;
        }
        if (count($ps)>=2 && $ps[1]=="pub") {
            return true;
        }
        if (count($ps)<2 || $ps[1]!=="home") {
            return false;
        }
        if (count($ps)>=3) $class=$ps[2]; else $class="";
        if (count($ps)>=4) $user=$ps[3]; else $user="";
        // lesson_samples
        if ($class=="lesson_samples" && ($opr & $anyRead) ) {// ls, read
            return true;
        }
        // other class
        if ($class!==$this->authInfo->getClassID()) {
            return false;
        }
        // his/her own folder
        if ($user===$this->authInfo->getUserName()) {
            return true;
        }
        // if teacher....
        $t=$this->authInfo->teacher;
        if ($t) {
            if (!isset($this->classes)) {
                $this->classes=BAClass::getAll($t);
            }
            // can access all file of his/her classes
            foreach ($this->classes as $c) {
                if ($class===$c->id) return true;
            }
        }
        // other students in his/her class
        return false;// toriaezu
        //if ($opr=="write") return false;
    }
    public function check($p,$opr) {
        if ($this->isAccessible($p,$opr)) return $this;
        http_response_code(403);
        throw new Exception("Cannot ".self::opr2str($opr).": $p");
    }
}
?>
