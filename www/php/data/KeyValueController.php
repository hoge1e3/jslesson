<?php
req("KeyValue");
class KeyValueController {
    static function get() {
        try {
            if (isset($_GET["url"])) {
                $url=$_GET["url"];
                KeyValue::selectClassByURL($url);
            }
            $k=$_GET["key"];
            $g=param("group","default");
            $v=KeyValue::get($k,$g);
            if ($v!=null) echo $v;
        } catch (Exception $e) {
            echo $e;
        }
    }
    static function put() {
        try {
            if (isset($_GET["url"])) {
                $url=$_GET["url"];
                KeyValue::selectClassByURL($url);
            }
            $k=$_GET["key"];
            $v=$_GET["value"];
            $g=param("group","default");
            KeyValue::put($k,$v,$g);
            echo "OK";
        } catch (Exception $e) {
            echo $e;
        }
    }

}
 ?>
