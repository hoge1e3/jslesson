<?php
require_once __DIR__."/VecUtil.php";
require_once __DIR__."/LogUtil.php";
require_once __DIR__."/../json.php";
require_once __DIR__."/../PQuery.php";
require_once __DIR__."/../Progress.php";

$get=new PQuery($_GET);
$vecs=array();
$filesLimit=$get->attrDef("filesLimit",1000000000);
$logFiles=LogUtil::getLogFiles();
$cntmax=count($logFiles);
$cnt=0;
foreach ($logFiles as $logFile) {
    showProgress("Process $cnt/$cntmax");
    foreach (LogUtil::readLog($logFile) as $i=>$log) {
        $prog=LogUtil::detectProgram($log);
        $vec=VecUtil::mkvec2($prog);
        $vec->logFile=$logFile;
        $vec->index=$i;
        $vecs[]=$vec;
    }
    if ($cnt++>$filesLimit) break;
}
showProgress("Starting kmeans");
VecUtil::$verbose=1;
$cluster=VecUtil::kmeans($get->attrDef("k",20), $vecs);

$res=array();
foreach ($cluster->centroids as $vec) {
    $res[nameOf($vec)]=$vec->ary;
    //echo json_encode($vec)."<BR>";
}
$logD=LogUtil::getLogDir();
$class=Auth::curClass();
$vecFile=$logD->rel("$class-vector.json");
$vecFile->obj($res);
?>
<script>location.href="a.php?DetectFile";</script>
<?php

function nameOf($vec) {
    /*foreach ($vec->ary as $word=>$freq) {
        
    }*/
    return $vec->label."(".$vec->cnt.")";
}
function newLog() {
    global $vecs;
    $curFile=null;
    foreach($vecs as $vec) {
        $logFile=$vec->logFile;
        if ($curFile==null || $logFile->name() != $curFile->name()) {
            $curFile=$logFile;
            $logD=LogUtil::readLog($logFile);
        }
        
        
    }
}
?>