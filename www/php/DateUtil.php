<?php
date_default_timezone_set("Asia/Tokyo");
class DateUtil {
    static function toString($d=null,$format="Y-m-d H:i:s") {
        if (!$d) $d=self::now();
        if (is_int($d) || self::looksLikeInt($d)) {
            $da=new DateTime();
            $da->setTimeStamp($d-0);
            return $da->format($format);
        }
        return $d;
    }
    static function looksLikeInt($s) {
        return preg_match('/^[0-9]+$/',$s);
    }
    static function toDayTop($d=null) {
        if (!$d) $d=self::now();
        $s=self::toString($d);
        // yyyy-mm-dd hh:mm:ss
        // yyyy-mm-dd
        return self::toInt(substr($s,0,strlen($s)-9));
    }
    static function toInt($d, $format="Y-m-d H:i:s") {
        if (is_string($d)) {
            if(self::looksLikeInt($d)) return $d-0;
            $d=preg_replace("/\\//","-",$d);
            if (preg_match("/^[0-9]+-[0-9]+-[0-9]+$/",$d)) {
                $d="$d 00:00:00";
            }
            $da=DateTime::createFromFormat($format,$d);
            //echo var_dump( DateTime::getLastErrors () );
            return $da->getTimeStamp();
        }
        return $d;
    }
    static function getYear($d) {
        $s=self::toString($d);
        return substr($s,0,4)-0;
    }
    static function getMonth($d) {
        $s=self::toString($d);
        return substr($s,5,2)-0;
    }
    static function getDay($d) {
        $s=self::toString($d);
        return substr($s,8,2)-0;
    }
    static function getHour($d) {
        $s=self::toString($d);
        return substr($s,11,2)-0;
    }
    static function getMinute($d) {
        $s=self::toString($d);
        return substr($s,14,2)-0;
    }
    static function getSecond($d) {
        $s=self::toString($d);
        return substr($s,17,2)-0;
    }
    static function getDayOfWeek($d) {
        $i=self::toInt($d);
        return date("D",$i);
    }
    static function now() {
        return time();
    }
}
/*
$i=DateUtil::toInt("2017/04/14 15:00:09");
echo $i." ".time()."<BR>";
echo DateUtil::toString($i);
$i=time();
$s=DateUtil::toString($i);
echo "$s $i<BR>";
echo DateUtil::getYear($s)."  ";
echo DateUtil::getMonth($s)."  ";
echo DateUtil::getDay($s)."  ";
echo DateUtil::getHour($s)."  ";
echo DateUtil::getMinute($s)."  ";
echo DateUtil::getSecond($s)."  ";
echo DateUtil::getDayOfWeek($s)."  ";
echo "<BR>";
echo DateUtil::getYear($i)."  ";
echo DateUtil::getMonth($i)."  ";
echo DateUtil::getDay($i)."  ";
echo DateUtil::getHour($i)."  ";
echo DateUtil::getMinute($i)."  ";
echo DateUtil::getSecond($i)."  ";
echo DateUtil::getDayOfWeek($i)."  ";

*/
?>
