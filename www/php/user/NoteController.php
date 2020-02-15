<?php
/*
create table note(
    `id` varchar(32),
    `target` varchar(32), -- externalized.id or null(root)
    `time` integer,
    `class` varchar(32),
    `user` varchar(32),
    `file` varchar(250), -- file path or null (for other externalized)
    `content` text, -- empty on just a fav
    `favs` integer, -- 0 or 1?
    `options` text
);
*/
req("auth","DateUtil");
class NoteController {
    public static function put() {
        $user=Auth::curUser2();
        $time=DateUtil::now();
        $target=param("target",null);// varchar(32), -- externalized.id or null(root)
        //`time` integer,
        //`class` varchar(32),
        //`user` varchar(32),
        $file=param("file");// varchar(250), -- file path or null (for other externalized)
        $content=param("content");// text, -- empty on just a fav
        $favs=param("favs",0);// integer, -- 0 or 1?
        $id=pdo_uniqID("note","id");
        pdo_insert("note",array(
            "id"=>$id,
            "class"=>$user->_class->id,
            "user"=>$user->name,
            //"target"=>"target",
            "time"=>$time,
            "file"=>$file,
            "content"=>$content,
            "favs"=>$favs
        ));
        echo $id;
    }
    public static function get() {
        $file=param("file",null);
        $target=param("target",null);
        $since=param("since",0);
        /*
        select n1.*,
            n2.class as c_class, n2.user as c_user,
            n2.content as c_content, n2.favs as c_favs
            from
            note n1 left join note n2
            on n2.target=n1.id
            where file=? and time>?

            select n1.*, sum(n2.favs) from
                note n1 inner join note n2
                on n2.target=n1.id
                group by n1.id;

            select n1.*, sum(n2.favs) from
                note n1 inner join note n2
                on n2.target=n1.id;
                where file=? and time>? ;

        */
        if ($file) {
            $r=pdo_select("select * from note where file=? and time>?",$file,$since);
            header("Content-type: text/json");

            $rf=pdo_select(
                "select n1.id, sum(n2.favs) as favs from ".
                "note n1 inner join note n2 ".
                "on n2.target=n1.id ".
                "where n1.file=? and n1.time>? ".
                "group by n1.id"
            ,$file,$since);
            $rfh=array();
            foreach ($rf as $rfe) {
                $rfh[$rfe->id]=$rfe->favs;
            }
            foreach ($r as $e) {
                if (array_key_exists($e->id,$rfh)) {
                    $e->favsHaving=$rfh[$e->id];
                }
            }
            echo json_encode($r);
        }
    }
    public static function addLike() {
        $user=Auth::curUser2();
        $time=DateUtil::now();
        $target=param("id");
        $id=pdo_uniqID("note","id");
        $favs=param("favs",1);
        pdo_insert("note",array(
            "id"=>$id,
            "class"=>$user->_class->id,
            "user"=>$user->name,
            "target"=>$target,
            "time"=>$time,
            //"file"=>$file,
            //"content"=>$content,
            "favs"=>$favs
        ));
    }
}
