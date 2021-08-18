<?php
req("PathUtil");
class TestController {
static function test() {
	echo "ABC".defined("BA_MAIL")."DEF";
}
    static function test2() {
        touch(
            "C:\\bin\\Dropbox\\workspace\\jslesson\\www/../data/fs/home/personal/test@example.com/ctes/nul.html", 
            1551789503);
        /*rename(
            "C:\\bin\\Dropbox\\workspace\\jslesson\\data\\pythonwork\\959485/figure.png",
            "C:\\bin\\Dropbox\\workspace\\jslesson\\www/../data/fs/pub/959485/11250.png"
        );*/

        echo "done";
        /*req("MountableFS");
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
        //print $m->mv("/hoge/Readme.txt","/Readme2.txt");*/
    }
}
?>
