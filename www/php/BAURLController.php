<?php
class BAURLController {
    static function show() {
        $vars=["BA_TOP_URL","BA_SERVICE_URL","BA_PUB_URL"];
        $res=[];
        foreach ($vars as $var) {
            if (defined($var)) {
                $res[$var]=constant($var);
            }
        }
        header("Content-type: text/json");
        print(json_encode($res));
    }
}