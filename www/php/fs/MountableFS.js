<?php
require_once __DIR__."/PathUtil.php";
require_once __DIR__."/Permission.php";
require_once __DIR__."/NativeFS.php";

class MountableFS {
    private $permission, $mountPoints;
    function __construct($permission=null) {
        $this->permission=$permission;
        $this->mountPoints=array();
    }
    function mount($logicalPath,$physicalPath) {
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
        $r[0]->check($r[1]);
        return $this;
    }
    public function resolve($path) {
        if (is_null($path)) throw new Exception("path is null!");
        if (PathUtil::startsWith($path, PathUtil::SEP)) {
           $path=substr($path,1);
        }
        //array_sort_callback();
        foreach ($this->mountPoints as $mpath=>$fs) {
            if (PathUtil::startsWith($path,$mpath)) {
                $r=PathUtil::relPath($path, $mpath);
                return array($fs,$r);
            }
        }
        throw new Exception("Cannot access to $path");
    }
    public function getContent($path) {
        $this->check($path,Permission::READ);
        $resolved = $this->resolve($path);
        return $resolved[0]->getContent(resolved[1]);
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
         unlink($rp);
    }
    function rmdir($path) {
         $this->check($path,Permission::WRITE);
         $rp=$this->resolve($path);
         rmdir($rp);
    }
    function mkdir($path) {
        $this->check($path,Permission::WRITE);
         if ($this->exists($path)) return;
         if (!mkdir($this->resolve($path), 0777, true)) {
             throw new Exception("Failed to create $path");
         }
    }
    function setContent($path, $cont) {
        $this->check($path,Permission::WRITE);
        $filename = $this->resolve($path);
        $this->mkdir(PathUtil::up($path));
        $handle = fopen($filename, "w");
        $contents = fwrite($handle, $cont);
        fclose($handle);
    }
    function appendContent($path, $cont) {
        $this->check($path,Permission::WRITE);
        $filename = $this->resolve($path);
        $this->mkdir(PathUtil::up($path));
        $handle = fopen($filename, "a");
        $contents = fwrite($handle, $cont);
        fclose($handle);
    }
    public function notFound($path) {
        throw new Exception("$path not found");
    }
    function exists($path) {
        $this->check($path,Permission::READMETA);
        return file_exists($this->resolve($path));
    }
    function isDir($path) {
         return is_dir($this->resolve($path));
    }
    function getMetaInfo($path) {
        $this->check($path,Permission::READMETA);
         //if (preg_match("/Ireizu/",$path)) return array(lastUpdate=>FALSE);
         return array( "lastUpdate"=>filemtime($this->resolve($path))*1000 );
    }
    function setMetaInfo($path, $info) {
        global $errStatus;
        $this->check($path,Permission::WRITEMETA);
         if (isset($info["lastUpdate"])) {
             $errStatus=$this->resolve($path).", ".round($info["lastUpdate"]/1000);
             touch($this->resolve($path), round($info["lastUpdate"]/1000) );
         }
    }
    public function ls($path) {
        $this->check($path,Permission::LS);
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
