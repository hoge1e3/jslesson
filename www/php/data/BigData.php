<?php
req("auth","DateUtil");
class BigData {
    static $class;
    static function selectClassByURL($url) {
        //TODO: will deprecate by security issues
        req("Published");
        $class=Published::getClass($url);
        if ($class) {
            self::$class=new BAClass($class);
        }
    }
    static function getClass() {
        if (!self::$class) {
            $class=Auth::curClass2();
        } else {
            $class=self::$class;
        }
        if (!$class) throw new Exception("cannot get class info");
        return $class;
    }
    static function add(){
        $args=func_get_args();
        $name=array_shift($args);
        $nums=array();
        $strs=array();
        foreach ($args as $e) {
            if (is_int($e)) {
                $strs[]="NUMBER";
                $nums[]=$e;
            } else if (is_null($e)) {
                $strs[]="";
                $nums[]=-9999;
            } else {
                $strs[]=$e;
                $nums[]=-9999;
            }
        }
        while(count($nums)<4) $nums[]=-9999;
        while(count($strs)<4) $strs[]="";
        $time=DateUtil::now();
        $class=self::getClass();
        $user=Auth::curUser2();
        if ($user) {$userName=$user->name;} else {$userName="";}
        pdo_exec("insert into bigdata(time,class,user,name,num1,str1,num2,str2,num3,str3,num4,str4)".
                             "values (?   ,?    ,?   ,?   ,?   ,?   ,?   ,?   ,?   ,?   ,?   ,?   )",
                               $time,$class->id,$userName,$name,
                               $nums[0],$strs[0],$nums[1],$strs[1],$nums[2],$strs[2],$nums[3],$strs[3]
        );
    }
    static function looksLikeNum($s) {
        return preg_match('/^[\\+\\-]?[0-9\\.]+$/',$s);
    }
    static function find(){
        $args=func_get_args();
        $name=array_shift($args);
        $placeholders=array($name);
        $conds=array("name = ?");
        // "<100", "<=100", "=100", "100", "hoge" , "%hoge%"
        foreach ($args as $i=>$e) {
            if (is_null($e)) continue;
            if (preg_match('/^[<>=]=?/',$e,$m)) {
                $op=$m[0];
                $val=substr($e,strlen($op));
                if ($op==="==") $op="=";
            } else if (preg_match('/^%/',$e) || preg_match('/%$/',$e)) {
                $op="like";
                $val=$e;
            } else {
                $op="=";
                $val=$e;
            }
            if (self::looksLikeNum($val)) {
                $fld="num".($i+1);
            } else {
                $fld="str".($i+1);
            }
            $conds[]=" $fld $op ? ";
            $placeholders[]=$val;
        }
        $res=pdo_select(
            "select * from bigdata ".
            "where ".implode(" and ",$conds),$placeholders);
        foreach ($res as $r) {
            $r->data1=self::sel($r->str1,$r->num1);
            $r->data2=self::sel($r->str2,$r->num2);
            $r->data3=self::sel($r->str3,$r->num3);
            $r->data4=self::sel($r->str4,$r->num4);
        }
        return $res;
    }
    static function sel($str,$num) {
        if ($str==="NUMBER") return $num-0;
        return $str;
    }
}
 ?>
