<?php
req("auth","DateUtil");
class NoteController {
    public static function put() {
        $user=Auth::curUser2();
        $target=param("target",null);// varchar(32), -- externalized.id or null(root)
        //`time` integer,
        $time=DateUtil::now();
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
            "target"=>"target",
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
        if ($file) {
            $r=pdo_select("select * from note where file=? and time>?",$file,$since);
            header("Content-type: text/json");
            echo json_encode($r);
        }
    }
}
