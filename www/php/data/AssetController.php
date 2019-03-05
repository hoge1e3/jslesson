<?php
req("auth","Published","Asset");
class AssetController {

    static function upload() {
        $context=param("context","user");
        $fn=$_FILES['acceptImage']['name'];
        $home=Asset::home($context);
        $h=$home["file"];
        $s=$h->rel($fn);
        $s->up()->mkdir();
        if ( $s->ext()===".php" ||  $s->ext()===".cgi") {
            $s=$s->sibling($s->truncExt().".txt");
        }
        copy($_FILES['acceptImage']['tmp_name'], $s->nativePath());
        //echo $_FILES['acceptImage']['tmp_name']." ".$s->nativePath();
        echo preg_replace("/\/+/","/", $s->relPath(self::pub()) );
    }
    static function list() {
        $context=param("context","user");
        $home=Asset::home($context);
        $h=$home["file"];
        $res=array();
        if ($h->exists()) {
            $pub=Asset::pub();
            foreach ($h->listFiles() as $file) {
                array_push($res,$file->relPath($pub));
            }
        }
        header("Content-type: text/json;charset=utf-8");
        print json_encode($res);
    }
    static function del() {
        $context=param("context","user");
        $fn=param("fileName");
        $home=Asset::home($context);
        $h=$home["file"];
        $f=$h->rel($fn);
        if ($f->exists()) $f->rm();
        echo "DONE";
    }
}

 ?>
