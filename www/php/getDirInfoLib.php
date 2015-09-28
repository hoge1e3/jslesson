<?php
function getDirInfo2($path, $base) {
    global $fs;
    $dst=array();
    if (!$fs->exists($path)) return $dst;
    $files=$fs->ls($path);
    foreach ($files as $e) {
        $fp=PathUtil::rel($path, $e);
        if ($fs->isDir($fp)) {
            $dst+=getDirInfo2($fp, $base);
        } else {
            $dst[PathUtil::relPath( $fp,$base )]=$fs->getMetaInfo($fp);
            //$dst+=array( PathUtil::relPath( $fp,$base ) => $fs->getMetaInfo($fp) );
        }
    }
    return $dst;
}
function getDirInfo($path) {
    $data=getDirInfo2($path,$path);
    return array(base=>$path, data=>$data);
}
?>