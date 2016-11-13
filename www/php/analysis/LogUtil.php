<?php
require_once __DIR__."/../json.php";
require_once __DIR__."/../PQuery.php";
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
        $fs=new NativeFS("log/");
        return new SFile($fs,"/");
    }
    static function getLogFiles() {
        $logD=self::getLogDir();
        $files=$logD->listFiles();
        $class=Auth::curClass();
        $res=array();
        foreach ($files as $file) {
            if ($file->startsWith($class) && $file->endsWith("-data.log")) {
                $res[]=$file;
            }
        }
        return $res;
    }
    static function readLog($file) {
        return array_map("json2array",$file->lines());
    }
}
?>