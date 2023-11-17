<?php
req("auth","pdo");
class ZipController {
	static function download($keep=false) {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$dir=Auth::homeOfClass($class);
		$p=$dir->nativePath();
		$classid=$class->id;
		chdir ($p);
		$fb="$classid.zip";
		$f="/tmp/$fb";
		$res=exec ("zip -r $f .");
		if ($keep) return $f;
		//echo $res;
		header("Content-type: application/zip");
		header("Content-disposition: attachment; filename=$fb");
		readfile($f);
		unlink($f);
	}
	static function export() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$dir=Auth::homeOfClass($class);
		$p=$dir->nativePath();
		$classid=$class->id;
		$work=BA_MIGRATION."/$classid";
		//print("Export start: $classid<BR>");		ob_flush();flush();
		if (!file_exists($work)) mkdir($work);
		self::copyPub($classid);
		print("Copy files: $classid ");
		exec("cp -Ra $p $work/$classid");
		self::copyDB($classid);
	}
	static function copyDB($classid) {
		//log
		pdo_enableIter();
		self::copyTable($classid,"log");
		self::copyTable($classid,"user");
		self::copyTable($classid,"published");
		//user
		//published		

	}
	static function copyPub($classid) {
		//print("Copy published: $classid");		ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		$pubs=BA_PUB;
		$pubd="$work/pub";
		if (!file_exists($pubd)) mkdir($pubd);
		foreach (pdo_select("select * from published where class=?",$classid) as $r) {
			exec("cp -Ra $pubs/$r->url $pubd");
		}
		print("<BR>");
	}
	static function copyTable($classid,$table) {
		//print("Copy database: $classid.$table <BR>");		ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		$fp=fopen("$work/$table.jsonl","w");
		foreach (pdo_select("select * from $table where class=?",$classid) as $r) {
			if (isset($r->id)) unset($r->id);
			fwrite($fp,json_encode($r)."\n");
		}
		fclose($fp);		
	}
}
?>
