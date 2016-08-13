<?php 
require_once __dir__."/../fs/NativeFS.php";
require_once __dir__."/../fs/Permission.php";
require_once __dir__."/../fs/SFile.php";
require_once __dir__."/../dtl/Dtl.php";
require_once __dir__."/DtlSys.php";
require_once __dir__."/DtlAuth.php";
class DtlFS {
    public static function initRoot($root) {
        /*$ap=new Permission(null);
        $fs=new NativeFS("./php/tmp/");
        $rootDir=new SFile($fs,"/");
        *///$root=Dtl::init();
        $root->auth=new DtlAuth();
        $root->homeDir=$root->auth->homeDir();
        //$root->system=new DtlSys($root,$rootDir->rel("scripts/"));
        //$root->rootDir=$rootDir;
        return $root;
    }
}
?>