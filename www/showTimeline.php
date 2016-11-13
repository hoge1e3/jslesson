<body>
<table id="tl">
    <tr><td>ユーザID</td><td>
        <canvas id="scale" width="800px" height="30px"></canvas>
    </td></tr>
</table>    
</body>
<script src="js/lib/jquery-1.12.1.js"></script>
<script src="js/ide/showTimeline.js"></script>
<?php
require_once __DIR__."/php/json.php";
require_once __DIR__."/php/auth.php";
require_once __DIR__."/php/fs/NativeFS.php";
require_once __DIR__."/php/fs/PathUtil.php";
require_once __DIR__."/php/analysis/LogUtil.php";
if (!Auth::isTeacher()) {
    echo ("<script>alert('study more!');</script>");
    exit(0);
}
date_default_timezone_set("Asia/Tokyo");
$min=date('Y-m-d\TH:i:s',strtotime("-4 week"));;
$max=date('Y-m-d\TH:i:s');

if (isset($_GET["min"])) {
    $min=$_GET["min"];
}
if (isset($_GET["max"])) {
    $max=$_GET["max"];
}
$class=Auth::curClass();
echo "<script>setRange('$min','$max');\n</script>";
$fs=new NativeFS("./log/");
foreach ($fs->ls("/") as $n) {
    $n="/$n";
    if (strpos($n,$class)!=FALSE) {
        if (preg_match("/-data-time/",$n)) {
            $er=preg_replace("/-data-time/","-data-error",$n);
            if ($fs->exists($er)) {
                readLog($n,$er);
            }
        } else if (preg_match("/-data.log/",$n)) {
            readJSONLog($n);
        }
    }
}

function readLog($time, $error) {
    global $fs,$min,$max;
    echo ("<script>queue.push(function () {\n");
    echo ("setUser('$time');\n");
    echo ("setColor('green');\n");
    $tlines=explode("\n",$fs->getContent($time));
    foreach($tlines as $tline) {
        $tline=preg_replace("/\r/","",$tline);
        if ($tline>=$min && $tline<=$max) {
            echo("showLine('$tline');\n");
        }
    }
    echo ("setColor('red');\n");
    $elines=explode("\n",$fs->getContent($error));
    foreach($elines as $eline) {
        $eline=preg_replace("/\r/","",$eline);
        if ($eline>=$min && $eline<=$max) {
            echo("showLine('$eline');\n");
        }
    }
    echo ("});</script>\n");
    
}
function readJSONLog($file) {
    global $fs,$min,$max;
    $tlines=explode("\n",$fs->getContent($file));
    $j=new Services_JSON;
    echo ("<script>queue.push(function () {\n");
    echo ("setUser('$file');\n");
    $es=array();
    foreach($tlines as $tline) {
        $e=$j->decode($tline);
        if ($e) {
            if (isset($e["result"]) && strpos($e["result"],"Error")) {
                $e["isError"]=true;
            } else {
                $e["isError"]=false;
            }
            $e["tltime"]=preg_replace("/\\//","-",$e["date"])."T".$e["time"];
            $es[]=$e;
        }
    }
    echo ("setColor('green');\n");
    foreach($es as $e) {
        if (!$e["isError"]) {
            $tltime=$e["tltime"];
            $fname=LogUtil::getFileName($e);
            echo("showLine('$tltime','$fname');\n");
        }
    }    
    echo ("setColor('red');\n");
    foreach($es as $e) {
        if ($e["isError"]) {
            $tltime=$e["tltime"];
            $fname=LogUtil::getFileName($e);
            echo("showLine('$tltime','$fname');\n");
        }
    }    
    echo ("});</script>\n");
}
?>
