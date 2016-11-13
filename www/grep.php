<?php

require_once __DIR__."/php/auth.php";
require_once __DIR__."/php/fs/NativeFS.php";
require_once __DIR__."/php/json.php";
require_once __DIR__."/php/analysis/LogUtil.php";
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
if ($fs->exists("$file-data.txt")) {
    plain($file);
} else if ($fs->exists("$file-data.log")) {
    json($file);
}
function plain($file) {
    global $fs,$word;
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
}
function json($file) {
    global $fs,$word,$around;
    $j=new Services_JSON;
    $a=explode("T",$word);
    $date=preg_replace("/-/","/",$a[0]);
    $time=$a[1];
    echo "$time ---  $date<BR>";
    $lines=explode("\n",$fs->getContent("$file-data.log"));
    $a=array();
    $around=$around/10;
    $found=false;
    foreach($lines as $line) {
        $e=$j->decode($line);
        if ($e) {
            $a[]=toHTML($e);//echo $e["date"]." ".$e["time"]. "<BR>";
            if ($found) {
                if (count($a)>$around*2) break;
            } else {
                if (count($a)>$around) array_shift($a);
                if ($e["date"]==$date && $e["time"]==$time) {
                    array_push($a,"<a name='center'/><font color=red>-----------------------------------</font><BR>");
                    $found=TRUE;
                }
            }
        }
    }
    print join("<BR>",$a);
}
function toHTML($e) {
    $code=$e["code"];
    $c="";$h="";
    if (is_string($code)) $c=$code;
    else {
        foreach (array("Dolittle","JavaScript","C") as $lang) {
            if (isset($code[$lang])) {
                $c.=$code[$lang];
            }
        }
        if (isset($code["HTML"])) {
            $h=$code["HTML"];
        }
    }
    $time=preg_replace("/\\//","-",$e["date"])."T".$e["time"];
    $n=LogUtil::getFileName($e);
    return "<pre>". 
        mkTimeLink($time)."<BR>".
        "<font color=red>".$e["detail"]."</font><BR>".
        "<font color=green>".$e["filename"]."</font><BR>".
        "<font color=blue>Estimated as:".$n."</font><BR>".
        preg_replace("/ /","&nbsp;",htmlspecialchars ($c) )."<br>HTML:<BR>".
        preg_replace("/ /","&nbsp;",htmlspecialchars ($h) )."<BR>".
    "\n</pre><BR>";
            
}
function mkTimeLink($s) {
    global $file;
    return preg_replace("/[0-9]+-[0-9]+-[0-9]+T[0-9]+:[0-9]+:[0-9]+/",
    "<a href='a.php?grep&file=$file&word=\\0#center'>\\0</a>",$s);
}
?>