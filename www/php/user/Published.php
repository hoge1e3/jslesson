<?php
/*
TODO:  ~/badb/migratepub.php
CREATE TABLE `pub_class` (
  `url` varchar(32) DEFAULT NULL, -- ends /
  `class` varchar(32) DEFAULT NULL
) DEFAULT CHARSET=utf8;
CREATE TABLE `pub_user` (
  `url` varchar(32) DEFAULT NULL, -- ends /
  `class` varchar(32) DEFAULT NULL, -- join on  =pub_class.class
  `user` varchar(32) DEFAULT NULL,
  `project` varchar(32) DEFAULT NULL -- ends /
) DEFAULT CHARSET=utf8;
);*/
req("UniqID");
class Published {
    static function getURLOfClass($classID) {
        $cr=pdo_select1("select * from pub_class where `class`=? ",$classID);
        if ($cr) {
            $urlC=$cr->url;
        } else {
            $urlC=pdo_uniqID("pub_class","url")."/";
            pdo_insert("pub_class",array("url"=>$urlC, "class"=>$classID));
        }
        return $urlC;
    }
    static function getURL($classID,$userName,$projectName) {
        $urlC=self::getURLOfClass($classID);
        $ur=pdo_select1("select * from pub_user where `class`=? and `user`=? and `project`=? ",
            $classID,$userName,$projectName);
        if ($ur) {
            $urlU=$ur->url;
        } else {
            $urlU=UniqID::find(function ($url) use($classID) {
                return pdo_select1("select * from pub_user where url=? and class=?", $url, $classID);
            },500,100);
            $urlU.="/";
            pdo_insert("pub_user",array("url"=>$urlU, "class"=>$classID, "user"=>$userName, "project"=>$projectName));
        }
        return "$urlC$urlU";
    }

    static function getRecord($url) {// full url
        //                  \?.*
        $url=preg_replace("/\\?.*/","",$url); // trim params
        //               ([0-9]+/)([0-9]+/)[^/]*$
        if (preg_match("/([0-9]+\\/)([0-9]+\\/)[^\\/]*$/",$url,$m)) {
            $urlC=$m[1];
            $urlU=$m[2];
            $cr=pdo_select1("select * from pub_class where url=?",$urlC);
            return pdo_select1("select * from pub_user where url=? and class=?",$urlU, $cr->class);
        }
        return null;
    }
    static function getClass($url) {// full url
        $r=self::getRecord($url);
        if ($r) return $r->class;
        return null;
    }
    static function listProjects($classID,$projectName=null) {// Why projectName? -> list of specified project for all users
        if ($projectName) {
            return pdo_select("select * from pub_class where `class`=? and `project`=? ",$classID,$projectName);
        } else {
            return pdo_select("select * from pub_class where `class`=? ",$classID);
        }
    }
}

 ?>
