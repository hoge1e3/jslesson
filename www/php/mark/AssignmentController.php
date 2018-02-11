<?php
req("auth","pdo");
class AssignmentController {
    function add() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $a=new Assignment($class, param("name"));
        foreach(Assignment::schema() as $k=>$t) {
            $val=param($k);
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
    }
    function edit() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $a=new Assignment($class, param("name"));
        $a->load();
        foreach(Assignment::schema() as $k=>$t) {
            $val=param($k,null);
            if ($val===null) continue;
            if ($t==="object") $val=json_decode($val);
            $a->{$k}=$val;
        }
        $a->save();
    }
    function list() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $res=pdo_select("select * from assignment where class=?",
        $class->id);
        $file=param("file",null);
        if ($file) $res=self::byFile($res);
        return json_encode($res);
    }
    function get() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $name=param("name");
        $res=pdo_select1("select * from assignment where class=? and name=?" ,
        $class->id,$name);
        return $res;
    }
    function byFile($res,$file) {
        $res2=array();
        foreach ($res as $a) {
            $files=json_parse($a->files);
            if ($files->{$file}) {
                $res2[]=$a;
            }
        }
        return json_encode($res2);
    }

}


?>
