<?php
require_once __DIR__."/php/dtl/Dtl.php";
require_once __DIR__."/php/json.php";
require_once __DIR__."/php/dtlfs/DtlFS.php";
require_once __DIR__."/php/ErrorHandler.php";

if (isset($_POST["script"])) {
    $scr=$_POST["script"];
    $j=new Services_JSON;
    $vmc=$j->decode($scr);
    $root=Dtl::createEmptyRoot();
    Dtl::initRoot($root);
    DtlFS::initRoot($root);
    header("Content-type: text/json; charset=utf8");
    echo $j->encode( DtlUtil::unwrap( Dtl::run($root,$vmc) ) ); 
} else { ?>
    <form action="dtlfs.php" method="POST">
    <textarea name="script" rows=10 cols=40>
    [["push1", "rootDir"], ["pushi","test.txt"],["send",1,"rel"],
    ["send",0,"getText"],["ret"]]
    </textarea>
    <input type="submit">
    </form>
<?php 
} 
?>