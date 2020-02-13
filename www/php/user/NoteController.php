<?php
req("auth");
class NoteController {
    public static function put() {
        $class=Auth::curClass2();
        $target=param("target");// varchar(32), -- externalized.id or null(root)
        //`time` integer,
        $time=DateUtil::now();
        //`class` varchar(32),
        //`user` varchar(32),
        $file=param("file");// varchar(250), -- file path or null (for other externalized)
        $content=param("content");// text, -- empty on just a fav
        $favs=param("favs");// integer, -- 0 or 1?
        //$id=;
        pdo_insert(
        );
    }
}
