<?php
req("KeyValue");
class KeyValueController {
    static function get() {
        try {
            $k=$_GET["key"];
            $v=KeyValue::get($k);
            if ($v!=null) echo $v;
        } catch (Exception $e) {
            echo $e;
        }
    }
    static function put() {
        try {
            $k=$_GET["key"];
            $v=$_GET["value"];
            KeyValue::put($k,$v);
            echo "OK";
        } catch (Exception $e) {
            echo $e;
        }
    }

}
 ?>
