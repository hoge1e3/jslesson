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
    static function moveToTmp($files) {
        $tmp=LogUtil::getLogDir()->rel("tmp/");
        $tmp->mkdir();
        $res=array();
        foreach ($files as $file) {
            $d=$tmp->rel($file->name());
            //echo $d->path()."  ";
            if (!$d->exists()) {
                $file->moveTo($d);
            }
            $res[]=$d;
        }
        return $res;
    }
    /*static function appendToArc($files) {
        foreach ($files as $file) {
        }
    }*/
    static function run() {
        $class=Auth::curClass2();
        $files=LogUtil::getLogFiles();
        $files=self::moveToTmp($files);
        $arc=LogUtil::getLogDir()->rel("arc/");
        $arc->mkdir();
        //return ;
        $pdo = pdo();
	    $sth=$pdo->prepare("insert into ".
	    "log   (time,class,user,lang,filename,result,detail,raw) ".
	    "values( ?  , ?   , ?  , ?  ,?       ,?     ,?     ,?  );");
        foreach ($files as $file) {
            $c=$class->id;
            $user=self::getUserName($c,$file->name());
            print "$c $user<BR>\n";ob_flush ();
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
                else $filename=PathUtil::relPath($d->filename,$home);
                if (!isset($d->result)) $result="";
                else $result=$d->result;
                /*if (!isset($d->detail))*/ $detail="";
                //else $detail=$d->detail;
                //echo DateUtil::toString($time);
                $a=array(
        	        $time,$c,$user,$lang,$filename,$result,$detail,$raw
    	        );
                //var_dump($a);
        	    $sth->execute($a);
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
}


?>