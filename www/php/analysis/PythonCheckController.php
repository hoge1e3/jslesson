<?php
req("RunPythonController","pdo","auth");


class PythonCheckController {
    static function run(){
        $c=Auth::curClass2();
        $cn=0;
        foreach (pdo_select_iter("select * from log where class=?",$c->id) as $r) {
            if(!$r) continue;
            $d=json_decode($r->raw);
            if (!$d) continue;
            if (!isset($d->lang)) continue;
            if ($d->lang!=="C" && $d->lang!=="Python") continue;
            if (!isset($d->detail)) continue;
            if (!isset($d->result)) continue;
            if ($d->result!==$d->lang." Run" &&
                $d->result!==$d->lang." Compile Error") continue;
            $det=$d->detail;
            if (!is_string($det)) continue;
            if ($det==="保存しました") continue;
            if ($det==="実行しました") continue;
            if (!isset($d->code)) continue;
            $code=$d->code;
            if (!isset($code->{$d->lang})) continue;
            echo "<pre>".htmlspecialchars($code->{$d->lang})."</pre>";
            echo "<pre>".htmlspecialchars($det)."</pre>";
            echo "<hr/>";
            $cn++;
            if ($cn>=100) break;

        }

        //RunPythonController::runStr2();

    }
}
