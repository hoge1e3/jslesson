<?php
class SFile{
    private $_path, $fs, $perm;
    public function SFile($fs, $path, $perm) {
        $this->_path=$path;
        $this->fs=$fs;
        $this->perm=$perm;
    }
    private function check($opr) {
        return $this->perm->check($this,$opr);
    }
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
        return new SFile($this->fs,$path,$this->perm);
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
    }
    public function ext() {
    }
    public function relPath() {
    }
    public function up() {
        return $this->resolve(PathUtil::up($this->path()));
    }
    public function rel($r) {
        return $this->resolve(PathUtil::rel($this->path(),$r));
    }
    public function sibling() {
    }
    public function startsWith() {
    }
    public function endsWith() {
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
    public function exists() {
    }
    public function rm() {
    }
    public function removeWithoutTrash() {
    }
    public function isDir() {
    }
    public function getContent() {
    }
    public function setContent() {
    }
    public function setText($s) {
        $this->check("write");
        $this->fs->setContent($this->path(), $s);
        return $this;
    }
    public function getText() {
        $this->check("read");
        //echo "open ".$this->path();
        return $this->fs->getContent($this->path());
    }
    public function text() {
        if (func_num_args()==0) {
            return $this->getText();
        } else {
            return $this->setText(func_get_args(0));
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
    }
    public function getObj() {
        $j=new Services_JSON;
        return $j->decode($this->getText());
    }
    public function setObj($obj) {
        $j=new Services_JSON;
        return $this->setText($j->encode($obj));
    }
    public function obj() {
        if (func_num_args()==0) {
            return $this->getObj();
        } else {
            return $this->setObj(func_get_args(0));
        }
    }
    public function copyFrom() {
    }
    public function copyTo() {
    }
    public function moveFrom() {
    }
    public function moveTo() {
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
    }
    public function link() {
    }
    public function resolveLink() {
    }
    public function isLink() {
    }
    public function getResolvedLinkPath() {
    }    
    
}

?>