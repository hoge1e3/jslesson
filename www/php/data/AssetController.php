<?php
req("auth","Published");
class AssetController {
    static function pub() {
        return new SFile(Auth::getFS(), "./pub/");

    }
    static function home() {
        $class=Auth::curClass2();
        $url=Published::getURL($class->id,"shared","assets");
        $s=self::pub()->rel("$url/");
        return $s;
    }
    static function upload() {
        $fn=$_FILES['acceptImage']['name'];
        $s=self::home()->rel($fn);
        $s->up()->mkdir();
        if ( $s->ext()===".php" ||  $s->ext()===".cgi") {
            $s=$s->sibling($s->truncExt().".txt");
        }
        copy($_FILES['acceptImage']['tmp_name'], $s->nativePath());
        //echo $_FILES['acceptImage']['tmp_name']." ".$s->nativePath();
        echo preg_replace("/\/+/","/", $s->relPath(self::pub()) );
    }
    static function list() {
        $h=self::home();
        $res=array();
        if ($h->exists()) {
            $pub=self::pub();
            foreach ($h->listFiles() as $file) {
                array_push($res,$file->relPath($pub));
            }
        }
        header("Content-type: text/json;charset=utf-8");
        print json_encode($res);
    }
    static function del() {
        $fn=param("fileName");
        $h=self::home();
        $f=$h->rel($fn);
        if ($f->exists()) $f->rm();
        echo "DONE";
    }
}

 ?>
