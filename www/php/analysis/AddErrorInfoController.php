<?php
/*$g=3;
function getMesgs(){
    global $mesgs;
    global $g;
    echo "g=$g";
    //var_dump($mesgs);
    return $mesgs;
}
//var_dump($mesgs);
getMesgs();*/
req("pdo","auth");
class AddErrorInfoController {
    static function getMesgs() {
        $mesgs=array("文法エラー","定義されていません","すでに定義","引数の数が違います",
        "関数でないもの","ドット参照は構造体","ポインタ型","#includeに該当するファイル名がありません",
        "この型は代入できません",
        "番目にアクセスしようとしました",
        "ReferenceError","目の引数の型が一致しません",
        "を追加し忘れていませんか？",
        "大文字小文字は区別されます",
        "この型同士で演算",
        "ポインタ型に使用できない演算子です","関数でないものに対して関数として呼び出しています",
        "->参照は","にメンバ","演算できません",
        "左辺では関数呼び出しできません",
        "左辺に定数は書けません",
        "breakは繰り返しの中で使います",
        "&の使い方がまちがっています",
        "* はポインタ型にしか使いません",
        "TypeError","関数定義には初期化子を伴うことはできません",
        "関数定義に() がありません","この操作はできません","printfによる出力が多すぎます",
        "実行を停止しました");
        return $mesgs;
    }
    static function add() {
        $mesgs=self::getMesgs();
        $class=Auth::curClass2();
        $r=pdo_exec("select id,raw from log where class=?;",$class->id);
        while ($e=$r->fetch(PDO::FETCH_OBJ)) {
            foreach($mesgs as $m) {
                if (strstr($e->raw, $m)) {
                    pdo_insert("logtag", array("log"=>$e->id,"name"=>"errorType","value"=>$m));
                    echo "$m   ".$e->id."<BR>";
                }
            }
        }
        $r->closeCursor();
        echo "Finish!<BR>";
    }
    static function getAllStdIDs() {
        $class=Auth::curClass2();
        if (!Auth::isTeacherOf($class)) return ;
        $res=pdo_select("select name from `user` where `class`=? ",$class->id);
        $res=array_map(function ($e) { return $e->name; },$res);
        header("Content-type: text/json");
        echo json_encode($res);
    }
    static function getAllLogIDs() {
        $class=Auth::curClass2();
        if (!Auth::isTeacherOf($class)) return ;
        $stdid=param("stdid");
        $since=param("since",0);
        $res=pdo_select("select id from `log` where `class`=? and `user`=? and time>=? order by time",$class->id,$stdid,$since);
        $res=array_map(function ($e) { return $e->id; },$res);
        header("Content-type: text/json");
        echo json_encode($res);
    }
    static function getLastErrorSeqTime() {
        $stdid=param("stdid");
        $class=Auth::curClass2();
        if (!Auth::isTeacherOf($class)) return ;
        $res=pdo_select1("select min(start) as start from errorSeqView where `class`=? and `user`=? and recovery=-1",$class->id,$stdid);
        if (!is_null($res->start)) {
            echo $res->start;
        } else {
            $res=pdo_select1("select max(end) as end from errorSeqView where `class`=? and `user`=? ",$class->id,$stdid);
            if (!is_null($res->end)) {
                echo $res->end;
            } else {
                echo "0";
            }
        }
        //header("Content-type: text/json");
        //echo json_encode($res);

    }
    static function getLog() {
        $logid=param("logid");
        $class=Auth::curClass2();
        if (!Auth::isTeacherOf($class)) return ;
        $res=pdo_select1("select * from `log` where id=?",$logid);
        if ($res->class==$class->id) {
            header("Content-type: text/json");
            echo json_encode($res);
        }
    }
    static function addErrorInfo() {
        $class=Auth::curClass2();
        if (!Auth::isTeacherOf($class)) return ;

        $logid=param("logid");
        $type=param("type");
        $pos=param("pos");
        pdo_update("log","id",array("id"=>$logid,"errorType"=>$type,"errorPos"=>$pos));
        echo "OK";
    }
    static function addSeq() {
        $head=param("head");
        $tail=param("tail");
        $recovery=param("recovery");
        if (pdo_select1("select * from errorSeq where head=? and tail=?",$head,$tail)) {
            pdo_exec("update errorSeq set recovery=? where head=? and tail=?",$recovery,$head,$tail);
        } else {
            pdo_insert("errorSeq",array("head"=>$head,"tail"=>$tail,"recovery"=>$recovery));
        }

    }
}

 ?>
