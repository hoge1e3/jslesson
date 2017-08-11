<?php
req("pdo","auth","DateUtil");
function esc($s) {
	return htmlspecialchars($s);
}
class ErrorSeqController {
	static function rank() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$lim=param("limit",500);
		$sth=pdo_exec("select * from errorSeqView where class=? order by recovery desc limit ?;",$class->id,$lim);
		echo "<table>";
		while($r=$sth->fetch(PDO::FETCH_OBJ)) {
			// { ["id"]=> string(2) "69" ["head"]=> string(5) "40383" ["tail"]=> string(5) "40384" ["recovery"]=> string(7) "1734775" ["class"]=> string(12) "meisei17pro1" ["user"]=> string(4) "hori" ["start"]=> string(10) "1491463726" ["end"]=> string(10) "1491539491" ["duration"]=> string(5) "75765" }
		 	$a=array( "<a target=view href='a.php?ErrorSeq/view&id=".$r->id."''>".$r->id."</a>",
			 $r->user ,  $r->recovery, $r->duration,$r->start,$r->end);
			//var_dump($r);
			echo "<tr><td>".implode("</td><td>",$a)."</td></tr>\n";
		}
		echo "</table>";
	}
	static function view() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$t=Auth::curTeacher();
		$id=param("id");
		$res=pdo_select1("select * from errorSeqView where id=? ;",$id);
		$start=$res->start;
		$end=$res->end;
		$user=$res->user;
		$sth=pdo_exec("select * from log where user=? and time>=? and time<=?",$user,$start,$end);
		while($r=$sth->fetch(PDO::FETCH_OBJ)) {
			$raw=json_decode($r->raw);
			$url="index.html?r=jsl_edit&dir=/home/".$class->id."/".$t->id."/TestC/&autologexec=".$r->id;
			echo "<div class=logitem>";
			echo "<div class=link><a href='$url' target=exe>ID=".$r->id."</a></div>";
			echo "<div class=date>".DateUtil::toString($r->time-0)."</div>";
			if (isset($raw->code) && isset($raw->code->C)) {
				$pos=$r->errorPos;
				//echo "pos=".."<BR>";
				$code=$raw->code->C;
				$codehere=esc(mb_substr($code,0,$pos,"utf8")).
				"<img src='images/ecl.png'/>".esc(mb_substr($code,$pos,null,"utf8"));
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
			}
			echo "</div>";
			//var_dump($r);
			echo "<hR>\n";
		}
	}
	static function sub() {
		$a="abcあいうdef";
		for ($i=0;$i<10;$i++) {
			echo mb_substr($a,$i,5,"utf8")."<BR>";
		}
	}
}

 ?>
