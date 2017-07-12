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
}

 ?>