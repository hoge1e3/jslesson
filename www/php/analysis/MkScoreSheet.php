<?php
require_once __DIR__."/LogUtil.php";
require_once __DIR__."/../PQuery.php";
require_once __DIR__."/../Progress.php";
require_once __DIR__."/../auth.php";

$class=Auth::curClass();
$files=LogUtil::getLogFiles();
$progss=array(); // nearest=>[Prog]
$allC=0;$nonError=0;
foreach($files as $file) {
    $log=LogUtil::readLog($file);
    showProgress("Reading... ".$file->name());
    $allC+=count($log);
    foreach($log as $l) {
        $l=new PQuery($l);
        $n=$l->attrDef("nearest","UNKNOWN");
        $l->attr("user", $file->name());
        if (preg_match("/Error/",$l->attrDef("result",""))) {
        } else {
            if (!isset($progss[$n])) {
                $progss[$n]=array();
            }
            $progss[$n][]=$l->obj;
            $nonError++;
        }
    }
}
foreach ($progss as $n=>$progs) {
    $cnt=count($progs);
    echo "$n(Nonerror:$cnt) |";
}
echo "Nonerror/All=$nonError/$allC <HR>";
//exit;
$indexBuf="";
$scoreSheetDir=LogUtil::getLogDir()->rel("scoreSheet/");
foreach ($progss as $n=>$progs) {
    showProgress("Making Scoresheet... $n/".count($progss));
    usort($progs,function ($a,$b) {
        if ($a["dist"]>$b["dist"]) return 1;
        if ($a["dist"]<$b["dist"]) return -1;
        return 0;
    });
    pickIndex($n,$progs[0]);
    //echo "<a name='$n' />";
    //echo "<h1>$n</h1>";
    $shown=array();
    $buf="";$dup=0;$cnt=0;
    foreach ($progs as $p) {
        $d=digest($p);
        if (isset($shown[$d])) {$dup++;continue;}
        $shown[$d]=1;
        if (isset($p["filename"])) $fn=$p["filename"]; else $fn="unknown";
        $buf.=
            "<a href='#".($cnt-1)."'>Prev</a> |".
            "<a name='$cnt'/> ".
            "<a href='#".($cnt+1)."'>Next</a>".
            "<h2>Dist=".$p["dist"]." / Filename=$fn </h2>".
            "<div>result:".$p["result"]."</div>".
            putCode($p);
            $cnt++;
    }
    $buf.="<HR>Duplicates=$dup";
    $scoreSheetDir->rel("$class-$n.html")->text($buf);
}
$scoreSheetDir->rel("$class-index.html")->text($indexBuf);
echo "Done";
echo "Open Log file at local";
function pickIndex($n,$p) {
    global $class, $indexBuf;
    $indexBuf.="<a href='$class-$n.html' target='score'>No. $n</a><BR>";
    $indexBuf.=putCode($p);
    $indexBuf.="<HR>";
}
function digest($p) {
    $code=LogUtil::detectProgram($p);
    return digestStr($code);
}
function digestStr($s) {
    return preg_replace("/\\s+/"," ",$s);
}
function putCode($p) {
    $buf="";
    if (is_array($p["code"])) {
        foreach ($p["code"] as $lang=>$body) {
            $buf.="<h3>$lang</h3>".
            "<pre>".htmlspecialchars($body)."</pre>";
        }
    } else {
        $buf.="<pre>".htmlspecialchars($p["code"])."</pre>";
    }
    return $buf;
}


?>