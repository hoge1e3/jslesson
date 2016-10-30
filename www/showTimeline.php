<body>
<table id="tl">
    <tr><td>ユーザID</td><td>
        <canvas id="scale" width="800px" height="30px"></canvas>
    </td></tr>
</table>    
</body>
<script src="js/lib/jquery-1.12.1.js"></script>
<script src="js/ide/showTimeline.js"></script>
<script><?php
require_once __DIR__."/php/json.php";
require_once __DIR__."/php/auth.php";
require_once __DIR__."/php/fs/NativeFS.php";
if (!Auth::isTeacher()) {
    echo ("alert('study more!');</script>");
    exit(0);
}
$min=("2016-04-01T00:00:00");
$max=("2016-08-24T00:00:00");

if (isset($_GET["min"])) {
    $min=$_GET["min"];
}
if (isset($_GET["max"])) {
    $max=$_GET["max"];
}
$class=Auth::curClass();
echo "setRange('$min','$max');\n";
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
    echo ("queue.push(function () {\n");
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
    echo ("});\n");
    
}
function readJSONLog($file) {
    global $fs,$min,$max;
    $tlines=explode("\n",$fs->getContent($file));
    $j=new Services_JSON;
    echo ("queue.push(function () {\n");
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
            echo("showLine('$tltime');\n");
        }
    }    
    echo ("setColor('red');\n");
    foreach($es as $e) {
        if ($e["isError"]) {
            $tltime=$e["tltime"];
            echo("showLine('$tltime');\n");
        }
    }    
    echo ("});\n");
}
?></script>
