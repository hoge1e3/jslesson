<?php
req("auth","Published","Asset");
class AssetController {
    static function form() {
        ?>
        <form action="a.php?Asset/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="acceptImage"/>
            <input type="text" name="context" value="user"/>
            <input type="submit">
        </form><?php
    }
    static function upload() {
        $context=param("context","user");
        $useFiles=(isset($_FILES) && isset($_FILES['acceptImage']));
        if ($useFiles) {
            $fn=$_FILES['acceptImage']['name'];
        } else {
            $fn=param("filename");
        }
        $home=Asset::home($context);
        $h=$home["file"];
        $s=$h->rel($fn);
        $s->up()->mkdir();
        if ( $s->ext()===".php" ||  $s->ext()===".cgi") {
            $s=$s->sibling($s->truncExt().".txt");
        }
        if ($useFiles) {
            copy($_FILES['acceptImage']['tmp_name'], $s->nativePath());
        } else {
            $s->text(param("content"));
            echo "Saved $fn as text";
        }
        //echo $_FILES['acceptImage']['tmp_name']." ".$s->nativePath();
        //echo preg_replace("/\/+/","/", $s->relPath(self::pub()) ); //self::pub??
    }
    static function download() {
        $context=param("context","user");
        $filename=param("filename");
        if (strstr("..", $filename)!==false) {
            throw new Exception("Invalid path");
        }
        $home=Asset::home($context);
        $h=$home["file"];
        $f=$h->rel($filename);
        header("Content-type: text/plain; charset=utf8");
        echo $f->text();
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
    static function exists() {
        $context=param("context","user");
        $filename=param("filename");
        if (strstr("..", $filename)!==false) {
            throw new Exception("Invalid path");
        }
        $home=Asset::home($context);
        $h=$home["file"];
        $f=$h->rel($filename);
        header("Content-type: text/json;");
        print ($f->exists() ? "true" : "false");
    }
    static function del() {
        $context=param("context","user");
        $fn=param("fileName");
        if (strstr("..", $filename)!==false) {
            throw new Exception("Invalid path");
        }
        $home=Asset::home($context);
        $h=$home["file"];
        $f=$h->rel($fn);
        if ($f->exists()) $f->rm();
        echo "DONE";
    }
}

 ?>
