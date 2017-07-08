<?php
/*
create table published (
	url varchar(32),
	class varchar(32),
	user varchar(32),
	project varchar(32)
);*/
class Published {
    static function getURL($class,$user,$project) {
        $r=pdo_select1("select * from published where `class`=? and `user`=? and `project`=? ",$class,$user,$project);
        if ($r) {
            return $r->url;
        }
        $url=substr(md5("$class/$user/$project"),0,8)."/";
        pdo_insert("published",array("url"=>$url, "class"=>$class, "user"=>$user, "project"=>$project));
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
    static function listProjects($class,$project) {
        return pdo_select("select * from published where `class`=? and `project`=? ",$class,$project);
    }
}

 ?>
