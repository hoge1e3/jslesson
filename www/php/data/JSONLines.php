<?php
class JSONLines implements IteratorAggregate {
    function __construct($file) {
        $this->file=$file;
        if (!$file->exists()) {
            throw new Exception($file->path()." not exists");
        }
        $this->lines=array();
        foreach ($file->lines() as $i=>$line) {
            if ($line=="") continue;
            $data=json_decode($line);
            if (!is_object($data)) {  
                throw new Exception("Invalid data at line ".($i+1)." ".$line);
            }
            $this->lines[]=$data;
        }
    }
    function find1($key,$val=null) {
        if (is_callable($key)) {
            foreach ($this as $line) {
                if ($key($line)) return $line;
            }
        } else {
            foreach ($this as $line) {
                if ($line->$key===$val) return $line;
            }
        }
        return null;
    }
    function findAll($key,$val=null) {
        $res=array();
        if (is_callable($key)) {
            foreach ($this as $line) {
                if ($key($line)) $res[]=$line;
            }
        } else {
            foreach ($this as $line) {
                if ($line->$key===$val) $res[]=$line;
            }
        }
        return $res;
    }
    function delAll($key,$val=null) {
        $res=array();
        if (is_callable($key)) {
            foreach ($this as $i=>$line) {
                if ($key($line)) array_unshift($res,$i);
            }
        } else {
            foreach ($this as $i=>$line) {
                if ($line->$key===$val) array_unshift($res,$i);
            }
        }
        foreach ($res as $i) {
            array_splice($this->lines,$i,1);
        }
    }
    function del($obj) {
        foreach ($this as $i=>$line) {
            if ($line===$obj) {
                $idx=$i;
                break;
            }
        }
        if (isset($idx)) {
            array_splice($this->lines,$idx,1);
        }
    }
    function add($obj) {
        $this->lines[]=$obj;        
    }
    function save() {
        $this->saveAs($this->file);   
    }
    function saveAs($file) {
        $buf="";
        foreach ($this as $line) {
            $buf.=json_encode($line)."\n";    
        }
        $file->text($buf);
    }
    function getIterator() {
        return new ArrayIterator($this->lines);
    }
}
?>