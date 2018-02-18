<?php
req("auth","pdo","Testcase");
class TestcaseController {
    static function getAssignment($allowToStudent=false) {
        if (!$allowToStudent) Auth::assertTeacher();
        $class=Auth::curClass2();
        $assignmentID=param("assignment");
        $assignment=new Assignment($assignmentID);
        return $assignment;
    }
    static function add() {
        $assignment=self::getAssignment();
        $name=param("name");
        $a=new Testcase($assignment, $name);
        if ($a->exists()) return err("$name は存在します.");
        foreach(Testcase::schema() as $k=>$t) {
            $val=param($k,null);
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
        $na=new Testcase($assignment, $name);
        $na->load();
        echo $na->id;
    }
    static function rename() {
        $assignment=self::getAssignment();
        $b=new Testcase($assignment, param("origname"));
        $a=new Testcase($assignment, param("name"));
        if (!$b->exists()) {
            return err($b->name." は存在しません.");
        }
        if ($a->exists()) {
            return err($a->name." は存在します.");
        }
        $b->renameTo($a->name);
    }
    static function edit() {
        $assignment=self::getAssignment();
        $name=param("name");
        $a=new Testcase($assignment, $name);
        if (!$a->exists()) return err($name." は存在しません.");
        $a->load();
        foreach(Testcase::schema() as $k=>$t) {
            $val=param($k,null);
            if ($val===null) continue;
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
        echo "OK";
    }
    static function list() {
        $assignment=self::getAssignment(true);
        $res=pdo_select("select * from testcase where assignment=?",
        $assignment->id);
        header("Content-type: text/json");
        echo json_encode($res);
    }
    static function get() {
        $assignment=self::getAssignment();
        $name=param("name");
        $a=new Testcase($assignment,$name);
        if (!$a->exists()) return err("$name は存在しません.");
        $res=$a->record();
        header("Content-type: text/json");
        //$res->files=json_decode($res->files);
        echo json_encode($res);
    }
    static function del() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $id=param("id")-0;
        $t=new Testcase($id);
        $t->load();
        if ($t->assignment->_class->id!==$class->id) {
            throw new Exception("You are not the teacher of ".$t->assignment->name);
        }
        $t->del();
        echo "OK";
    }

}

function err($err){
    http_response_code(500);
    echo $err;
}
?>
