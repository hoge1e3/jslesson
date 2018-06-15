<?php
req("auth","SFile","pdo","Submission","DateUtil");
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
    static function submit2() {
        $class=Auth::curUser2();
        Auth::assertTeacher();
        // POST
        // submission(ID)=>{result , comment}
        foreach($_POST as $key=>$value) {
            $data=json_decode($value);
            $data->time=DateUtil::now();
            $r=pdo_insertOrUpdate("mark",array("submission"=>$key),$data);
        }
    }
    static function submit() {
        $_POST = fix(file_get_contents('php://input'));
        foreach($_POST as $key=>$value) {
            print " KEY $key <BR>";
            if (substr($key,0,4)==="CMT/") {
                $key=substr($key,4);
                $okey="OK/$key";
                $mankey="MAN/$key";
                $result="NG";
                if (isset($_POST[$okey])) {
                    $result=$_POST[$okey];
                }
                $man=0;
                if (isset($_POST[$mankey])) {
                    $man=$_POST[$mankey];
                }
                $r=pdo_insertOrUpdate("mark",
                array("submission"=>$key),
                array("result"=>$result,
                    "comment"=>$value,
                    "manual"=>$man,
                    "time"=>DateUtil::now()));
                echo "$key にコメントを書きました?<BR>";
            }
        }
    }
    static function getSubmission() {
        $id=param("id");
        $sub=new Submission($id);
        $a=$sub->getAssignment();
        $class=$a->getClass();
        if (! Auth::isTeacherOf($class) ) {
            die("You are not the teacher");
        } else {
            $sub->assignment=null;
            echo json_encode($sub);
        }
    }
    static function submitOLD() {
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
                    $l=$target->lastUpdate();
                    if ($dst->exists()) {
                        $c=$dst->text();
                    } else {
                        $c="";
                    }
                    if (strlen($value)>0 && $c!==$value) {
                        $dst->text($value);
                        echo "$key にコメントを書きました！<BR>";
                        self::addLog($dst->path(),$value,$l);
                    } else {
                        echo "$key の内容は変わっていません<BR>";
                    }
                } else {
                    echo "ない！".$target->path()."<BR>";
                }
            }
        }
    }
    static function addLog($dst,$cont,$timeStamp) {
        date_default_timezone_set('Asia/Tokyo');
        $user=Auth::curUser();
        $class=Auth::curClass();
        $fp=fopen(BA_LOG."/$class-$user-data.log","a");
        $time=date(DATE_ATOM);
        $data=json_encode(array("date"=>$time, "result"=>"mark",
        "filename"=>$dst, "detail"=>$cont,"targetTime"=>$timeStamp));
        fwrite($fp, "$data\n");
        fclose($fp);
    }
    static function getLast() {
        $user=Auth::curUser2();
        $assignmentName=param("assignment",null);
        if ($assignmentName) {
            $s=Submission::getLast($user,$assignmentName);
        } else {
            $s=Submission::getLastByFile($user,param("file"));
        }
        $r=null;
        if ($s) {
            $r=pdo_select1("select * from mark ".
            "where submission=? ",$s->id);
        }
        if ($r) print json_encode($r);
        else print "{}";
    }
    static function notMarked() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $r=pdo_select("select a.name as name,sum(1) as count ".
        "from submission s ".
        "inner join assignment a on s.assignment=a.id ".
        "left join mark m on m.submission=s.id ".
        "where m.result is null and a.class=? ".
        "group by a.name;",$class->id);
        foreach ($r as $e) {
            print $e->{"name"}.":  ".$e->{"count"}."<BR>\n";
        }
    }
}
?>
