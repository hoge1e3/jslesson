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
    static function getRecord($url) {
        $url=preg_replace("/\\?.*/","",$url);
        if (preg_match("/([0-9a-fA-F]+\\/)[^\\/]*$/",$url,$m)) {
            $url=$m[1];
        }
        return pdo_select1("select * from published where url=?",$url);
    }
    static function getClass($url) {
        $r=self::getRecord($url);
        if ($r) return $r->class;
        return null;
    }
    static function listProjects($classID,$projectName) {
        return pdo_select("select * from published where `class`=? and `project`=? ",$classID,$projectName);
    }
}

 ?>
