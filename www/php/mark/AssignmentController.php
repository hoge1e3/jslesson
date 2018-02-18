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
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $res=pdo_select("select * from assignment where class=?",
        $class->id);
        $file=param("file",null);
        if ($file) $res=self::byFile($res);
        header("Content-type: text/json");
        echo json_encode($res);
    }
    static function get() {
        Auth::assertTeacher();
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
        Assignment::del($class, $id);
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
        return json_encode($res2);
    }

}

function err($err){
    http_response_code(500);
    echo $err;
}
?>
