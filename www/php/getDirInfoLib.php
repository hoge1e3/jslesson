<?php
function isExcludedPath($relPath, $excludes) {
    foreach ($excludes as $e) {
        if (strpos($relPath, $e)!==FALSE) {
            return true;
        }
    }
    return false;
}
function getDirInfo2($path, $base, $excludes=array()) {
    global $fs;
    $dst=array();
    if (!$fs->exists($path)) return $dst;
    $files=$fs->ls($path);
    foreach ($files as $e) {
        $fp=PathUtil::rel($path, $e);
        $relPath=PathUtil::relPath( $fp,$base );
        if (isExcludedPath($relPath, $excludes)) continue;
        if ($fs->isDir($fp)) {
            $dst+=getDirInfo2($fp, $base, $excludes);
        } else {
            $dst[$relPath]=$fs->getMetaInfo($fp);
            //$dst+=array( PathUtil::relPath( $fp,$base ) => $fs->getMetaInfo($fp) );
        }
    }
    return $dst;
}
function getDirInfo($path,$excludes=array()) {
    $data=getDirInfo2($path,$path, $excludes);
    return array("base"=>$path, "data"=>$data);
}
?>
