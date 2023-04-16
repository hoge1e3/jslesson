<?php

class SFile{
    private $_path, $fs;
    public function __construct($fs, $path) {
        $this->_path=$path;
        $this->fs=$fs;
        //$this->perm=$perm;
    }
    /*private function check($opr) {
        return $this->perm->check($this,$opr);
    }*/
    public function rootFS() {
    }
    public function fs() {
        return $this->fs;
    }
    public function isSFile() {
    }
    public function setPolicy() {
    }
    public function getPolicy() {
    }
    private function _clone() {
        return this.resolve(this.path());
    }
    private function resolve($path) {
        return new SFile($this->fs,$path);//,$this->perm);
    }
    public function contains() {
    }
    public function path() {
        return $this->_path;
    }
    public function name() {
        return PathUtil::name($this->path());
    }
    public function truncExt() {
        return PathUtil::truncExt($this->name());
    }
    public function ext() {
        return PathUtil::ext($this->name());
    }
    public function relPath($base) {
        return PathUtil::relPath($this->path(),$base->path());
    }
    public function up() {
        return $this->resolve(PathUtil::up($this->path()));
    }
    public function rel($r) {
        return $this->resolve(PathUtil::rel($this->path(),$r));
    }
    /*public function rel2($r) {
    // why distract?    a="/fuga"    a->rel2("hoge")  ->   /hoge/fuga ?  or /hoge   ?
        if ($this->isDir()) return $this->rel($r);
        $res=$this->sibling($r);
        if ($res->isDir()) {
            $res=$res->rel($this->name());
        }
        return $res;
    }*/
    public function sibling($r) {
        return $this->up()->rel($r);
    }
    public function startsWith($prefix) {
        return PathUtil::startsWith($this->name(),$prefix);
    }
    public function endsWith($postfix) {
        return PathUtil::endsWith($this->name(),$postfix);
    }
    public function equals() {
    }
    public function toString() {
    }
    public function touch() {
    }
    public function isReadOnly() {
    }
    public function isTrashed() {
    }
    public function metaInfo() {
    }
    public function getMetaInfo() {
        return $this->fs->getMetaInfo($this->path());
    }
    public function setMetaInfo() {
    }
    public function lastUpdate() {
        $m=$this->getMetaInfo();
        return $m["lastUpdate"];
    }
    public function size() {
        $m=$this->getMetaInfo();
        return $m["size"];
    }
    public function exists() {
        return $this->fs->exists($this->path());
    }
    public function rm() {
        return $this->fs->rm($this->path());
    }
    public function removeWithoutTrash() {
    }
    public function isDir() {
        return is_dir($this->nativePath());
    }
    public function isLink() {
        return is_link($this->nativePath());
    }
    public function getContent() {
        return $this->fs->getContent($this->path());
    }
    public function setContent($s) {
        return $this->fs->setContent($this->path(), $s);
    }
    public function setText($s) {
        //$this->check("write");
        $this->fs->setContent($this->path(), $s);
        return $this;
    }
    public function getText() {
        //$this->check("read");
        //echo "open ".$this->path();
        return $this->fs->getContent($this->path());
    }
    public function text() {
        if (func_num_args()==0) {
            return $this->getText();
        } else {
            return $this->setText(func_get_arg(0));
        }
    }
    public function isText() {
    }
    public function contentType() {
    }
    public function bytes() {
    }
    public function setBytes() {
    }
    public function getBytes() {
    }
    public function getURL() {
    }
    public function lines() {
        if (func_num_args()==0) {
            return file($this->nativePath());
        } else {
            $a=func_get_arg(0);
            if (!is_array($a)) {
                throw new Exception("1st arg should be array");
            }
            $this->setText(implode("\n",$a));
        }
    }
    public function nativePath() {
        $res=$this->fs->resolve($this->path());
        return PathUtil::fixSep($res);
    }
    public function getObj() {
        return json_decode($this->getText(), JSON_OBJECT_AS_ARRAY);
    }
    public function setObj($obj) {
        return $this->setText(json_encode($obj));
    }
    public function obj() {
        if (func_num_args()==0) {
            return $this->getObj();
        } else {
            return $this->setObj(func_get_arg(0));
        }
    }
    public function appendFrom($f) {
        return $f->appendTo($this);
    }
    public function appendTo($t) {
        return $this->fs->appendContent($t->path(), $this->getContent());
    }
    public function copyFrom($f) {
        return $f->copyTo($this);
    }
    public function copyTo($t) {
        return $t->setContent($this->getContent());
    }
    public function moveFrom($f) {
        return $f->moveTo($this);
    }
    public function moveTo($t) {
        $this->fs->mv($this->path(), $t->path());
    }
    public function assertDir() {
    }
    public function each($f) {
        $l=$this->listFiles();
        foreach ($l as $e) {
            $f($e);
        }
    }
    public function eachrev() {
    }
    public function recursive() {
        $res=array();
        $files=$this->listFiles();
        foreach ($files as $file) {
            if ($file->isLink()) continue;
            if ($file->isDir()) {
                $res=array_merge($res,$file->recursive());
            } else {
                array_push($res,$file);
            }
        }
        return $res;
    }
    public function listFiles() {
        $l=$this->ls();
        $res=array();
        foreach ($l as $e) {
            $f=$this->rel($e);
            array_push($res,$f);
        }
        return $res;
    }
    public function ls() {
        return $this->fs->ls($this->path());
    }
    public function convertOptions() {
    }
    public function mkdir() {
        if (!$this->up()->exists()) {
            $this->up()->mkdir();
        }
        $this->fs->mkdir($this->path());
    }
    public function rmdir() {
        $this->fs->rmdir($this->path());
    }
    public function rmdirForce() {
        foreach ($this->listFiles() as $f) {
            if ($f->isDir()) {
                $f->rmdirForce();
            } else {
                $f->rm();
            }
        }
        $this->rmdir();
    }
    public function link() {
    }
    public function resolveLink() {
    }
    public function isLink() {
    }
    public function getResolvedLinkPath() {
    }
    public function append($t) {
        return $this->fs->appendContent($this->path(), $t);
    }
    public function appendContent($c) {
        return $this->fs->appendContent($this->path(), $c);
    }
    public function openAppend() {
        return fopen($this->nativePath(),"a");
    }
    public function openWrite() {
        return fopen($this->nativePath(),"w");
    }

}

?>
