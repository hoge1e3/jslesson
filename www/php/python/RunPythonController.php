<?php
req("param","auth","MySession","AssetController","Docker","Process");
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
    static function copyImg($path, $plotBase=null) {
        if (!PathUtil::isAbsolute($path) && $plotBase) $path=$plotBase->rel($path)->path();
        $w="python_img";//MySession::get("PYTHON_WORK");
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
    static function convHomes($homes) {
        if (is_array($homes)) {
            $res=array();
            foreach ($homes as $k=>$v) {
                $res[$k]=self::convHomes($v);
            }
            return $res;
        } else if (is_object($homes)) {
            return $homes->nativePath();
        } else {
            return $homes;
        }
    }
    static function runInDocker() {
        $projectName=param("prj");
        $fileName=param("file");
        $class=Auth::curClass2();
        $user=Auth::curUser2();
        
        $d=Docker::init($class->id);
     	$res=$d->execInProject($user->name, $projectName, "export MPLBACKEND=\"module://mybackend\" \n python $fileName");
     	if ($res["stderr"]=="") self::convOut($res["stdout"], $d->hostWork()->rel($user->name."/")->rel("$projectName/") );
        else {
            http_response_code(500);
            print($res["stdout"]."\n".$res["stderr"]);
        }
 	    //print_r($r);
    }
    static function runStr(){
        $nfs=new NativeFS();
        $str=param("str");
        $fs=Auth::getFS();
        $sp=self::isSuper(1);
        $wpath=self::workDirPath();
        $workDir=new SFile($nfs,$wpath);
        $d=$workDir->rel("src.py");
        $d->text($str);
        $copiedScriptPath=$d->nativePath();
        $homes=Asset::homes();
        $workDir->rel("config.json")->text(
            json_encode(array(
                "super"=>$sp,
                "asset"=>self::convHomes($homes)
            ))
        );
        $workDir->rel("stdin.txt")->text(param("stdin","\n\n\n\n\n\n\n\n"));
        $cmd=PYTHON_PATH." \"$copiedScriptPath\"";
        $res=system_ex($cmd);
        if ($res["return"]==0) self::convOut($res["stdout"]);
        else {
            http_response_code(500);
            print($res["stderr"]);
        }
    }
    static function run(){
        $nfs=new NativeFS();
        $srcPath=param("srcPath");
        $fs=Auth::getFS();
        $s=new SFile($fs,$srcPath);
        if (!$s->exists()) {
            http_response_code(500);
            print ("File $srcPath not found");
            return;
        }
        $npath=$s->nativePath();
        $s=new SFile($nfs,$npath);
        $sp=self::isSuper(1);
        $wpath=self::workDirPath();
        $workDir=new SFile($nfs,$wpath);
        $d=$workDir->rel("src.py");
        $d->copyFrom($s);
        $copiedScriptPath=$d->nativePath();
        $homes=Asset::homes();
        $workDir->rel("config.json")->text(
            json_encode(array(
                "super"=>$sp,
                "asset"=>self::convHomes($homes)
            ))
        );
        $cmd=PYTHON_PATH." \"$copiedScriptPath\"";
        $res=system_ex($cmd);
        if ($res["return"]==0) self::convOut($res["stdout"]);
        else {
            http_response_code(500);
            print($res["stderr"]);
        }
    }
    static function convOut($out, $plotBase=null) {
        foreach (explode("\n",$out) as $line) {
            $line=preg_replace("/\\r/","",$line);
            if (preg_match("/##PLOT##(.*)/",$line,$m)) {
                $src=self::copyImg($m[1],$plotBase);
                echo "<img src='$src'/>\n";
            } else {
                echo "$line\n";
            }
        }
    }
    static function isSuper($called=0) {
        $class=Auth::curClass2();
        if (defined("SUPER_PYTHON") && $class->id === SUPER_PYTHON) {
        //if (true) {// special-change
            if (!$called) echo 1;
            return 1;
        } else {
            if (!$called) echo 0;
            return 0;
        }
    }
    static function test() {
        $r=system_ex("echo hoge");
        print ("<pre>[".$r["stdout"]."]</pre>");
    }
    static function runStr2($str,$stdin=""){
        $nfs=new NativeFS();
        $fs=Auth::getFS();
        $sp=self::isSuper(1);
        $wpath=self::workDirPath();
        $workDir=new SFile($nfs,$wpath);
        $d=$workDir->rel("src.py");
        $d->text($str);
        $copiedScriptPath=$d->nativePath();
        $homes=Asset::homes();
        $workDir->rel("config.json")->text(
            json_encode(array(
                "super"=>$sp,
                "asset"=>self::convHomes($homes)
            ))
        );
        $workDir->rel("stdin.txt")->text($stdin);
        $cmd=PYTHON_PATH." \"$copiedScriptPath\"";
        $res=system_ex($cmd);
        if ($res["return"]==0) return ($res["stdout"]);
        else {
            return ($res["stderr"]);
        }
    }

}
 ?>
