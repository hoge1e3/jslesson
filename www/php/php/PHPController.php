<?php
req("auth");
class PHPController {
    static function urlOf() {
        $userName=param("user");
        $className=param("class");
        $projectName=param("project");
        $fileName=param("file");
        $ctx=Auth::context();
        if ($ctx->userName===$userName && $ctx->className===$className) {
            $home=Auth::home();
            $fs=new NativeFS(PHP_WORK);
            $dst=new SFile($fs,"$className/$userName/$projectName/");
            self::sync( $home->rel("$projectName/"), $dst);
        }
        $urlTmpl=PHP_URL;
        $urlTmpl=str_replace("{CLASS}",$className,$urlTmpl);
        $urlTmpl=str_replace("{USER}",$userName,$urlTmpl);
        $urlTmpl=str_replace("{PROJECT}",$projectName,$urlTmpl);
        $urlTmpl=str_replace("{FILE}",$fileName,$urlTmpl);
        echo $urlTmpl;
    }
    static function sync($src,$dst) {
       foreach ($src->listFiles() as $sf) {
           $df=$dst->rel($sf->relPath($src));
           //echo $sf->relPath($src). " ".$df->path()."\n";
           //echo $sf->path()." [".$sf->isDir()."]\n";
           if ($sf->isDir()) {
               self::sync($sf,$df);
           } else if (!$df->exists() || $sf->lastUpdate()>$df->lastUpdate()) {
               $df->copyFrom($sf);
           }
       }
    }
   static function run() {
        $userName=param("user");
        $className=param("class");
        $projectName=param("project");
        $fileName=param("file");
        $ctx=Auth::context();
        if ($ctx->userName===$userName && $ctx->className===$className) {
            $home=Auth::home();
            $fs=new NativeFS(PHP_WORK);
            $dst=new SFile($fs,"$className/$userName/$projectName/");
            self::sync( $home->rel("$projectName/"), $dst);
        }
        $urlTmpl=PHP_URL;
        $urlTmpl=str_replace("{CLASS}",$className,$urlTmpl);
        $urlTmpl=str_replace("{USER}",$userName,$urlTmpl);
        $urlTmpl=str_replace("{PROJECT}",$projectName,$urlTmpl);
        $urlTmpl=str_replace("{FILE}",$fileName,$urlTmpl);
        header("Location: $urlTmpl");
    }
}

?>
