<?php
if (!defined("PDO_DSN")) {//deprecated (moved to config/config.php)
    require_once "db/config.php";
}

function pdo() {
    global $pdo_dbh;
    if (isset($pdo_dbh)) {
        return $pdo_dbh;
    }
    $pdo_dbh=pdo_new();
    return $pdo_dbh;
}
function pdo_new() {
    if (defined("PDO_USER")) {
        $dbh=new PDO(PDO_DSN,PDO_USER,PDO_PASS);
    } else {
        $dbh=new PDO(PDO_DSN);
    }
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
function pdo_select1() {
    $rs=call_user_func_array("pdo_select",func_get_args());
    foreach($rs as $r) {
        return $r;
    }
    return null;
}
function pdo_exec() {
    $pdo=pdo();
    $a=func_get_args();
    $q=array_shift($a);
    //echo $q;var_dump($a);
    $sth=$pdo->prepare($q);
    if (count($a)===1 && is_array($a[0])) $a=$a[0];
    $sth->execute($a);
    return $sth;
}
function pdo_select() {
    $sth=call_user_func_array("pdo_exec",func_get_args());
    return $sth->fetchAll(PDO::FETCH_OBJ);
}
function pdo_select_iter() {
    $sth=call_user_func_array("pdo_exec",func_get_args());
    return new RecordIterator($sth);
}
function pdo_insert($tbl, $vals) {
    $pdo=pdo();
    $q="insert into `$tbl`(";
    $vs="";$com="";$vary=array();
    foreach ($vals as $k=>$v) {
        $q.="$com`$k`";
        $vs.="$com?";
        $com=", ";
        array_push($vary,$v);
    }
    $q.=") values ($vs)";
    //echo $q;var_dump($vary);
    $sth=$pdo->prepare($q);
    $sth->execute($vary);
}
function pdo_find1($tbl,$keys) {
    $q="select * from `$tbl` ";
    $q.=" where ";$com="";
    $vary=array();
    foreach ($keys as $k=>$v) {
        $q.="$com`$k`=?";
        $com=" and ";
        array_push($vary,$v);
    }
    $q.=" limit 1";
    return pdo_select1($q,$vary);
}
function pdo_update($tbl,$key,$vals) {
    if (is_array($key)) {
        return pdo_update2($tbl,$key,$vals);
    }
    $pdo=pdo();
    $q="update `$tbl` set ";
    $vs="";$com="";$vary=array();
    $keyval=null;
    foreach ($vals as $k=>$v) {
        if ($k==$key) {
            $keyval=$v;
            continue;
        }
        $q.="$com`$k`=?";
        $com=", ";
        array_push($vary,$v);
    }
    $q.=" where `$key`=?";
    array_push($vary, $keyval);
    //echo $q;var_dump($vary);
    $sth=$pdo->prepare($q);
    $sth->execute($vary);
}
function obj2ary($a){
    if (is_array($a)) return $a;
    if (!is_object($a)) {
        throw new Exception("obj2ary: $a is neither object nor array ");
    }
    $r=array();
    foreach ($a as $k=>$v) {
        $r[$k]=$v;
    }
    return $r;
}
function pdo_insertOrUpdate($tbl,$keys,$vals) {
    //echo $q;var_dump($vary);
    $r=pdo_find1($tbl,$keys);
    if ($r) {
        return pdo_update2($tbl,$keys,$vals);
    } else {
        return pdo_insert($tbl,array_merge(
            obj2ary($keys),obj2ary($vals)));
    }
}
function pdo_update2($tbl,$keys,$vals) {
    $pdo=pdo();
    $q="update `$tbl` set ";
    $vs="";$com="";$vary=array();
    foreach ($vals as $k=>$v) {
        $q.="$com`$k`=?";
        $com=", ";
        array_push($vary,$v);
    }
    $q.=" where ";$com="";
    foreach ($keys as $k=>$v) {
        $q.="$com`$k`=?";
        $com=" and ";
        array_push($vary,$v);
    }
    //echo $q;var_dump($vary);
    $sth=$pdo->prepare($q);
    $sth->execute($vary);
}
class RecordIterator implements Iterator
{
    private $current;
    private $sth;
    private $type;
    public function __construct($sth,$type=PDO::FETCH_OBJ)
    {
        $this->sth = $sth;
        $this->count=-1;
        $this->type=$type;
        $this->fetch();
    }
    function fetch() {
        $this->current=$this->sth->fetch($this->type);
        $this->count++;
    }

    public function rewind()
    {
    }

    public function next()
    //繰り返し処理を次に進める。各繰り返しの最後に呼び出される。
    {
        $this->fetch();
    }

    public function key()
    {
        return $this->count;
    }

    public function current()
    {
        return $this->current;
    }

    public function valid()
    //次の要素が存在すれば true、存在しなければ false を返す。各繰り返しの前に呼び出される。
    {
        return !!$this->current;
    }
}

?>
