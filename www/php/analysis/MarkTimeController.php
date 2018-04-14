<?php
req("NativeFS","SFile","config");
class MarkTimeController {
    static function get() {
        date_default_timezone_set("Asia/Tokyo");
        $d=new SFile(new NativeFS(BA_DATA."/"),"log");
        foreach ($d->listFiles() as $n) {
            if (preg_match("/h.\@.s/",$n->name())) {
                break;
            }
        }
        echo "<table>";
        //echo $n->path();
        foreach ($n->lines() as $s) {
            try {
                $d=json_decode($s);
                if (isset($d->date) && isset($d->targetTime)) {
                    $t=strtotime($d->date); #,DateTime::ATOM)
                    $tt=$d->targetTime/1000;
                    if (preg_match("/1[0-9]j5/",$d->filename)) {
                        echo self::tr(
                            self::td(date("Y/m/d H:i:s",$tt)).
                            self::td(date("Y/m/d H:i:s",$t )).
                            self::td($t-$tt).
                            self::td($d->filename)
                        );
                    }
                }
            } catch(Exception $e) {
                echo $e;
            }
        }
          echo "</table>";

    }
    static function td($s) {
        return "<td>$s</td>";
    }
    static function tr($s) {
        return "<tr>$s</tr>";
    }
    static function kadAvg() {
        date_default_timezone_set("Asia/Tokyo");
        $d=new SFile(new NativeFS(BA_DATA."/"),"log");
        echo "<table>";
        foreach ($d->listFiles() as $n) {
            if (preg_match("/m.i.*pro1.*1[0-9]j5/",$n->name())) {
                self::pickFileTime($n);
            }
        }
        echo "</table>";
    }
    static function pickFileTime($n) {
        foreach ($n->lines() as $s) {
            try {
                $d=json_decode($s);
                if (isset($d->date) && isset($d->time) &&isset($d->filename)) {
                    echo self::tr(self::td($d->date." ".$d->time).self::td($d->filename));
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
    }
}

?>
