<?php
req("BigData");
class BigDataController {
    static function selectClassByURL() {
        if (isset($_GET["url"])) {
            $url=$_GET["url"];
            BigData::selectClassByURL($url);
        }
    }
    static function find() {
        try {
            self::selectClassByURL();
            $g=$_GET["group"];
            $p=$_GET["practice"];
            $data1=param("data1",null);
            $data2=param("data2",null);
            $data3=param("data3",null);
            $data4=param("data4",null);
            $v=BigData::find($g,$p,$data1,$data2,$data3,$data4);
            header("Content-type: text/json");
            echo json_encode($v);
        } catch (Exception $e) {
            echo $e;
        }
    }
    static function add() {
        try {
            self::selectClassByURL();
            $g=$_GET["group"];
            $p=$_GET["practice"];
            //$n=$_GET["name"];
            $data1=param("data1",null);
            $data2=param("data2",null);
            $data3=param("data3",null);
            $data4=param("data4",null);
            if (BigData::looksLikeNum($data1)) $data1=$data1-0;
            if (BigData::looksLikeNum($data2)) $data2=$data2-0;
            if (BigData::looksLikeNum($data3)) $data3=$data3-0;
            if (BigData::looksLikeNum($data4)) $data4=$data4-0;
            BigData::add($g,$p,$data1,$data2,$data3,$data4);
            echo "OK";
        } catch (Exception $e) {
            echo $e;
        }
    }

}
 ?>
