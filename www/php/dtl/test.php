<pre>
<?php
$a=array();
$a[10]=35;
$a[1]=3;
$a[10]=32;
array_push($a,51);
echo count($a);
foreach ($a as $k=>$v) {
    print (is_int($k)?"N":"S")."$k=>$v";
}
/*require_once"DtlNumber.php";
require_once"DtlObj.php";
require_once"DtlBlock.php";
require_once"DtlThread.php";
class Test{
    public function hoge($x,$y) {
        return $x+$y;
    }
}
class Num {
    public $value;
    public function else() {
        
    }
}
$t=new Test;
$kana="else";
$t->$kana=5;
echo $t->$kana;
*/
/*$th=new DtlThread;
$root=new DtlObj;
$b=new DtlBlock($root,array(
    array("pushi", 2), array("pushi",3),array("send",1,"mul"),
    array("store1","x"),
    array("pushi", 31), array("store1","y"),
    
    //array("pushb", array(  ) ) , array("store1", "b"),
    array("pushi", $t), array("push1", "x"),     array("push1", "y"),
    array("send",2,"hoge"),array("ret")
) );
$args=array();
echo $th->run($root,$b,$args );   // DtlObj::call($d, array(3,5), "hoge");
*/
/*echo "!".is_int("123"+0);
echo "!".is_float("123"+0);
echo "!".is_int("123.4"+0);
echo "!".is_float("123.4"+0);*/
/*echo "!".is_string("123");
echo "!".is_int("123");
echo "!".is_int(123);
echo "!".is_string("ABC123");
echo "!".is_int("ABC123");*/
?></pre>