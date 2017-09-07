<?php
req("auth");
class ZipController {
	static function download() {
		$class=Auth::curClass2();
		Auth::assertTeacher();
		$dir=Auth::homeOfClass($class);
		$p=$dir->nativePath();
		$classid=$class->id;
		chdir ($p);
		$fb="$classid.zip";
		$f="/tmp/$fb";
		$res=exec ("zip -r $f .");
		//echo $res;
		header("Content-type: application/zip");
		header("Content-disposition: attachment; filename=$fb");
		readfile($f);
		unlink($f);
	}
}
?>
