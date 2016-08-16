<?php
require_once __DIR__."/php/dtl/Dtl.php";
require_once __DIR__."/php/json.php";
require_once __DIR__."/php/dtlfs/DtlFS.php";
require_once __DIR__."/php/dtlfs/DtlSys.php";
require_once __DIR__."/php/ErrorHandler.php";

if (isset($_POST["script"]) || isset($_GET["file"])) {
    $root=Dtl::createEmptyRoot();
    Dtl::initRoot($root);
    DtlFS::initRoot($root);
    DtlSys::initRoot($root);
    if (isset($_GET["file"])) {
        $scr=$root->FS->getContent($_GET["file"]);
    } else {
        $scr=$_POST["script"];
    }
    $j=new Services_JSON;
    $vmc=$j->decode($scr);

    header("Content-type: text/json; charset=utf8");
    echo $j->encode( DtlUtil::unwrap( Dtl::run($root,$vmc) ) ); 
} else { ?>
    <form action="runDtl.php" method="POST">
    <textarea name="script" rows=10 cols=40>
    </textarea>
    <input type="submit">
    </form>
<?php 
} 
?>