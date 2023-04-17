<?php

/*
hostWork:
    {class}:
        {user}:
            {project}:
                "class" -> symlink to guestAsset/{pub_class.[user="class",project="assets"]}
                "user" -> symlink to guestAsset/{pub_user.[user,project]}
                other files(ex. *.py)
        "tasks":
            "req":
                {genid}.sh
            {genid}
                run.sh
                stdout.txt
                stderr.txt
hostAsset:
    {class}:
        {pub_class.[user="class",project="assets"]}:
            class global file
        {pub_user.[user,project]}:
            user local file

*/

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
        return "dock_".$className."_er";
    }
    /*
    function hostAsset() {
        $url=Published::getURLOfClass($this->className);
        $fs=new SFile(new NativeFS(),BA_PUB);
        return $fs->rel("$url/");
    }
    */
    function guestWorkPath() {return "/host/";}
    //function guestAssetPath() {return "/asset/";}

    function __construct($className) {
        $this->className=$className;

        $hostWork=$this->hostWork();
        $hostWorkPath=$hostWork->path();
        $guestWorkPath=$this->guestWorkPath();
        //$guestAssetPath=$this->guestAssetPath();
        //$hostAssetPath=$this->hostAsset()->path();
        $name=$this->name();
        $r=system_ex("docker container ls -a | grep \\\\s$name".'$');
        debug($r);
        if (! $r["stdout"]) {
            $img=DOCKER_IMAGE;
            $work=DOCKER_WORK;
            $taskrun=DOCKER_TASKRUN;
            $cmd="python $taskrun $guestWorkPath";
            //$dc="docker run -d -v $hostWorkPath:$guestWorkPath -v $hostAssetPath:$guestAssetPath --name $name $img $cmd";
            $dc="docker run -d -v $hostWorkPath:$guestWorkPath --name $name $img $cmd";
            debug($dc);
            if (defined("DOCKER_LAUNCH_REQ_DIR")) {
                $this->reqLaunch($dc);
            } else {
                $r=system_ex($dc);
                debug($r);
            }
        }
    }
    function reqLaunch($cmd) {
        $fs=new SFile(new NativeFS(),DOCKER_LAUNCH_REQ_DIR);
        $sh=$fs->rel(random_int(100000,999999).".sh");
        $sh->text($cmd);
    }
    /*function assetFilesPath( $userName) {
        $res=array();
        $res["user"]=Published::getURLUserPart($this->className, $userName, "assets");
        $res["class"]=Published::getURLUserPart($this->className, "class", "assets");
        return $res;
    }*/
    function openProject($userName, $projectName) {
        $hostHomePrj=$this->BAHome()->rel("$userName/")->rel("$projectName/");
        $hostWorkPrj=$this->hostWork()->rel("$userName/")->rel("$projectName/");
        self::sync($hostHomePrj,$hostWorkPrj);
        $guestWorkPrjPath=$this->guestWorkPath()."$userName/$projectName/";
        return array( "userName"=>$userName, "projectName"=>$projectName ,
			"work"=> array(
				"host"=> $hostWorkPrj,
				"guestPath"=> $guestWorkPrjPath
	     	)
	    );
    }
    function execInProject($prjDesc, $cmd) {
        $userName=$prjDesc["userName"];
        $guestWorkPrjPath=$prjDesc["work"]["guestPath"];
        //$guestAssetPath=$this->guestAssetPath();

        $cmds="";
        /*$f=$this->assetFilesPath( $userName);
        foreach ($f as $k=>$v) {
            debug("ln -s $guestHome-$k $guestHome/$projectName/$k");
            $lnksrc=$guestAssetPath.$v;
            $lnkdst=$guestWorkPrjPath.$k;
            $cmds.=
            "mkdir -p $lnksrc \n".
            "if [ ! -L $lnkdst ] ;then\n".
            "   ln -s $lnksrc $lnkdst\n".
            "fi\n";
            debug($r);
        }*/
        $cmds.="cd $guestWorkPrjPath\n";
        $cmds.=$cmd;
        debug("Run cmd $cmds");
        return $this->exec($cmds);
    }
    function exec($cmd) {
        $hostWork=$this->hostWork();
        $tasks=$hostWork->rel("tasks/");
        $req=$tasks->rel("req/");
        $id=UniqID::find(function ($id) use ($req, $tasks) {
            return $req->rel("$id.sh")->exists() || $tasks->rel("$id/")->exists();
        });
        $sh=$req->rel("$id.sh");
        $sh->text($cmd);
        $sh->chmod(0777);
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
        $res=array("stdout"=>sizecont($stdoutf), "stderr"=>sizecont($stderrf));
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
            debug($sf->relPath($src). " ".$df->path()."\n");
            debug($sf->path()." [".$sf->isDir()."]\n");
            if ($sf->isDir()) {
                self::sync($sf,$df);
            } else if (!$df->exists() || $sf->lastUpdate()>$df->lastUpdate()) {
                $df->copyFrom($sf);
            }
        }
    }
}
function sizecont($f){
    if ($f->size()>10000000) return "TOO BIG FILE";
    return $f->text();   
}
function debug($mesg){
    /*
    if (!is_string($mesg)) {
        $mesg=print_r($mesg,true);
    }
    print $mesg;
    }*/
}