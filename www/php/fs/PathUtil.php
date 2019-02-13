<?php
class PathUtil {
  const SEP="/";
  public static function resolveDotDot($path) {
      return self::rel("",$path);
  }
  public static function rel($path, $relPath) {
    // echo "rel $path $relPath<BR>";
    if ($relPath=="") return $path;
    $paths=PathUtil::splitPath($relPath);
    $resPath=$path;
    $resPath=self::truncSep($resPath);
    foreach ($paths as $n) {
        //echo "Bfr $n $resPath <BR>";
        if ($n==".." || $n=="../") $resPath=self::up($resPath);
        else {
             $resPath=self::truncSep($resPath);
             $resPath.=self::SEP.($n=="."||$n=="./" ? "": $n);
        }
        //echo "Aft $n $resPath <BR>";
        if (is_null($resPath)) break;
    }
    //echo "rel end $resPath<BR>";
    return $resPath;
  }
  static function relPath($path, $base) {
      if (substr($path,0,strlen($base))!==$base) {
          return "../".self::relPath($path, self::up($base));
      }
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
  public static function ext($path) {
      if (preg_match('/\\.[a-zA-Z0-9]+$/',$path, $matches)) {
          return $matches[0];
      }
      return "";//"NO [$path]".'/\\.[a-zA-Z0-9]+$/';
  }
  public static function truncExt($path) {
        $r=self::name($path);
        $r = preg_replace("/\.[a-zA-Z0-9]+$/","",$r);
        return $r;
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
        if ($path==self::SEP || $path=="") return null;
        $ps=PathUtil::splitPath($path);
        array_pop($ps);
        return join(self::SEP,$ps).self::SEP;
  }
  public static function name($path) {
        $a=self::splitPath($path);
        return array_pop($a);
  }
  public function __toString() {
      return "PathUtil";
  }
}
?>
