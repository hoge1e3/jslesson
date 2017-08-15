<?php
req("pdo","auth","DateUtil");
function esc($s) {
	return htmlspecialchars($s);
}
class ErrorSeqController {
	static function rank() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$lim=param("limit",500)-0;
		$sth=pdo_exec("select * from errorSeqView where class=? order by recovery desc limit $lim;",$class->id);
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
		?>
		<script src="js/lib/jquery-1.7.2.js"></script>
		<script src="js/lib/difflib.js"></script>
		<!--script src="js/analysis/scoreSheet.js"></script-->
		<link rel="stylesheet" href="css/scoreSheet.css"/>
		<?php
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$t=Auth::curTeacher();
		$id=param("id");
		$res=pdo_select1("select * from errorSeqView where id=? ;",$id);
		$start=$res->start;
		$end=$res->end;
		$user=$res->user;
		$sth=pdo_exec("select * from log where user=? and time>=? and time<=?",$user,$start,$end);
		$fst=1;
		$lastr;
		while($r=$sth->fetch(PDO::FETCH_OBJ)) {
			if ($fst) {
				echo "<div><a target=prev href='a.php?ErrorSeq/prev&time=".$r->time."&user=$user'>Prev</a></div>\n";
				$fst=0;
			}
			self::item($r,$t);
			//var_dump($r);
			echo "<hR>\n";
			$lastr=$r;
		}
		echo "<div><a target=next href='a.php?ErrorSeq/next&time=".$lastr->time."&user=$user'>Next</a></div>\n";
	}
	static function item($r,$t) {
		$raw=json_decode($r->raw);
		$url="index.html?r=jsl_edit&dir=/home/".$r->class."/".$t->id."/TestC/&autologexec=".$r->id;
		echo "<div class=logitem>";
		echo "<div>".$r->user."</div>";
		echo "<div class=link><a href='$url' target=exe>ID=".$r->id."</a></div>";
		echo "<div class=date>".DateUtil::toString($r->time-0)."</div>";
		echo "<div class=file>".$r->filename."</div>";
		if (isset($raw->code) && isset($raw->code->C)) {
			$pos=$r->errorPos;
			$code=$raw->code->C;
			if ($pos) {
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
			} else {
				$codehere=htmlspecialchars($code);
			}
			echo "<pre class=prog data-pos='$pos'>$codehere</pre>\n";
		}
		echo "</div>";
	}
	static function prev() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$t=Auth::curTeacher();
		$time=param("time");
		$user=param("user");
		$r=pdo_select1("select * from log where time<? and user=? and class=? order by time desc limit 1",$time,$user,$class->id);

		echo "<div><a target=prev href='a.php?ErrorSeq/prev&time=".$r->time."&user=$user'>Prev</a></div>\n";
		self::item($r,$t);
		echo "<div><a target=next href='a.php?ErrorSeq/next&time=".$r->time."&user=$user'>Next</a></div>\n";
	}
	static function next() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$t=Auth::curTeacher();
		$time=param("time");
		$user=param("user");
		$r=pdo_select1("select * from log where time>? and user=? and class=? order by time limit 1",$time,$user,$class->id);
		echo "<div><a target=prev href='a.php?ErrorSeq/prev&time=".$r->time."&user=$user'>Prev</a></div>\n";
		self::item($r,$t);
		echo "<div><a target=next href='a.php?ErrorSeq/next&time=".$r->time."&user=$user'>Next</a></div>\n";
	}
	static function sub() {
		$a="abcあいうdef";
		for ($i=0;$i<10;$i++) {
			echo mb_substr($a,$i,5,"utf8")."<BR>";
		}
	}
}

 ?>
