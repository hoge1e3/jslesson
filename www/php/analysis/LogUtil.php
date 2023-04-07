<?php
require_once __DIR__."/../PQuery.php";
req("auth","BAClass","BAUser");
class LogUtil {
    static $verbose=0;
    static function detectProgram($e) {
        $code=new PQuery($e,"code");
        if ($code->isArray()) {
            $js=self::stripCommentAndSpaces($code->attrDef("JavaScript",""));
            if ($js!="") return $js;
            $html=$code->attrDef("HTML","");
            if (preg_match("/<\\s*script/",$html)) return $html;
            return "";
        } else {
            return $code->resolveDef("");
        }
    }
    static function stripCommentAndSpaces($s) {
        $s=preg_replace("|//[^\\n]*\\n|","",$s);
        $s=preg_replace("/^\\s*/","",$s);
        $s=preg_replace("/\\s*$/","",$s);
        return $s;
    }
    static function getFileName($e) {
        $fname="";
        if (isset($e["nearest"])) {
            if (is_array($e["nearest"])) {
                foreach ($e["nearest"] as $s) {
                    $fname.="$s,";
                }
            } else {
                $fname=$e["nearest"];
            }
        } else {
            $fname=$e["filename"];
            $fname=PathUtil::name($fname);
        }
        return $fname;
    }
    static function getLogDir() {
        require_once __DIR__."/../ErrorHandler.php";
        require_once __DIR__."/../auth.php";
        require_once __DIR__."/../fs/SFile.php";
        require_once __DIR__."/../fs/NativeFS.php";
        $fs=new NativeFS(BA_LOG."/");
        return new SFile($fs,"/");
    }
    static function getLogFiles() {
        $class=Auth::curClass();
        return self::getLogsFileOf($class);
    }
    static function getLogFilesOf($classOrUser) {
        $logD=self::getLogDir();
        $files=$logD->listFiles();
        $res=array();
        foreach ($files as $file) {
            if (self::isLogFileOf($file,$classOrUser)) {
                $res[]=$file;
            }
        }
        return $res;
    }
    static function isLogFileOf($file,$cid) {
        if ($cid instanceof BAClass) {
            $cid=$cid->id;
        } else if ($cid instanceof BAUser) {
            return self::isLogFileOfUser($file, $cid->_class->id, $cid->name);
        }
        return ($file->startsWith($cid."-") && $file->endsWith("data.log"));
    }
    static function isLogFileOfUser($file,$cid,$uid){
      return ($file->startsWith($cid."-".$uid."-") && $file->endsWith("data.log"));
    }
    static function readLog($file) {
        return self::readJSONLines($file);
        //return array_map("json2array",$file->lines());
    }
    static function readJSONLines($file) {
        $res=array();
        foreach ($file->lines() as $line) {
            if ($line) $res[]=decode_json($line,JSON_OBJECT_AS_ARRAY);
        }
        return $res;//array_map("json2array",$file->lines());
    }
    static function writeJSONLines($file,$lines) {
        $buf="";
        foreach ($lines as $line) {
            $buf.=json_encode($line)."\n";
        }
        $file->text($buf);
    }
    static function get($id){
        $r=pdo_select1("select * from log where id = ?",$id);
        if (!$r) {
            throw new Exception("ID $id is not found");
        }
        //print_r($r);
        $user=Auth::curUser2();
        $class=$user->_class;
        if (Auth::isTeacherOf($class) || $class->getOption("showOtherStudentsLogs")) {
            if ($r->{"class"}!==$class->id) {
                throw new Exception("ID $id is not of ".$class->id);
            }
        } else {
            if ($r->{"class"}!==$class->id || $r->user!==$user->name) {
                throw new Exception("ID $id is not of ".$class->id.":".$user->name);
            }
        }
        return $r;
    }
    static function getCode($raw) {
        if (!isset($raw->code)) return "";
        $code=$raw->code;
        foreach ($code as $lang=>$code) {
            if ($lang ==="HTML") continue;
            if ($lang ==="html") continue;
            return $code;
        }
        return "";
    }
    static function isValidEntry($l){
        if ($l["filename"]==="") {
            return false;
        }
        if (!json_decode($l["raw"])) {
            return false;
        }
        return true;
    }
}
?>
