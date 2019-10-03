<?php

req("SFile","NativeFS","Process","Published");
class Docker {
    static function init($className, $userName) {
        return new Docker($className, $userName);
    }
    function BAHome() {
        $className=$this->className;
        $userName=$this->userName;
        $fs=new SFile(new NativeFS(),BA_HOME);
        return $fs->rel("$className/")->rel("$userName/");
    }
    function hostHome() {
        $className=$this->className;
        $userName=$this->userName;
        $fs=new SFile(new NativeFS(),DOCKER_WORK);
        return $fs->rel("$className/")->rel("$userName/");    
    }
    function name(){
        $className=$this->className;
        $userName=$this->userName;
        $userName=preg_replace("/@/", "-",$userName);
        return "$className-$userName";
    }
    function filesPath() {
        $user=Published::getURL($this->className, $this->userName, "assets");
        $class=Published::getURL($this->className, "class", "assets");
        
        return array("user"=>BA_PUB."/".$user , "class"=>BA_PUB."/".$class);
        //return array("user"=>BA_PUB."8d8b0d06", "class"=>BA_PUB."5007133d");//TODO
    }
    
    function __construct($className, $userName) {
        $this->className=$className;
        $this->userName=$userName;
        //$this->home=$home;
        $hostHome=$this->hostHome();
        $hostHomePath=$hostHome->path();
        $hostHome->rel("run.sh")->text("");
        $guestHome="/host";
        $name=$this->name();
        $r=system_ex("docker container ls -a | grep $name");
        //print_r($r);
        if (! $r["stdout"]) {
            $f=$this->filesPath();
            $volumes=array(array($hostHomePath, $guestHome));
            foreach ($f as $k=>$v) {
                array_push($volumes, array( $v, "$guestHome-$k") );
            }
            $varg=implode( " ",array_map(function ($vol) {
               return '-v "'.$vol[0].':'.$vol[1].'"';
            },$volumes) );
            $img=DOCKER_IMAGE;
            //print "docker run $varg -i --name \"$name\" python:3.6 sh $guestHome/run.sh";
            $r=system_ex("docker run $varg -i --name \"$name\" $img sh $guestHome/run.sh");
            //print_r($r);
        }
    }
    function initProject($projectName) {
        $dst=$this->hostHome()->rel("$projectName/");
        $src=$this->BAHome()->rel("$projectName/");
        self::sync($src,$dst);
        $dstPath=$dst->path();
        $guestHome="/host";
        $f=$this->filesPath();
        foreach ($f as $k=>$v) {
            //print "ln -s $guestHome-$k $guestHome/$projectName/$k";
            $lnkdst="$guestHome/$projectName/$k";
            $r=$this->exec("if [ ! -L $lnkdst ] ;then\n   ln -s $guestHome-$k $lnkdst\nfi");
            //print_r($r);
        }
    }
    function exec($cmd) {
        $hostHome=$this->hostHome();
        $hostHome->rel("run.sh")->text($cmd);
        $name=$this->name();
        return system_ex("docker start $name -a");
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
