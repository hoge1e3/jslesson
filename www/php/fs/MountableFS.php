<?php
req("PathUtil","Permission","NativeFS");

class MountableFS {
    private $permission, $mountPoints;
    function __construct($permission=null) {
        $this->permission=$permission;
        $this->mountPoints=array();
    }
    function mount($logicalPath,$physicalPath) {
        if (PathUtil::startsWith($logicalPath, PathUtil::SEP)) {
            $logicalPath=substr($logicalPath,1);
        }
        $logicalPath=PathUtil::SEP.$logicalPath;
        if (is_string($physicalPath)) {
            $this->mountPoints[$logicalPath]=new NativeFS($physicalPath);
        } else if ($physicalPath instanceof NativeFS) {
            $this->mountPoints[$logicalPath]=$physicalPath;
        } else {
            throw new Exception("mount fail: invalid $physicalPath");
        }
    }
    public function check($path,$opr) {
        if (!is_null($this->permission)) {
            $this->permission->check($path,$opr);
        }
        $r=$this->resolve($path);
        $r[0]->check($r[1],$opr);
        return $this;
    }
    public function resolve($path) {
        if (is_null($path)) throw new Exception("path is null!");
        if (PathUtil::startsWith($path, PathUtil::SEP)) {
            $path=substr($path,1);
        }
        $path=PathUtil::SEP.$path;
        //array_sort_callback();
        foreach ($this->mountPoints as $mpath=>$fs) {
            if (PathUtil::startsWith($path,$mpath)) {
                $r=PathUtil::relPath($path, $mpath);
                return array($fs,$r);
            }
        }
        throw new Exception("Cannot access to $path");
    }
    function getContent($path) {
        $this->check($path,Permission::READ);
        $resolved = $this->resolve($path);
        return $resolved[0]->getContent($resolved[1]);
    }
    function mv($path, $to) {
        $this->check($path,Permission::WRITE);
        $this->check($to,Permission::WRITE);
        $rp=$this->resolve($path);
        $rt=$this->resolve($to);
        rename($rp[0]->resolve($rp[1]), $rt[0]->resolve($rt[1]));
    }
    function rm($path) {
         $this->check($path,Permission::WRITE);
         $rp=$this->resolve($path);
         $rp[0]->rm($rp[1]);
    }
    function rmdir($path) {
         $this->check($path,Permission::WRITE);
         $rp=$this->resolve($path);
         $rp[0]->rmdir($rp[1]);
    }
    function mkdir($path) {
        $this->check($path,Permission::WRITE);
        if ($this->exists($path)) return;
        $rp=$this->resolve($path);
        return $rp[0]->mkdir($rp[1]);
    }
    function setContent($path, $cont) {
        $this->check($path,Permission::WRITE);
        $rp=$this->resolve($path);
        return $rp[0]->setContent($rp[1],$cont);
    }
    function appendContent($path, $cont) {
        $this->check($path,Permission::WRITE);
        $rp=$this->resolve($path);
        return $rp[0]->appendContent($rp[1],$cont);
    }
    function notFound($path) {
        throw new Exception("$path not found");
    }
    function exists($path) {
        $this->check($path,Permission::READMETA);
        $rp=$this->resolve($path);
        return $rp[0]->exists($rp[1]);
    }
    function isDir($path) {
        $this->check($path,Permission::READMETA);
        $rp=$this->resolve($path);
        return $rp[0]->isDir($rp[1]);
    }
    function getMetaInfo($path) {
        $this->check($path,Permission::READMETA);
        $rp=$this->resolve($path);
        return $rp[0]->getMetaInfo($rp[1]);
    }
    function setMetaInfo($path, $info) {
        global $errStatus;
        $this->check($path,Permission::WRITEMETA);
        $rp=$this->resolve($path);
        return $rp[0]->setMetaInfo($rp[1]);
    }
    function ls($path) {
        $this->check($path,Permission::LS);
        $rp=$this->resolve($path);
        return $rp[0]->ls($rp[1]);
    }
}

?>
