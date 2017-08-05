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
				if ($raw->code && isset($raw->code->C)) {
					if (pdo_find1("logtag",array("log"=>$o->id,"name"=>"gccres"))) {
						//continue;
					}
					print "<pre>".$raw->code->C."</pre>\n";
					$f->rel("test.c")->text($raw->code->C);
					$end=$f->rel("end.txt");
					if ($end->exists()) $end->rm();
					echo "[".exec("sh perl/gcc.sh")."]";
					#echo "[".exec("cmd.exe /c perl\\gcc.bat")."]";
					while(!$end->exists()) {
						usleep(100);
					}
					$val="Unknown";
					if ($f->rel("test.exe")->exists() ){
						$val="OK";//$res.="[OK]";
					}
					$err=$f->rel("err.txt");
					$det=$err->text();
					if ($det) {
						if ($val=="OK") $val="warning";
						else $val="error";
					}
					//$res=mb_substr($res,0,250);
					//echo "$res\n".strlen($res);
					pdo_insertOrUpdate("logtag",
						array("log"=>$o->id,"name"=>"gccres"),
						array("value"=>$val,"detail"=>$det)
					);
				}
			}
			$cnt++;
			//if ($cnt>5000) break;
		}
		//$sth->close();
	}

}

 ?>
