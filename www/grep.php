<?php

require_once __DIR__."/php/auth.php";
require_once __DIR__."/php/fs/NativeFS.php";
if (!Auth::isTeacher()) {
    echo ("Study more!");
    exit(0);
}

$file=$_GET["file"];
$word=$_GET["word"];
$around=100;
if (isset($_GET["around"])) {
    $around=$_GET["around"];
}
$class=Auth::curClass();
if (strpos($file,$class)===FALSE) {
    echo ("Research more! $file $class");
    exit(0);
}
$fs=new NativeFS("./log/");
$lines=explode("\n",$fs->getContent("$file-data.txt"));
$a=array();
$found=FALSE;
foreach($lines as $line) {
    array_push($a,"<code>". mkTimeLink(preg_replace("/ /","&nbsp;",htmlspecialchars ($line) ))."\n</code><BR>");
    if ($found) {
        if (count($a)>$around*2) break;
    } else {
        if (count($a)>$around) array_shift($a);
        if (strpos($line, $word)!==FALSE) {
            array_push($a,"<a name='center'/><font color=red>-----------------------------------</font><BR>");
            $found=TRUE;
        }
    }
}
//header("Content-type: text/plain");
if ($found) {
    echo join("\n",$a);
} else {
    echo "Not found :$word";
}
function mkTimeLink($s) {
    global $file;
    return preg_replace("/[0-9]+-[0-9]+-[0-9]+T[0-9]+:[0-9]+:[0-9]+/",
    "<a href='grep.php?file=$file&word=\\0#center'>\\0</a>",$s);
}
?>