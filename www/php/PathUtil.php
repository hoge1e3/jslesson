<?php
class PathUtil {
  const SEP="/";
  public static function rel($path, $rel) {
      $path=self::truncSep($path);
      return "$path/$rel";
  }
  static function relPath($path, $base) {
     return substr($path, strlen($base));
  }
  public static function startsWith($path, $prefix) {
    return substr($path, 0, strlen($prefix))==$prefix;
  }
  public static function endsWith($path, $postfix) {
    return substr($path, strlen($path)-strlen($postfix))==$postfix;
  }
  public static function truncSep($path) {
      if (PathUtil::endsWith($path, self::SEP)) {
          return substr($path, 0, strlen($path)-1);
      }
      return $path;
  }
  public static function splitPath($path) {
        $res=explode(self::SEP,$path);
        if ($res[count($res)-1]=="") {
            $res[count($res)-2].=self::SEP;
            array_pop($res);
        }
        return $res;
  }
  public static function up($path) {
        if ($path==self::SEP) return null;
        $ps=PathUtil::splitPath($path);
        array_pop($ps);
        return join(self::SEP,$ps).self::SEP;
  }
}
?>