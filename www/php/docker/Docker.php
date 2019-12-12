<?php

req("SFile","NativeFS","Process","Published");
class Docker {
    static function init($className) {
        return new Docker($className);
    }
    function BAHome() {
        $className=$this->className;
        $fs=new SFile(new NativeFS(),BA_HOME);
        return $fs->rel("$className/");
    }
    function hostWork() {
        $className=$this->className;
        $fs=new SFile(new NativeFS(),DOCKER_WORK);
        return $fs->rel("$className/");
    }
    function name(){
        $className=$this->className;
        return "$className";
    }

    function hostAsset() {
        $url=Published::getURLOfClass($this->className);
        $fs=new SFile(new NativeFS(),BA_PUB);
        return $fs->rel("$url/");
    }
    function guestWorkPath() {return "/host/";}
    function guestAssetPath() {return "/asset/";}

    function __construct($className) {
        $this->className=$className;

        $hostWork=$this->hostWork();
        $hostWorkPath=$hostWork->path();
        $guestWorkPath=$this->guestWorkPath();
        $guestAssetPath=$this->guestAssetPath();
        $hostAssetPath=$this->hostAsset()->path();
        $name=$this->name();
        $r=system_ex("docker container ls -a | grep $name");
        //print_r($r);
        if (! $r["stdout"]) {
            $img=DOCKER_IMAGE;
            $work=DOCKER_WORK;
            $taskrun=DOCKER_TASKRUN;
            $cmd="python $taskrun $guestWorkPath";
            $dc="docker run -d -v $hostWorkPath:$guestWorkPath -v $hostAssetPath:$guestAssetPath --name $name $img $cmd";
            //print($dc);
            $r=system_ex($dc);
            //print_r($r);
        }
    }
    function filesPath( $userName) {
        $res=array();
        $res["user"]=Published::getURLUserPart($this->className, $userName, "assets");
        $res["class"]=Published::getURLUserPart($this->className, "class", "assets");
        return $res;
    }
    function execInProject($userName, $projectName, $cmd) {
        $hostHomePrj=$this->BAHome()->rel("$userName/")->rel("$projectName/");
        $hostWorkPrj=$this->hostWork()->rel("$userName/")->rel("$projectName/");
        self::sync($hostHomePrj,$hostWorkPrj);
        $guestWorkPrjPath=$this->guestWorkPath()."$userName/$projectName/";
        $guestAssetPath=$this->guestAssetPath();

        $cmds="";
        $f=$this->filesPath( $userName);
        foreach ($f as $k=>$v) {
            //print "ln -s $guestHome-$k $guestHome/$projectName/$k";
            $lnksrc=$guestAssetPath.$v;
            $lnkdst=$guestWorkPrjPath.$k;
            $cmds.=
            "if [ ! -L $lnkdst ] ;then\n".
            "   ln -s $lnksrc $lnkdst\n".
            "fi\n";
            //print_r($r);
        }
        $cmds.="cd $guestWorkPrjPath\n";
        $cmds.=$cmd;
        //print "Run cmd $cmds";
        return $this->exec($cmds);
    }
    function exec($cmd) {
        $hostWork=$this->hostWork();
        $tasks=$hostWork->rel("tasks/");
        $req=$tasks->rel("req/");
        $id=UniqID::find(function ($id) use ($req, $tasks) {
            return $req->rel("$id.sh")->exists() || $tasks->rel("$id/")->exists();
        });
        $req->rel("$id.sh")->text($cmd);
        $task=$tasks->rel("$id/");
        $stdoutf=$task->rel("stdout.txt");
        $stderrf=$task->rel("stderr.txt");
        $cnt=0;
        $timeout=10;
        if (defined("DOCKER_TIMEOUT")) $timeout=DOCKER_TIMEOUT;
        do {
            sleep(1);
            if ($cnt++>$timeout) {
                print "Timeout"; break;
            }
        } while (!$stdoutf->exists() || !$stderrf->exists());
        $res=array("stdout"=>$stdoutf->text(), "stderr"=>$stderrf->text());
        self::clean($task);
        return $res;
    }
    static function clean($dir) {
        $dir->rel("run.sh")->rm();
        $dir->rel("stdout.txt")->rm();
        $dir->rel("stderr.txt")->rm();
        rmdir($dir->path());
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
}
