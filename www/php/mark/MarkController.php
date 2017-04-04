<?php
req("auth","SFile");
class MarkController {
    static function submit() {
        // POST
        //   class/user/prj/file   - value
        //  dest:  class/user/prj/file.cmt.txt
        $home=new SFile(Auth::getFS(),"/home/");
        
        foreach($_POST as $key=>$value) {
            if (substr($key,0,4)==="CMT/") {
                $key=substr($key,4);
                echo "$key にコメントを書きました?<BR>";
                $dst=$home->rel($key.".cmt.txt");
                $target=$home->rel($key.".c");
                if ($target->exists()) {
                    $dst->text($value);
                    echo "$key にコメントを書きました！<BR>";
                } else {
                    echo "ない！".$target->path()."<BR>";
                }
            }
        }
    }
}
?>