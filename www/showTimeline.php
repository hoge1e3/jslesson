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
require_once __DIR__."/php/fs/NativeFS.php";
$min=("2016-04-01T00:00:00");
$max=("2016-08-01T00:00:00");

if (isset($_GET["min"])) {
    $min=$_GET["min"];
}
if (isset($_GET["max"])) {
    $max=$_GET["max"];
}
echo "setRange('$min','$max');\n";
$fs=new NativeFS("./log/");
foreach ($fs->ls("/") as $n) {
    $n="/$n";
    if (preg_match("/-data-time/",$n)) {
        $er=preg_replace("/-data-time/","-data-error",$n);
        if ($fs->exists($er)) {
            readLog($n,$er);
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
        if ($tline>=$min && $tline<=$max) {
            echo("showLine('$tline');\n");
        }
    }
    echo ("setColor('red');\n");
    $elines=explode("\n",$fs->getContent($error));
    foreach($elines as $eline) {
        if ($eline>=$min && $eline<=$max) {
            echo("showLine('$eline');\n");
        }
    }
    echo ("});\n");
    
}
?></script>
