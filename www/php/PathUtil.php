<?php
class PathUtil {
  const SEP="/";
  public static function rel($path, $rel) {
    return "$path$rel";
  }
  static function relPath($path, $base) {
     return substr($path, strlen($base));
  }
  public static function startsWith($path, $prefix) {

  }
  function splitPath($path) {
        $res=explode(self::SEP,$path);
        if ($res[count($res)-1]=="") {
            $res[count($res)-2].=self::SEP;
            array_pop($res);
        }
        return $res;
  }
  function up($path) {
        if ($path==self::SEP) return null;
        $ps=PathUtil::splitPath($path);
        array_pop($ps);
        return join(self::SEP,$ps).self::SEP;
  }
}
?>