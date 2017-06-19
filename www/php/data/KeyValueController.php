<?php
req("KeyValue");
class KeyValueController {
    static function get() {
        $k=$_GET["key"];
        $v=KeyValue::get($k);
        if ($v!=null) echo $v;
    }
    static function put() {
        $k=$_GET["key"];
        $v=$_GET["value"];
        KeyValue::put($k,$v);
        echo "OK";
    }

}
 ?>
