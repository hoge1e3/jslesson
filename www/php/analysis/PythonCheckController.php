<?php
req("RunPythonController","pdo","auth","DateUtil");


class PythonCheckController {
    static function run(){
        req("LogFileToDBController");
        LogFileToDBController::run();
        $c=Auth::curClass2();
        $cn=0;
        $pre=null;
        $outdir=BA_DATA."/mark";
        $fp=null;
        echo "Please wait...<br />\n";
        echo str_pad(" ",4096)."<br />\n";

        //ob_end_flush();
        //ob_start('mb_output_handler');
        foreach (pdo_select_iter("select * from log where class=? order by user, time ",$c->id) as $r) {
            if(!$r) continue;
            if (!isset($r->user)) continue;
            if (!isset($r->time)) continue;
            if (!isset($r->filename)) continue;
            $d=json_decode($r->raw);
            if (!$d) continue;
            if (!isset($d->lang)) continue;
            if ($d->lang!=="C" && $d->lang!=="Python") continue;
            if (!isset($d->detail)) continue;
            if (!isset($d->result)) continue;
            if ($d->result!==$d->lang." Run" &&
                $d->result!==$d->lang." Compile Error") continue;
            $det=$d->detail;
            if (is_string($det)) {
                if ($det==="保存しました") continue;
                if ($det==="実行しました") continue;
            } else if (is_object($det)) {
                //echo print_r($det);
                if (!isset($det->stack)) continue;
                $det=$det->stack;
            } else continue;
            if (!isset($d->code)) continue;
            $code=$d->code;
            if (!isset($code->{$d->lang})) continue;

            $u=$r->user;
            if ($pre!==$u) {
                if ($fp) {
                    echo "$pre DONE<BR/>";
                    ob_flush();
                    flush();
                    fclose($fp);
                }
                $fp=fopen("$outdir/$u.html","w");
                fwrite($fp, "<script src='jquery.js'></script>");
                fwrite($fp, "<script src='index.js'></script>");
                fwrite($fp, "<link rel='stylesheet' href='style.css'/>");
                fwrite($fp, "<h1>$u</h1>");
                $pre=$u;
            }
            if (strlen($det)>10000) {
                $det=substr($det,0,10000);
            }
            fwrite($fp,  "<div class='log'>");
            fwrite($fp,  "<div class='time'>".DateUtil::toString($r->time)."</div>");
            fwrite($fp,  "<div class='file'>".htmlspecialchars($r->filename)."</div>");
            fwrite($fp,  "<pre class='code'>".htmlspecialchars($code->{$d->lang})."</pre>");
            fwrite($fp,  "<pre class='result'>".htmlspecialchars($det)."</pre>");
            fwrite($fp,  "</div>");
            fwrite($fp,  "<hr/>");
            $cn++;
            //if ($cn>=1000) break;

        }
        if ($fp) {
            fclose($fp);
            echo "$pre DONE<BR/>";
            ob_flush();
            flush();
        }
        //RunPythonController::runStr2();

    }
}
