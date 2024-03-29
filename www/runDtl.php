<?php
require_once __DIR__."/php/Modules.php";
require_once __DIR__."/php/dtl/Dtl.php";
require_once __DIR__."/php/dtlfs/DtlFS.php";
require_once __DIR__."/php/dtlfs/DtlSys.php";
require_once __DIR__."/php/dtlfs/DtlParam.php";
require_once __DIR__."/php/ErrorHandler.php";

if (isset($_POST["script"]) || isset($_GET["file"])) {
    $root=Dtl::createEmptyRoot();
    //----Load Builtin Libraries----
    Dtl::initRoot($root);
    DtlFS::initRoot($root);
    DtlSys::initRoot($root);
    //--------------------------
    $root->param=new DtlParam();
    if (isset($_GET["file"])) {
        $scr=$root->FS->getContent($_GET["file"]);
    } else {
        $scr=$_POST["script"];
    }
    $vmc=json_decode($scr, JSON_OBJECT_AS_ARRAY);
    if (isset($_GET["debug"])) {
        DtlThread::$debug=true;
    }

    header("Content-type: text/json; charset=utf8");
    echo json_encode( DtlUtil::unwrap( Dtl::run($root,$vmc) ) );
} else { ?>
    <form action="runDtl.php" method="POST">
    <textarea name="script" rows=10 cols=40>
    </textarea>
    <input type="submit">
    </form>
<?php
}
?>
