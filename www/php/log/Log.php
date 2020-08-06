<?php
req("auth","pdo");
class Log {
    static function get($id){
        $r=pdo_select1("select * from log where id = ?",$id);
        if (!$r) {
            throw new Exception("ID $id is not found");
        }
        //print_r($r);
        $user=Auth::curUser2();
        $class=$user->_class;
        if (Auth::isTeacherOf($class)) {
            if ($r->{"class"}!==$class->id) {
                throw new Exception("ID $id is not of ".$class->id);
            }
        } else {
            if ($r->{"class"}!==$class->id || $r->user!==$user->name) {
                throw new Exception("ID $id is not of ".$class->id.":".$user->name);
            }
        }
        return $r;
    }
}
