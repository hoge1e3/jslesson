<?php
req("BigData");
class BigDataController {
    static function find() {
        try {
            if (isset($_GET["url"])) {
                $url=$_GET["url"];
                BigData::selectClassByURL($url);
            }
            $n=$_GET["name"];
            $data1=params("data1");
            $data2=params("data2");
            $data3=params("data3");
            $data4=params("data4");
            $v=BigData::find($n,$data1,$data2,$data3,$data4);
            header("Content-type: text/json");
            echo json_encode($v);
        } catch (Exception $e) {
            echo $e;
        }
    }
    static function add() {
        try {
            if (isset($_GET["url"])) {
                $url=$_GET["url"];
                BigData::selectClassByURL($url);
            }
            $n=$_GET["name"];
            $data1=params("data1");
            $data2=params("data2");
            $data3=params("data3");
            $data4=params("data4");
            if (BigData::looksLikeNum($data1)) $data1=$data1-0;
            if (BigData::looksLikeNum($data2)) $data2=$data2-0;
            if (BigData::looksLikeNum($data3)) $data3=$data3-0;
            if (BigData::looksLikeNum($data4)) $data4=$data4-0;
            BigData::add($n,$data1,$data2,$data3,$data4);
            echo "OK";
        } catch (Exception $e) {
            echo $e;
        }
    }

}
 ?>
