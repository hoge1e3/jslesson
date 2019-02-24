<?php
req("param","auth","MySession","AssetController");
class RunPythonController {
    static function workDirPath() {
        if (MySession::has("PYTHON_WORK")) {
            $w=MySession::get("PYTHON_WORK");
            $wpath=PYTHON_WORK."/$w";
        } else {
            do {
                $w=rand(100000,999999);
                $wpath=PYTHON_WORK."/$w";
            } while(file_exists($wpath));
            mkdir($wpath);
            MySession::set("PYTHON_WORK",$w);
        }
        return $wpath;
    }
    static function copyImg($path) {
        $w=MySession::get("PYTHON_WORK");
        $pubFilePath=BA_PUB."/$w";
        if (!file_exists($pubFilePath)) mkdir($pubFilePath);
        $ext=PathUtil::ext($path);
        //$eq=($path==="C:\\bin\\Dropbox\\workspace\\jslesson\\data\\pythonwork\\959485/figure.png");
        $pubURLPath=BA_PUB_URL."/$w";
        do {
            $n=rand(10000,99999);
            $dst="$pubFilePath/$n$ext";
        } while(file_exists($dst));
        $exs=file_exists($path);
        $exd=file_exists(dirname($dst));
        $exdf=file_exists($dst);
        if (!$exs || !$exd || $exdf) {
            die("Renaming $path(exist=$exs) to $dst(exist dir=$exd,file=$exdf) failed");
        }
        rename($path,$dst);
        //echo " BA=".BA_PUB_URL." puburlpath=$pubURLPath  /  n=$n  ext=$ext";
        return "$pubURLPath/$n$ext";
    }
    static function run(){
        $srcPath=param("srcPath");
        $fs=Auth::getFS();
        $s=new SFile($fs,$srcPath);
        if (!$s->exists()) {
            http_response_code(500);
            print ("File $srcPath not found");
            return;
        }
        $npath=$s->nativePath();
        if (strpos($npath,"\\")!==FALSE){
            $npath=preg_replace("/\\//","\\",$npath);
        }
        //echo $npath;
        $sp=self::isSuper(1);
        $wpath=self::workDirPath();
        $apath=AssetController::home();
        $apath=$apath->nativePath();
        $cmd=PYTHON_PATH." \"$npath\" $sp \"$wpath\" \"$apath\"";
        //echo "CMD = $cmd\n";
        $res=system_ex($cmd);
        if ($res["return"]==0) self::convOut($res["stdout"]);
        else {
            http_response_code(500);
            print($res["stderr"]);
        }
    }
    static function convOut($out) {
        foreach (explode("\n",$out) as $line) {
            $line=preg_replace("/\\r/","",$line);
            if (preg_match("/##PLOT##(.*)/",$line,$m)) {
                $src=self::copyImg($m[1]);
                echo "<img src='$src'/>\n";
            } else {
                echo "$line\n";
            }
        }
    }
    static function isSuper($called=0) {
        $class=Auth::curClass2();
        if (defined("SUPER_PYTHON") && $class->id === SUPER_PYTHON) {
            if (!$called) echo 1;
            return 1;
        } else {
            if (!$called) echo 0;
            return 0;
        }
    }
}
function system_ex($cmd, $stdin = "")
{
    $descriptorspec = array(
        0 => array("pipe", "r"),
        1 => array("pipe", "w"),
        2 => array("pipe", "w")
        );

    $process = proc_open($cmd, $descriptorspec, $pipes);
    $result_message = "";
    $error_message = "";
    $return = null;
    if (is_resource($process))
    {
        fputs($pipes[0], $stdin);
        fclose($pipes[0]);

        while ($error = fgets($pipes[2])){
            $error_message .= $error;
        }
        while ($result = fgets($pipes[1])){
            $result_message .= $result;
        }
        foreach ($pipes as $k=>$_rs){
            if (is_resource($_rs)){
                fclose($_rs);
            }
        }
        $return = proc_close($process);
    }
    return array(
        'return' => $return,
        'stdout' => $result_message,
        'stderr' => $error_message,
        );
}
 ?>
