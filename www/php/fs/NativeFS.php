<?php
require_once __DIR__."/PathUtil.php";
require_once __DIR__."/Permission.php";

class NativeFS {
   private $top,$permission;
   function __construct($top=null,$permission=null) {
       $this->top=$top;
       //if (isset($permission)) 
       $this->permission=$permission;
   }
   public function check($path,$opr) {
       if (!is_null($this->permission)) {
           $this->permission->check($path,$opr);
       }
       return $this;
   }
   public function resolve($path) {
        if (is_null($this->top)) return $path;
        if (is_null($path)) throw new Exception("path is null!");
        if (PathUtil::startsWith($path, PathUtil::SEP)) {
           $path=substr($path,1);
        }
        $r=PathUtil::rel($this->top, $path);
        if (PathUtil::startsWith($r,$this->top)) { 
            return $r; 
        }
        throw new Exception("Cannot access to $path");
   }
   public function getContent($path) {
       $this->check($path,Permission::READ);
       if (!$this->exists($path)) $this->notFound($path);
       $filename = $this->resolve($path);
        if (isBinaryFile($filename)) {
            return fileToDataURL($filename);
        }

       $sz=filesize($filename);
       if ($sz==0) return "";
 	   $handle = fopen($filename, "r");
	   $contents = fread($handle, $sz);
	   fclose($handle);
	   return $contents;
   }
   function mv($path, $to) {
        $this->check($path,Permission::WRITE);
        $this->check($to,Permission::WRITE);
        $rp=$this->resolve($path);
        $rt=$this->resolve($to);
        rename($rp, $rt);
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
       if (isBinaryFile($filename) && is_string($cont)) {
            return dataURLtoFile($filename, $cont);
       }
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
function dataURLtoFile($filePath, $dataURL) {
    $parts = explode(',', $dataURL);
    if(count($parts) === 2) {
        $data = base64_decode($parts[1]);
        if(file_put_contents($filePath, $data) !== false) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function fileToDataURL($filePath) {
    if(file_exists($filePath)) {
        $data = file_get_contents($filePath);
        $mime = mime_content_type($filePath);
        $base64 = base64_encode($data);
        $dataURL = 'data:' . $mime . ';base64,' . $base64;
        return $dataURL;
    } else {
        return false; 
    }
}
$mimetypes=[
    ".png"=>"image/png",
    ".gif"=>"image/gif",
    ".jpeg"=>"image/jpeg",
    ".jpg"=>"image/jpeg",
    ".ico"=>"image/icon",
    ".wav"=>"audio/x-wav",
    ".mp3"=>"audio/mp3",
    ".ogg"=>"audio/ogg",
    ".midi"=>"audio/midi",
    ".mid"=>"audio/midi",
    ".mzo"=>"audio/mzo",
    ".txt"=>"text/plain",
    ".html"=>"text/html",
    ".htm"=>"text/html",
    ".css"=>"text/css",
    ".js"=>"text/javascript",
    ".json"=>"text/json",
    ".zip"=>"application/zip",
    ".swf"=>"application/x-shockwave-flash",
    ".pdf"=>"application/pdf",
    ".doc"=>"application/word",
    ".xls"=>"application/excel",
    ".ppt"=>"application/powerpoint",
    '.docx'=>'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.docm'=>'application/vnd.ms-word.document.macroEnabled.12',
    '.dotx'=>'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    '.dotm'=>'application/vnd.ms-word.template.macroEnabled.12',
    '.xlsx'=>'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsm'=>'application/vnd.ms-excel.sheet.macroEnabled.12',
    '.xltx'=>'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    '.xltm'=>'application/vnd.ms-excel.template.macroEnabled.12',
    '.xlsb'=>'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    '.xlam'=>'application/vnd.ms-excel.addin.macroEnabled.12',
    '.pptx'=>'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.pptm'=>'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    '.potx'=>'application/vnd.openxmlformats-officedocument.presentationml.template',
    '.potm'=>'application/vnd.ms-powerpoint.template.macroEnabled.12',
    '.ppsx'=>'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    '.ppsm'=>'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
    '.ppam'=>'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    ".tonyu"=>"text/tonyu",
    ".c"=>"text/c",
    ".dtl"=>"text/dolittle"
    
];
function isBinaryFile($filePath) {
    req("PathUtil");
    $ext=PathUtil::ext($filePath);
    global $mimetypes;
    if (!isset($mimetypes[$ext]))return false;
    $t=$mimetypes[$ext];
    $t=explode("/",$t);
    return $t[0]!=="text";
}


?>