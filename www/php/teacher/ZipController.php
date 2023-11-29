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
		Auth::assertTeacher();
		$teacher=Auth::isTeacher2();
		if ($teacher->isSysAd() && param("class",null)) {
			$classid=param("class");
			$class=new BAClass($classid);
		} else {
			die("NO".param("class",3));
			$class=Auth::curClass2();
		}
		$dir=Auth::homeOfClass($class);
		$p=$dir->nativePath();
		$classid=$class->id;
		$work=BA_MIGRATION."/$classid";
		print("Export start: $classid\n");//		ob_flush();flush();
		if (!file_exists($work)) mkdir($work);
		self::exportPub($classid);
		print("Export files: $classid ");
		exec("cp -Ra $p $work/$classid");
		self::exportClassOptions($classid);
		self::exportDB($classid);
		$mi=preg_replace("/\\\\/","/",BA_MIGRATION);
		$work=preg_replace("/\\\\/","/",$work);
		chdir(BA_MIGRATION);
		print("\ntar czvf $classid.tar.gz $classid/\n");
		exec("tar czvf $classid.tar.gz $classid/");
	}
	static function exportClassOptions($classid) {
		$r=pdo_select1("select options from class where id=?",$classid);
		$work=BA_MIGRATION."/$classid";
		file_put_contents("$work/options.json", $r->options);
	}
	static function exportDB($classid) {
		//log
		pdo_enableIter();
		self::exportTable($classid,"log");
		self::exportTable($classid,"user");
		self::exportTable($classid,"published");
		self::exportTable($classid,"role");
		//user
		//published		

	}
	static function exportPub($classid) {
		print("Export published: $classid");		//ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		$pubs=BA_PUB;
		$pubd="$work/pub";
		if (!file_exists($pubd)) mkdir($pubd);
		foreach (pdo_select("select * from published where class=?",$classid) as $r) {
			print($r->url." ");
			exec("cp -Ra $pubs/$r->url $pubd");
		}
		print("\n");
	}
	static function exportTable($classid,$table) {
		print("Export database: $classid.$table \n");	//	ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		$fp=fopen("$work/$table.jsonl","w");
		$c=0;
		foreach (pdo_select_iter("select * from $table where class=?",$classid) as $r) {
			if ($table==="log" && isset($r->id)) unset($r->id);
			if ($c%100==0) print(".");
			$c++;
			fwrite($fp,json_encode($r)."\n");
		}
		fclose($fp);		
	}
	static function import() {
		Auth::assertTeacher();
		$teacher=Auth::isTeacher2();
		if ($teacher->isSysAd() && param("class",null)) {
			$classid=param("class");
			$class=new BAClass($classid);
		} else {
			die("NO class specified ".param("class",""));
			$class=Auth::curClass2();
		}
		$dir=Auth::homeOfClass($class);
		$p=$dir->nativePath();
		$classid=$class->id;
		chdir(BA_MIGRATION);
		$work="$classid";
		$tar="$classid.tar.gz";
		print("Import start: $classid\n");
		if (!file_exists($tar)) {
			die ("$tar is not found");
		}
		print("\ntar xzvf $tar \n");
		exec("tar xzvf $tar ");
		exec("mv $tar $tar.imported.at.".time()); // prevent overwrite by old backup
		self::importPub($classid);
		print("Import files: $work/$classid to $p \n");
		if (!file_exists($p)) mkdir($p);
		exec("cp -Ra $work/$classid/* $p ");
		self::importClassOptions($classid);
		self::importDB($classid);
		//$mi=preg_replace("/\\\\/","/",BA_MIGRATION);
		//$work=preg_replace("/\\\\/","/",$work);
	}
	static function importPub($classid) {
		print("Import published: $classid");		//ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		$pubs="$work/pub";
		$pubd=BA_PUB;
		exec("cp -R $pubs/* $pubd");
		print(" done\n");
	}
	static function importClassOptions($classid) {
		$work=BA_MIGRATION."/$classid";
		$o=file_get_contents("$work/options.json");
		pdo_exec("delete from class where id=?",$classid);
		pdo_exec("insert into class(id,options) values(?,?)", $classid,$o);
	}
	static function importDB($classid) {
		pdo_enableIter();
		self::importTable($classid,"log");
		self::importTable($classid,"user");
		self::importTable($classid,"published");
		self::importTable($classid,"role");
	}
	static function importTable($classid,$table) {
		print("Import database: $classid.$table \n");	//	ob_flush();flush();
		$work=BA_MIGRATION."/$classid";
		pdo_exec("delete from $table where class=?",$classid);
		$fp=fopen("$work/$table.jsonl","r");
		$c=0;
		while (!feof($fp)) {
			$line=fgets($fp);
			$o=json_decode($line);
			if ($o) {
				if ($c%100==0) print(".");
				$c++;
				pdo_insert($table, $o);
			}
		}
		fclose($fp);		
	}

}
?>
