<textarea rows=30 cols=80><?php
require_once __DIR__."/ScoreUtil.php";
require_once __DIR__."/LogUtil.php";
require_once __DIR__."/TagUtil.php";

$fs=LogUtil::getLogFiles();
foreach ($fs as $f) {
    $ls=LogUtil::readLog($f);
    foreach ($ls as $i=>$l) {
    	/*if (isset($l["nearest"])) {
    		$cluster=$l["nearest"];
			echo "$f\t$cluster\tNumOfCluster\n";
    	}*/
    	if (isset($l["result"]) && strpos($l["result"],"Error")!==FALSE) {
    	    continue;
    	}
    	if (
    	isset($l["score"]) && 
    	isset($l["score"]["com"]) && 
    	isset($l["nearest"])) {
			$tags=TagUtil::com2tags($l["score"]["com"]);
			$cluster=$l["nearest"];
			echo $f->name().":$i\t$cluster\tNumOfCluster\n";
			foreach ($tags as $tag) {
				echo $f->name().":$i\t$cluster\t$tag\n";
			}
		} else if (isset($l["nearest"])) {
			$cluster=$l["nearest"];
			echo $f->name().":$i\t$cluster\tNumOfCluster\n";
			echo $f->name().":$i\t$cluster\tNotCommentedYet\n";
		}
	}
}
?></textarea>
