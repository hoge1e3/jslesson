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
                "time"=>"date",
                "user"=>["varchar",32],
                "lang"=>["varchar",32],
                "filename"=>["varchar",255],
                "result"=>["varchar",40],
                "raw"=>"json",
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
        $flds=array();
        echo "<table>";
        foreach ($j->read(json_decode($_POST["query"])) as $r ) {
            $row=array();
            if (isset($r->time)) {
                req("DateUtil");
                $t=$r->time-0;
                $r->date=DateUtil::toString($t,"Y/m/d");
                $r->time=DateUtil::toString($t,"H:i:s");
            }
            if (isset($r->filename) && is_string($r->filename)) {
                if (preg_match("/SERVER.ERROR/",$r->filename)) $r->filename="ERROR";
            }

            foreach ($r as $k=>$v) {
                if ($k==="raw") {
                    $raw=json_decode($v);
                    if ($raw && isset ($raw->detail) && is_string($raw->detail)) {
                        //if (preg_match("^Error",$raw->detail)) {
                            $v=$raw->detail;
                        //}
                    }
                    $v=substr($v,0,200);
                }
                if (!isset($flds[$k])) {
                    $flds[$k]=count($flds);
                }
                $row[$flds[$k]]=$v;
            }
            echo "<tr><td>".implode("</td><td>",$row)."</td></tr>\n";
            //var_dump($r);echo "<BR>";
        }
        echo "</table>";
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
