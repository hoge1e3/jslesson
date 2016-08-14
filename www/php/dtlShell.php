<?php

require_once __DIR__."/dtl/Dtl.php";
require_once __DIR__."/json.php";
//require_once __DIR__."/dtlfs/DtlFS.php";
require_once __DIR__."/ErrorHandler.php";
require_once __DIR__."/dtlfs/DtlShell.php";
require_once __DIR__."/fs/NativeFS.php";

if ($argc==0) {
    print "dtlShell.php file.dtlvm\n";
    exit(1);
}
$f=new NativeFS();
$scr=$f->getContent($argv[1]);
$j=new Services_JSON;
$vmc=$j->decode($scr);
$root=Dtl::createEmptyRoot();
Dtl::initRoot($root);
$root->Shell=new DtlShell();
//DtlFS::initRoot($root);

echo $j->encode( DtlUtil::unwrap( Dtl::run($root,$vmc) ) ); 

?>