<?php
require_once __DIR__."/../data/pdo.php";
class Classes{
    static function getAll(){
        $pdo = pdo();
        $sth=$pdo->prepare("select * from role where user = ? and type = ?");
        $sth->execute(array(Auth::curUser(),AUTH::TEACHER));
        return $sth->fetchAll();
    }
    static function get($class){
        $pdo=pdo();
        $sth=$pdo->prepare("select * from class where id = ?");
        $sth->execute(array($class));
        $c=$sth->fetchAll();
        if(count($c)==0){
            return null;
        }else{
            return $c[0];
        }
    }
    static function make($classname){
        $pdo=pdo();
        $sth=$pdo->prepare("insert into class(id) values(?)");
        $sth->execute(array($classname));
        $sth=$pdo->prepare("insert into role(user,class,type) values(?,?,?)");
        $sth->execute(array(Auth::curUser(),$classname,AUTH::TEACHER));
        Auth::mkdir($classname);
        return true;
    }
}
?>