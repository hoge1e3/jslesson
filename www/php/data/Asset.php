<?php

class Asset{
    static function pub() {
        return new SFile(Auth::getFS(), "./pub/");
    }
    static function homes() {
        return array(
            "user"=>self::home("user"),
            "class"=>self::home("class")
        );
    }
    static function home($context) {
        Auth::assertLoggedIn();
        $class=Auth::curClass2();
        if ($context==="user") {
            $u=Auth::curUser2();
            $context=$u->name;
        }
        $url=Published::getURL($class->id,$context,"assets");
        $s=self::pub()->rel("$url/");
        return array("file"=>$s, "url"=>BA_PUB_URL."/$url/");
    }
} ?>
