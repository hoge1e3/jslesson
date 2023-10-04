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
        $url=PathUtil::truncSep($url);
        $s=self::pub()->rel("$url/");
        return array("file"=>$s, "url"=>PathUtil::truncSep(BA_PUB_URL)."/$url/");
    }
    static function homesFromFullURL($fullurl) {
        $user=Published::getUser($fullurl);
        $url=Published::getURL($user->_class->id,"class","assets");
        $url=PathUtil::truncSep($url);
        $s=self::pub()->rel("$url/");
        $cl=array("file"=>$s, "url"=>PathUtil::truncSep(BA_PUB_URL)."/$url/");

        $url=Published::getURL($user->_class->id,$user->name,"assets");
        $url=PathUtil::truncSep($url);
        $s=self::pub()->rel("$url/");
        $us=array("file"=>$s, "url"=>PathUtil::truncSep(BA_PUB_URL)."/$url/");
        //print_r(["class"=>$cl, "user"=>$us]);
        return ["class"=>$cl, "user"=>$us];

        /*
        $s=self::pub()->rel("$frag/");
        
        $class=["file"=>$s, "url"=>PathUtil::truncSep(BA_PUB_URL)."/$frag/" ];
        return ["class"=> $class];*/
    }
} ?>
