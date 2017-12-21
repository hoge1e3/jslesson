<?php
req("KeyValue","Published");
class KeyValueController {
    static $group;
    static function detectShareLevel() {
        $sl=param("shareLevel","");
        $url=param($url,NULL);
        if ($url) {
            KeyValue::selectClassByURL($url);
        }
        switch ($sl) {
            case "A":
            break;
            case "C":
            break;
            case "G":
            break;
            default:
            $group="default";
        }
    }

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
            $url=param("url","");
            if ($url) {
                KeyValue::selectClassByURL($url);
            }
            $k=param("key");
            $v=param("value");
            $g=param("group","default");
            KeyValue::put($k,$v,$g);
            echo "OK";
        } catch (Exception $e) {
            echo $e;
        }
    }
    static function ls() {
        $g=param("group","default");
        $r=KeyValue::ls($g);
        header("Content-type: text/json;charset=utf8");
        echo json_encode($r);
    }
    static function info() {
      $r=Published::getRecord(param("url"));
      header("Content-type: text/json;charset=utf8");
      echo json_encode($r);
    }
}
 ?>
