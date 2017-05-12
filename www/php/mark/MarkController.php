<?php
req("auth","SFile");
function fix($source) {
    $source = preg_replace_callback(
        '/(^|(?<=&))[^=[&]+/',
        function($key) { return bin2hex(urldecode($key[0])); },
        $source
    );

    parse_str($source, $post);
    return array_combine(array_map('hex2bin', array_keys($post)), $post);
}

class MarkController {
    static function submit() {
        // POST
        //   class/user/prj/file   - value
        //  dest:  class/user/prj/file.cmt.txt
        $home=new SFile(Auth::getFS(),"/home/");
        $_POST = fix(file_get_contents('php://input'));
        
        foreach($_POST as $key=>$value) {
            //print " KEY $key<BR>";
            if (substr($key,0,4)==="CMT/") {
                $key=substr($key,4);
                //echo "$key にコメントを書きました?<BR>";
                $dst=$home->rel($key.".cmt.txt");
                $target=$home->rel($key.".c");
                if ($target->exists()) {
                    if ($dst->exists()) {
                        $c=$dst->text();
                    } else {
                        $c="";
                    }
                    if (strlen($value)>0 && $c!==$value) {
                        $dst->text($value);
                        echo "$key にコメントを書きました！<BR>";
                        self::addLog($dst->path(),$value);
                    } else {
                        echo "$key の内容は変わっていません<BR>";
                    }
                } else {
                    echo "ない！".$target->path()."<BR>";
                }
            }
        }
    }
    static function addLog($dst,$cont) {
        date_default_timezone_set('Asia/Tokyo');
        $user=Auth::curUser();
        $class=Auth::curClass();
        $fp=fopen("log/$class-$user-data.log","a");
        $time=date(DATE_ATOM);
        $data=json_encode(array("date"=>$time, "result"=>"mark", "filename"=>$dst, "detail"=>$cont));
        fwrite($fp, "$data\n");
        fclose($fp);
    }
}
?>