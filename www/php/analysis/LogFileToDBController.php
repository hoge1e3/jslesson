<?php
// schema
// Log
//  id time class user lang filename result detail
//  raw (no index:JSON)
/*
create table log(
    id integer primary key autoincrement,
    time integer, --datetime,
    class varchar(32),
    user varchar(32),
    lang varchar(10),
    filename varchar(30), --(truncate user/dir)
    result varchar(40),
    detail text,
    raw text
);
*/
// Annotation
//  LogID
//  TagID
//  value(JSON)


// Tag
//  tagType(in detail: ex. <img scr )
//  detectionAlgorithm:  JS??  Dtl??
//  additional(JSON)
//    score(int)  ikdmr  0<---- --->100 good
//    okDetail: "d":false,"i":false,"iR":false,"iN":false,"y":false
// TagConstraints
//   tagA => tagB
//   tagB => !tagC
//   oneof tagD,tagE,tagF
req("LogUtil","auth","pdo","DateUtil","PathUtil");
class LogFileToDBController {
    static function moveToTmp($classOrUser) {
        //echo "moveto tmp run! ";
        /*if ($ctx->isTeacher()) {
            $files=LogUtil::getLogFilesOf($ctx->_class);
        } else {
            $files=LogUtil::getLogFilesOf($ctx->user);
        }*/
        $files=LogUtil::getLogFilesOf($classOrUser);
        $tmp=LogUtil::getLogDir()->rel("tmp/");
        $tmp->mkdir();
        foreach ($files as $file) {
            $d=$tmp->rel($file->name());
            //echo $d->path()."  file=$file cn=$cn uid=$uid [".LogUtil::isLogFileOfUser($file,$cn,$uid)."]";
            if (!$d->exists()) {
              //if(is_null($uid) || LogUtil::isLogFileOfUser($file,$cn,$uid)){
                $file->moveTo($d);
              //}
            }
        }
        $res=array();
        foreach ($tmp->listFiles() as $file) {
            /*if ($ctx->isTeacher()) {
                if (LogUtil::isLogFileOf($file,$ctx->_class)) $res[]=$file;
            } else {
                if (LogUtil::isLogFileOf($file,$ctx->user)) $res[]=$file;
            }*/
            if (LogUtil::isLogFileOf($file,$classOrUser)) $res[]=$file;
        }
        return $res;
    }
    /*static function appendToArc($files) {
        foreach ($files as $file) {
        }
    }*/
    static function run() {
        if (isset($_GET["class"])) {
            $c=$_GET["class"];
            $class=new BAClass($c);
        } else {
            $ctx=Auth::context();
            $class=$ctx->_class;
            $c=$class->id;
        }
        $classOrUser=$class;
        if (isset($_GET["user"])) {
            $user=$class->getUser($_GET["user"]);
            $classOrUser=$user;
        }
        $files=self::moveToTmp($classOrUser);
        $arc=LogUtil::getLogDir()->rel("arc/");
        $arc->mkdir();
        //return ;
        $pdo = pdo();
	    $sth=$pdo->prepare("insert into ".
	    "log   (time,class,user,lang,filename,result,detail,raw,errorType,errorPos) ".
	    "values( ?  , ?   , ?  , ?  ,?       ,?     ,?     ,?  ,?        ,?);");
        foreach ($files as $file) {
            $user=self::getUserName($c,$file->name());
            //print "$c $user<BR>\n";//ob_flush ();
            $lines=$file->lines();
            $home=PathUtil::rel("/home/","$c/$user/");
            foreach ($lines as $raw) {
                $d=json_decode($raw);
                if (!$d) continue;
                if (!isset($d->date)) continue;
                if (!isset($d->time)) continue;
                $time=DateUtil::toInt($d->date." ".$d->time);
                if (!isset($d->lang)) $lang="";
                else $lang=$d->lang;
                if (!isset($d->filename)) $filename="";
                else {
                    if (preg_match("/^\\//",$d->filename)) {
                        $filename=PathUtil::relPath($d->filename,$home);
                    } else {
                        $filename="";
                    }
                }
                if (!isset($d->result)) $result="";
                else $result=$d->result;
                if (!isset($d->detail)) $detail="";
                else $detail=$d->detail;
                try {
                    $errorType="";
                    $errorPos=0;
                    //$detail=json_decode($detail);
                    if (is_object($detail)) {
                        if (isset($detail->errorType)) {
                            $errorType=$detail->errorType;
                        }
                        if (isset($detail->pos)) {
                            $errorPos=$detail->pos-0;
                        }
                        $detail=json_encode($detail);
                    }
                    //echo DateUtil::toString($time);
                    $a=array(
            	        $time,$c,$user,$lang,substr($filename,0,250),
                        $result,
                        mb_substr($detail,0,20000),
                        mb_substr($raw,0,20000),$errorType,$errorPos
        	        );
                    //var_dump($a);
            	    $sth->execute($a);
                } catch(Exception $e) {}
    	        //break;
            }
            $file->appendTo($arc->rel($file->name()) );
            $file->rm();
	        //break;
        }
    }
    static function getUserName($cn,$fn) {
        $prelen=strlen($cn)+1;
        $postlen=strlen("-data.log");
        $user=substr($fn,$prelen, strlen($fn)-$postlen-$prelen ) ;
        return $user;
    }
    static function test(){
        $pdo = pdo();
	    $sth=$pdo->prepare("insert into ".
	    "log   (time,class,user,lang,filename,result,detail,raw) ".
	    "values( ?  , ?   , ?  , ?  ,?       ,?     ,?     ,?  );");
        $a=array(
        	        3,"くらす","ユーザ","ことば","ふぁいる","けっか","","生"
    	        );
    	$sth->execute($a);
    }
}


?>
