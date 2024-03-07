<?php
class BAURLController {
    static function show() {
        $vars=["BA_TOP_URL","BA_SERVICE_URL","BA_PUB_URL","BA_PUB_URL_IN_TOP"];
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