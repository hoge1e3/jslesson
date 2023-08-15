<?php
/*
create table published (
	url varchar(32),
	class varchar(32),
	user varchar(32),
	project varchar(32)
);*/
class Published {
    static function getURL($classID,$userName,$projectName) {
        $r=pdo_select1("select * from published where `class`=? and `user`=? and `project`=? ",
            $classID,$userName,$projectName);
        if ($r) {
            return $r->url;
        }
        $url=substr(md5("$classID/$userName/$projectName"),0,8)."/";
        pdo_insert("published",array("url"=>$url, "class"=>$classID, "user"=>$userName, "project"=>$projectName));
        return $url;
    }
    static function fragment($fullurl) {
        $fullurl=preg_replace("/\\?.*/","",$fullurl);
        if (preg_match("/([0-9a-fA-F]+)\\/([^\\/]*)$/",$fullurl,$m)) {
            return $m;
        }
        return false;
    }
    static function filePath($fullurl) {
        $f=self::fragment($fullurl);
        if ($f) {
            return BA_PUB."/".$f[1]."/".$f[2];
        }
    }
    static function getRecord($url) {
        //$url=preg_replace("/\\?.*/","",$url);
        //if (preg_match("/([0-9a-fA-F]+\\/)[^\\/]*$/",$url,$m)) {
        //    $url=$m[1];
        //}
        $f=self::fragment($url);
        if ($f) {
            $url=$f[1]."/"; // TODO docker-by-class
        }
        return pdo_select1("select * from published where url=?",$url);
    }
    static function getClass($url) {
        $r=self::getRecord($url);
        if ($r) {
            req("BAClass");
            return new BAClass( $r->class );
        }
        return null;
    }
    static function getUser($url) {
        $r=self::getRecord($url);
        if ($r) {
            req("BAClass");
            return (new BAClass( $r->class ))->getUser($r->user);
        }
        return null;
        
    }
    static function listProjects($classID,$projectName) {
        return pdo_select("select * from published where `class`=? and `project`=? ",$classID,$projectName);
    }
}

 ?>
