<?php

/*
\item{\bf class} 操作をしたユーザ(以下単に「ユーザ」）のクラスID
\item{\bf user} ユーザのユーザID
\item{\bf time} 操作をした時刻
\item{\bf lang} 操作をした対象となるプロジェクトのプログラミング言語
\item {\bf filename} 操作をした対象となるファイルのパス
\item {\bf result} 操作の種類
\item {\bf detail} 実行結果（標準出力またはエラーメッセージ）
\item {\bf code} 実行時のプログラムのソースコード．%HTML, JS
*/
$attrs=[""];
class LogElem {
    function __construct($l) {
        $r=json_decode($l["raw"]);
        if (!$r) {
            throw new Exception("Parse error json ".$l["raw"]);
        }
        foreach ($r as $k=>$v) {
            $this->{$k}=$v;
        }
        $this->id=$l["id"];
        $this->class=$l["class"];
        $this->user=$l["user"];
        $this->time=$l["time"];
        $this->filename=$l["filename"];
    }
}
function getCode($code) {
    foreach ($code as $lang=>$text) {
        if ($lang==="HTML") continue;
        return $text;
    }
}
class LogCluster {
    function collectOther($attr, $n) {
        if (!isset($n->{$attr})) {
            throw new Exception("invalid data ".json_encode($n));
        }
        $nv=$n->{$attr};
        if (!isset($this->{$attr})) {
            //print_r($n);
            $this->{$attr}=$nv;
            return true;
        }
        if ($this->{$attr}===$nv) return true;
        return false;
    }
    function collectOthers($n) {
        return $this->collectOther("class",$n)&&
        $this->collectOther("user",$n)&&
        $this->collectOther("filename",$n)&&
        $this->collectOther("lang",$n);
    }
    function collectTime($n) {
        if (!isset($this->time)) {
            $this->time=$n->time;
            return true;
        }
        if ($n->time<=$this->time+1) {
            return true;
        }
        return false;
    }
    function collectCode($n) {
        if (!isset($this->code)) {
            $this->code=$n->code;
            return true;
        }
        $tj=getCode($this->code);
        $nj=getCode($n->code);
        if (/*strlen($nj)<10 ||*/ $tj===$nj) return true;
        return false;
    }

    function collectResultDetail($n) {
        if (!isset($this->result)) {
            $this->id=$n->id;
            $this->result=$n->result;
            $this->detail=$n->detail;
            return true;
        }
        $tl=resultLevel($this);
        $nl=resultLevel($n);
        if ($nl>=$tl) {
            $this->id=$n->id;
            $this->result=$n->result;
            $this->detail=$n->detail;

        }
        return true;
    }
    function collect($n) {
        if (!($n instanceof LogElem)) {
            $n=new LogElem($n);
        }
        return $this->collectOthers($n) &&
        $this->collectTime($n) &&
        $this->collectCode($n) &&
        $this->collectResultDetail($n);
    }
    function withRaw() {
        $res=new stdClass;
        $raw=new stdClass;
        foreach ($this as $k=>$v) {
            $res->{$k}=$v;
            $raw->{$k}=$v;
        }
        $res->raw=json_encode($raw);
        return $res;
    }
}
function resultLevel($target) {
    $a=explode(" ",$target->result,2);
    if (count($a)==2) $r=$a[1];
    else $r=$a[0];
    switch ($r) {
        case "Open":
        return 0;
        case "Unsaved":
        return 1;
        case "Save":
        return 2;
        case "Build":
        return 3;
        case "Run":
        if ($target->detail==="実行しました") return 3;
        return 4;
        case "Compile Error":
        case "Runtime Error":
        return 5;
    }
    return 0;
}
 ?>
