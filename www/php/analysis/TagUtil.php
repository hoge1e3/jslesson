<?php

class TagUtil {
    static $comFile;
    static function add($com) {
        $text=self::$comFile->text();
        $text=preg_replace("/\r/","",$text);
        $lines=explode("\n",$text);
        //print implode("-",$lines);
        $idx=array_search($com, $lines);
        if ($idx===FALSE) {
            self::$comFile->append("$com\n");
        }
    }
    static function tagList($com) {
        $scores=array();
        $tags=explode("，",$com);
        if ($com=="") $tags=array();
        $text=self::$comFile->text();
        $text=preg_replace("/\r/","",$text);
        $lines=explode("\n",$text);
        foreach ($lines as $line) {
            $point=1;
            foreach ($tags as $tag) {
                if (strpos($line,$tag)!==FALSE) {
                    $point*=10;
                }
            }
            $ltags=explode("，",$line);
            foreach ($ltags as $ltag) {
                if (isset($scores[$ltag])) {
                    $scores[$ltag]+=$point;
                } else {
                    $scores[$ltag]=$point;
                }
            }
        }
        foreach ($tags as $tag) {
            unset($scores[$tag]);
        }
        $sorter=array();
        foreach ($scores as $name=>$score) {
            $sorter[]=array("name"=>$name, "score"=>$score);
        }        
        uasort($sorter,function ($a,$b) {
            if ($a["score"]>$b["score"]) return -1;
            if ($a["score"]<$b["score"]) return 1;
            return 0;
        });
        $res=array();
        foreach ($sorter as $e) {
            $res[]=$e["name"];
        }
        return $res;
    }
}
TagUtil::$comFile=new SFile(new NativeFS("./"),"scoreSheet/score/tags/cmt.txt");

?>