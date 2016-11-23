<?php
require_once __DIR__."/LogUtil.php";
require_once __DIR__."/../fs/NativeFS.php";
require_once __DIR__."/../fs/SFile.php";
require_once __DIR__."/../ErrorHandler.php";


class ScoreUtil {
    static $scoreSheetDir,$scoreDir;
    
    static function digest($p) {
        $code=LogUtil::detectProgram($p);
        return self::digestStr($code);
    }
    static function digestStr($s) {
        if (preg_match('/<script/', $s, $matches, PREG_OFFSET_CAPTURE)) {
            $s=substr($s,$matches[0][1]);
        }
        $s=preg_replace("/\\r/","",$s);
        $s=preg_replace("/\\n/"," ",$s);
        $s=preg_replace_callback("/([0-9A-Za-z_])\\s+([0-9A-Za-z_])/",
        function ($m) {
            return $m[1]."__SPC__".$m[2];
        },$s);
    	$s=preg_replace("/\\s+/","",$s);
        $s=preg_replace("/__SPC__/"," ",$s);
        
        //$s=preg_replace("/\\n\\s*/","\n",$s);
        //$s=preg_replace("/\\n+/","\n",$s);
        $s=preg_replace_callback("/bgcolor\\s*=[\"']?(#?[a-zA-Z0-9]+)[\"']?/",function ($m) {
            return 'bgcolor="COLOR"';
        },$s);
        return $s;
    }
    static function scoreFile($digest) {
        $scoreDir=self::$scoreDir;
        $m=md5($digest);
        return $scoreDir->rel($m);
    }

}
ScoreUtil::$scoreSheetDir=new SFile(new NativeFS("./"),"scoreSheet/");
ScoreUtil::$scoreDir=ScoreUtil::$scoreSheetDir->rel("score/");

?>