<?php
req("pdo","Auth","SFile","NativeFS");
class RunGccController {
	static function run(){
		//pdo_insertOrUpdate("logtag",array("log"=>19049,"name"=>"test"),array("value"=>"testval3"));
		//return;
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$cnt=0;
		$f=new SFile(new NativeFS("perl/"),"");
		$sth=pdo_exec("select * from log where class=? and lang='C'",$class->id);
		while($o=$sth->fetch(PDO::FETCH_OBJ)) {
			if (is_string($o->raw)) {
				$raw=json_decode($o->raw);
				if ($raw->code && $raw->code->C) {
					if (pdo_find1("logtag",array("log"=>$o->id,"name"=>"gccres"))) {
						continue;
					}
					print "<pre>".$raw->code->C."</pre>\n";
					$f->rel("test.c")->text($raw->code->C);
					$end=$f->rel("end.txt");
					if ($end->exists()) $end->rm();
					#echo "[".exec("sh perl/gcc.sh")."]";
					echo "[".exec("cmd.exe /c perl\\gcc.bat")."]";
					while(!$end->exists()) {
						usleep(100);
					}
					$res="";
					if ($f->rel("test.exe")->exists() ){
						$res.="[OK]";
					}
					$err=$f->rel("err.txt");
					$res.=$err->text();
					pdo_insertOrUpdate("logtag",
						array("log"=>$o->id,"name"=>"gccres"),
						array("value"=>$res)
					);
					echo "<pre>$res</pre>\n";
				}
			}
			$cnt++;
			if ($cnt>5) break;
		}
		//$sth->close();
	}

}

 ?>
