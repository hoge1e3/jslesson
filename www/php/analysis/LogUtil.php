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
        $fs=new NativeFS(BA_LOG."/");
        return new SFile($fs,"/");
    }
    static function getLogFiles() {
        $class=Auth::curClass();
        return self::getLogFileOf($class);
    }
    static function getLogFilesOf($class) {
        $logD=self::getLogDir();
        $files=$logD->listFiles();
        $res=array();
        if (Auth::isTeacherOf($class)) {
            foreach ($files as $file) {
                if (self::isLogFileOf($file,$class)) {
                    $res[]=$file;
                }
            }
        }
        return $res;
    }
    static function isLogFileOf($file,$class) {
        return ($file->startsWith($class) && $file->endsWith("-data.log"));
    }
    static function readLog($file) {
        return self::readJSONLines($file);
        //return array_map("json2array",$file->lines());
    }
    static function readJSONLines($file) {
        $res=array();
        foreach ($file->lines() as $line) {
            if ($line) $res[]=json2array($line);
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
}
?>
