<?php
require_once __DIR__."/LogUtil.php";
require_once __DIR__."/../PQuery.php";
require_once __DIR__."/../Progress.php";
require_once __DIR__."/../auth.php";
require_once __DIR__."/../fs/NativeFS.php";
require_once __DIR__."/../fs/SFile.php";
require_once __DIR__."/ScoreUtil.php";

$scoreSheetDir=ScoreUtil::$scoreSheetDir;
//$scoreSheetDir=new SFile(new NativeFS("./"),"scoreSheet/");
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
        $l->obj["user"]=$file->name();
        //if ($l->obj["user"]!==$file->name()) throw new Exception("Why!");
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
//$scoreSheetDir=LogUtil::getLogDir()->rel("scoreSheet/");
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
    $buf=<<<EOF
<link rel="stylesheet" href="scoreSheet.css"/>
<script src="jquery-1.10.1.js"></script>
<script src="beautify.js"></script>
<script src="scoreSheet.js"></script>
EOF
;
    $dup=0;$cnt=0;
    foreach ($progs as $p) {
        $d=ScoreUtil::digest($p);
        if (isset($shown[$d])) {$dup++;continue;}
        $shown[$d]=1;
        if (isset($p["filename"])) $fn=$p["filename"]; else $fn="unknown";
        if (isset($p["user"])) $user=$p["user"]; else $user="unknown";
        if (isset($p["date"]) && isset($p["time"])) {
            $time=$p["date"]." ".$p["time"];
        } else $time="unknown";
        $dh=htmlspecialchars($d);
        $buf.=
            "<HR><a href='#".($cnt-1)."'>Prev</a> |".
            "<a href='#".($cnt+1)."'>Next</a>".
            <<<EOF
<span class=form>
<a class=anchor name='$cnt'/>
<input class=diy type=checkbox name=d> D 
<input class=diy type=checkbox name=i> I 
<input class=diy type=checkbox name=y> Y
<button class=check>Check</button>   
<button class=allok>All OK</button>   
com:<input class=com size="80"/>
<div class=digest>$dh</div>
</span>
EOF
.           "<h2>Dist=".$p["dist"]." User=$user Filename=$fn Time=$time </h2>".
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
/*function digest($p) {
    $code=LogUtil::detectProgram($p);
    return digestStr($code);
}
function digestStr($s) {
    if (preg_match('/<script/', $s, $matches, PREG_OFFSET_CAPTURE)) {
        $s=substr($s,$matches[0][1]);
    }
    $s=preg_replace("/\\r/","",$s);
    $s=preg_replace("/\\n/"," ",$s);
    $s=preg_replace_callback("/([0-9A-Za-z_])\\s+([0-9A-Za-z_])/",
    function ($m) {
        return $m[1]."__SPC__".$m[2];
    },$s);
	$s=preg_replace("/\\s+/","",$s);
    $s=preg_replace("/__SPC__/"," ",$s);
    
    $s=preg_replace_callback("/bgcolor\\s*=[\"']?(#?[a-zA-Z0-9]+)[\"']?/",function ($m) {
        return 'bgcolor="COLOR"';
    },$s);
    return $s;
}*/
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