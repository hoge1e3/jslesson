<?php
req("auth","pdo","JSQN");
class LogAnalysisController {
    static function read() {
        $class=Auth::curClass2();
        if (!$class || !Auth::isTeacherOf($class)) {
            throw new Exception("Do not enter here! absolutely!");
        }
        $j=new JSQN();
        $j->setSchema(array(
            "log"=>array(
                "id"=>"primaryKey",
                "time"=>"integer",
                "user"=>["varchar",32],
                "lang"=>["varchar",32],
                "filename"=>["varchar",255],
                "result"=>["varchar",40],
                "raw"=>"text",
                "class"=>["eq",["str",$class->id]],
            ),
            "logtag"=>array(
                "log"=>["shouldjoin","log","id"]
            ),
            "user"=>array(
                "class"=>["eq",["str",$class->id]],
                "name"=>["varchar",255]
            ),
        ));
        /*$j->setReadPreprocessor(function ($obj) use ($class) {
            if ($obj->from!=="log") throw new Exception("Currenlty, only 'from log' is allowed");
            if (!$obj->where) $obj->where=array("eq","1","1");
            $obj->where=array("and",array("eq",array("field","class"),array("str",$class->id)),$obj->where);
            return $obj;
        });*/
        //echo $_POST["query"];
        foreach ($j->read(json_decode($_POST["query"])) as $r ) {
            var_dump($r);echo "<BR>";
        }
    }
    static function form() {
        ?>
        <form action="?LogAnalysis/read" method="POST">
        <textarea rows=20 cols=80 name="query">
{
    "from": "log",
    "select": [
        "time","class","user"
    ],
    "where": ["eq",["field","user"],["str","someuser"]]
}
        </textarea><BR/>
        <input type=submit>
        </form>
        <?php
    }
}
 ?>
