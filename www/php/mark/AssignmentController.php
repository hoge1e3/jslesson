<?php
req("auth","pdo","Assignment");
class AssignmentController {
    static function add() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $name=param("name");
        $a=new Assignment($class, $name);
        if ($a->exists()) return err("$name は存在します.");
        foreach(Assignment::schema() as $k=>$t) {
            $val=param($k,null);
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
        $na=new Assignment($class, $name);
        $na->load();
        echo $na->id;
    }
    static function rename() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $b=new Assignment($class, param("origname"));
        $a=new Assignment($class, param("name"));
        if (!$b->exists()) {
            return err($b->name." は存在しません.");
        }
        if ($a->exists()) {
            return err($a->name." は存在します.");
        }
        $b->renameTo($a->name);
    }
    static function edit() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $name=param("name");
        $a=new Assignment($class, $name);
        if (!$a->exists()) return err($name." は存在しません.");
        $a->load();
        foreach(Assignment::schema() as $k=>$t) {
            $val=param($k,null);
            if ($val===null) continue;
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
        echo "OK";
    }
    static function list() {
        //Auth::assertTeacher();
        $class=Auth::curClass2();
        $res=pdo_select("select * from assignment where class=?",
        $class->id);
        $file=param("file",null);
        if ($file) $res=self::byFile($res);
        header("Content-type: text/json");
        echo json_encode($res);
    }
    static function get() {
        //Auth::assertTeacher();
        $class=Auth::curClass2();
        $name=param("name");
        $a=new Assignment($class,$name);
        if (!$a->exists()) return err("$name は存在しません.");
        $res=$a->record();
        header("Content-type: text/json");
        $res->files=json_decode($res->files);
        echo json_encode($res);
    }
    static function del() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $id=param("id")-0;
        $a=new Assignment($id);
        $a->load();
        if ($a->_class->id!==$class->id) {
            throw new Exception("You are not the class admin");
        }
        $a->del();
        echo "OK";
    }
    static function byFile($res,$file) {
        $res2=array();
        foreach ($res as $a) {
            $files=json_parse($a->files);
            foreach ($files as $filee=>$t) {
                if (PathUtil::startWith( $filee, $file)) {
                    $res2[]=$a;
                    break;
                }
            }
        }
        return $res2;
    }
    static function submit() {
        req("Submission");
        //$class=Auth::curClass2();
        $user=Auth::curUser2();
        $r=self::submit_common($user,param("name"),param("files"));
        if ($r["status"]=="NG") http_response_code(500);
        print json_encode($r);
    }
    static function submit2() {
        req("Submission");
        //$class=Auth::curClass2();
        $token=param("token");
        $user=BAUser::fromAccessToken($token);
        if (!$user) {
            $r= array("status"=>"NG",
            "mesg"=>"Token $token not found!");
        } else {
            $r=self::submit_common($user,param("name"),param("files"));
        }
        /*$token=explode("@-@",$token);
        $class=$token[0];
        $user=$token[1];
        $class=new BAClass($class);
        $user=new BAUser($class,$user);*/
        print json_encode($r);
    }
    static function submit_common($user,$name,$files) {
        $assignment=new Assignment(
            $user->_class,$name);
        if (!$assignment->exists()) {
            return array("status"=>"NG",
            "mesg"=>"Practice ".$assignment->name." not found!");
        }
        $sub=Submission::getLast($user,$name);
        if (!$sub || $sub->getMark()) {
            $sub=new Submission();
            $sub->user=$user;
            $sub->assignment=$assignment;
        } else {
            $sub->load();
            $sub->time=DateUtil::now();
        }
        $sub->files=json_decode($files);
        if (!$sub->files) {
            return array("status"=>"NG",
            "mesg"=>"Invalid Format: $files");
        }
        $sub->save();
        return array("status"=>"OK",
        "mesg"=>"Pracitce ".$sub->assignment->name." submission complete!");
    }
    static function accessToken() {
        $user=Auth::curUser2();
        if (!$user) {
            $login=param("login","http://bitarrow.eplang.jp/bitarrowbeta");
            header("Location: $login");
            exit;
        }
        echo $user->getAccessToken();
    }
    static function view() {
        $user=Auth::curUser2();
        if (!$user) {
            $login=param("login","http://bitarrow.eplang.jp/bitarrowbeta");
            header("Location: $login");
            exit;
        }
        $r=pdo_select("select ".
        "a.name , m.result , m.comment, s.id, s.time ".
        "from submission s ".
        "inner join assignment a on s.assignment=a.id ".
        "left join mark m on m.submission=s.id ".
        "where s.user=? and a.class=? ".
        "order by a.name, s.time desc ",
        $user->name,$user->_class->id);
        $stats=array();
        foreach ($r as $e) {
            if (isset($stats[$e->name])) continue;
            $stats[$e->name]=$e;
            //print_r(json_encode($e)."<hR/>");
        }
        $assigns=pdo_select(
            "select id,name from assignment where class=? order by name",
            $user->_class->id);
        foreach ($assigns as $a) {
            print $a->name." - ";
            if (isset($stats[$a->name])) {
                $stat=$stats[$a->name];
                print "(id=".$stat->id.")";
                if (isset($stat->result)) {
                    print "[".$stat->result."]";
                    print $stat->comment;
                } else {
                    print "未採点";
                }
                //print (json_encode($stat));
            } else {
                print "未提出";
            }
            print"<hr/>";
        }
    }
}

function err($err){
    http_response_code(500);
    echo $err;
}
?>
