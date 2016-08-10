<?php
require_once __DIR__."/PathUtil.php";

class NativeFS {
   var $top;
   function NativeFS($top) {
       $this->top=$top;
   }
   public function resolve($path) {
        if (is_null($path)) throw new Exception("path is null!");
        if (PathUtil::startsWith($path, PathUtil::SEP)) {
           $path=substr($path,1);
        }
        $r=PathUtil::rel($this->top, $path);
        if (PathUtil::startsWith($r,$this->top)) { 
            return $r; 
        }
        throw new Exception("Canno access to $path");
   }
   public function getContent($path) {
       if (!$this->exists($path)) $this->notFound($path);
       $filename = $this->resolve($path);
       $sz=filesize($filename);
       if ($sz==0) return "";
 	   $handle = fopen($filename, "r");
	   $contents = fread($handle, $sz);
	   fclose($handle);
	   return $contents;
   }
   function rm($path) {
        $rp=$this->resolve($path);
        unlink($rp);
   }
   function mkdir($path) {
        if ($this->exists($path)) return;
        if (!mkdir($this->resolve($path), 0777, true)) {
            throw new Exception("Failed to create $path");
        }
   }
   function setContent($path, $cont) {
       $filename = $this->resolve($path);
       $this->mkdir(PathUtil::up($path));
       $handle = fopen($filename, "w");
       $contents = fwrite($handle, $cont);
       fclose($handle);
   }
   public function notFound($path) {
       throw new Exception("$path not found");
   }
   function exists($path) {
       return file_exists($this->resolve($path));
   }
   function isDir($path) {
        return is_dir($this->resolve($path));
   }
   function getMetaInfo($path) {
        //if (preg_match("/Ireizu/",$path)) return array(lastUpdate=>FALSE);
        return array( "lastUpdate"=>filemtime($this->resolve($path))*1000 );
   }
   function setMetaInfo($path, $info) {
        if (isset($info["lastUpdate"])) {
            touch($this->resolve($path), round($info["lastUpdate"]/1000) );
        }
   }
   public function ls($path) {
        $res=array();
        if ($handle = opendir($this->resolve($path))) {
		    while (false !== ($entry = readdir($handle))) {
		        if ($entry!="." && $entry!="..") {
		           if ($this->isDir(PathUtil::rel($path, $entry))) {
		              $entry=$entry.PathUtil::SEP;
		           }
  		           array_push($res, $entry);
  		        }
		    }
		    closedir($handle);
	    } else {
            $this->notFound($path);
	    }
	    return $res;
   }

}
?>