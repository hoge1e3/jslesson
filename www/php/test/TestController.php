<?php
class TestController {
    static function test() {
        req("MountableFS");
        $m=new MountableFS();
        $m->mount("/hoge/","../Demo/");
        $m->mount("/","../scripts/");
        echo "hoge/<BR>";
        var_dump($m->ls("/hoge/images/"));
        echo "/<BR>";
        var_dump($m->ls("/"));
        echo "<h1>mv</h1>";
        //print "<pre>".$m->getContent("/hoge/js/concat.js")."</pre>";
        print $m->mv("/Readme2.txt","/hoge/Readme3.txt");
        //print $m->mv("/hoge/Readme.txt","/Readme2.txt");
    }
}
?>
