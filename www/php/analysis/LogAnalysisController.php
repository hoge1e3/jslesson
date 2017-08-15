<?php
req("auth","pdo","JSQN","DateUtil");
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
    static function outtime() {
        $class=Auth::curClass2();
        Auth::assertTeacher();
        $t=Auth::curTeacher();
        $outtimes=explode(",",param("outtimes"));
        $outtimes=array_map(function ($e) {
        	return $e-0;
        },$outtimes);
        $outtimes=implode(",",$outtimes);
        $user=param("user");
    	$q=<<<EOF
select *
from 
  (select *, floor((time mod (7*86400))/3600) as t
  from log where class=? and user=?
  ) as temp
where t not in ($outtimes) order by time;
    	
EOF;

		$sth=pdo_exec($q,$class->id,$user);
		while($r=$sth->fetch(PDO::FETCH_OBJ)) {
			$raw=json_decode($r->raw);
			$url="index.html?r=jsl_edit&dir=/home/".$class->id."/".$t->id."/TestC/&autologexec=".$r->id;
			echo "<div class=logitem>";
			echo "<div class=link><a href='$url' target=exe>ID=".$r->id."</a></div>";
			echo "<div class=date>".DateUtil::toString($r->time-0)."</div>";
			echo "<div class=file>".$r->filename."</div>";
			echo "<div class=errorType>".$r->errorType."</div>";
			/*if (isset($raw->code) && isset($raw->code->C)) {
				$pos=$r->errorPos;
				//echo "pos=".."<BR>";
				$code=$raw->code->C;
				$codehere=htmlspecialchars(mb_substr($code,0,$pos,"utf8")).
				"<img src='images/ecl.png'/>".htmlspecialchars(mb_substr($code,$pos,null,"utf8"));
				//$codehere.=" len ".strlen($code)." pos $pos";
				if (isset($r->detail)) {
					$dd=json_decode($r->detail);
					if ($dd && isset($dd->stack))  {
						echo "<pre class=stack>".htmlspecialchars($dd->stack)."</pre>";
					}
					//if ($dd && isset($dd->errorParams) && isset($dd->errorType))  {
						//echo $dd->errorType."  ".implode(",",$dd->errorParams);
					//}
				}
				echo "<pre class=prog>$codehere</pre>\n";
			}*/
			echo "</div>";
			//var_dump($r);
			echo "<hR>\n";
		}
    }
}
 ?>
