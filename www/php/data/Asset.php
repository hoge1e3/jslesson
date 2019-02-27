<?php

class Asset{
    static function pub() {
        return new SFile(Auth::getFS(), "./pub/");
    }
    static function homes() {
        return array(
            "personal"=>self::home("personal"),
            "shared"=>self::home("shared")
        );
    }
    static function home($context) {
        $class=Auth::curClass2();
        if ($context==="personal") {
            $u=Auth::curUser2();
            $context=$u->name;
        }
        $url=Published::getURL($class->id,$context,"assets");
        $s=self::pub()->rel("$url/");
        return array("file"=>$s, "url"=>BA_PUB_URL."/$url/");
    }
} ?>
