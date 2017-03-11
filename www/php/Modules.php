<?php
$mod_aliases=array(
    //----AUTOGEN
    'AddScoreInfo' => 'php/analysis/AddScoreInfo.php',
    'DetectFile' => 'php/analysis/DetectFile.php',
    'LogUtil' => 'php/analysis/LogUtil.php',
    'MkCluster' => 'php/analysis/MkCluster.php',
    'MkScoreSheet' => 'php/analysis/MkScoreSheet.php',
    'Mkvec' => 'php/analysis/Mkvec.php',
    'Score' => 'php/analysis/Score.php',
    'ScoreUtil' => 'php/analysis/ScoreUtil.php',
    'TagUtil' => 'php/analysis/TagUtil.php',
    'TagVsCluster' => 'php/analysis/TagVsCluster.php',
    'VecUtil' => 'php/analysis/VecUtil.php',
    'auth' => 'php/auth.php',
    'JSONLines' => 'php/data/JSONLines.php',
    'PData' => 'php/data/PData.php',
    'pdo' => 'php/data/pdo.php',
    'Dtl' => 'php/dtl/Dtl.php',
    'DtlArray' => 'php/dtl/DtlArray.php',
    'DtlBlock' => 'php/dtl/DtlBlock.php',
    'DtlBool' => 'php/dtl/DtlBool.php',
    'DtlNumber' => 'php/dtl/DtlNumber.php',
    'DtlObj' => 'php/dtl/DtlObj.php',
    'DtlString' => 'php/dtl/DtlString.php',
    'DtlThread' => 'php/dtl/DtlThread.php',
    'DtlUtil' => 'php/dtl/DtlUtil.php',
    'test' => 'php/dtl/test.php',
    'DtlAuth' => 'php/dtlfs/DtlAuth.php',
    'DtlFS' => 'php/dtlfs/DtlFS.php',
    'DtlParam' => 'php/dtlfs/DtlParam.php',
    'DtlShell' => 'php/dtlfs/DtlShell.php',
    'DtlSys' => 'php/dtlfs/DtlSys.php',
    'dtlShell' => 'php/dtlShell.php',
    'dump' => 'php/dump.php',
    'dump2' => 'php/dump2.php',
    'dumpN' => 'php/dumpN.php',
    'ErrorHandler' => 'php/ErrorHandler.php',
    'AuthInfo' => 'php/fs/AuthInfo.php',
    'NativeFS' => 'php/fs/NativeFS.php',
    'PathUtil' => 'php/fs/PathUtil.php',
    'Permission' => 'php/fs/Permission.php',
    'SFile' => 'php/fs/SFile.php',
    'test' => 'php/fs/test.php',
    'getDirInfoLib' => 'php/getDirInfoLib.php',
    'json' => 'php/json.php',
    'logout' => 'php/logout.php',
    'Modules' => 'php/Modules.php',
    'MySession' => 'php/MySession.php',
    'PQuery' => 'php/PQuery.php',
    'Progress' => 'php/Progress.php',
    'runit' => 'php/runit.php',
    'LoginController' => 'php/user/LoginController.php',
    'ClassController' => 'php/teacher/ClassController.php',
    'ResetController' => 'php/teacher/ResetController.php',
    'ResetRequests' => 'php/teacher/ResetRequests.php',
    'TeacherController' => 'php/teacher/TeacherController.php',
    'sessiontest' => 'php/test/sessiontest.php',
    'test' => 'php/test/test.php',
    'BAClass' => 'php/user/BAClass.php',
    'BAUser' => 'php/user/BAUser.php',
    'index' => 'php/websock/index.php',
    'info' => 'php/websock/info.php',
    'server' => 'php/websock/server.php',
    //----/AUTOGEN
    'foo' =>'bar'
);
function req() {
    global $mod_aliases;
    $args=func_get_args();
    foreach ($args as $a) {
        if (!isset($mod_aliases[$a])) {
            throw new Exception("module $a is not defined");
        } 
        require_once $mod_aliases[$a]; 
    }
}
if (isset($_GET["foefosjvoisdjove9"])) {
    require_once "php/fs/NativeFS.php";
    require_once "php/fs/SFile.php";
    $fs=new NativeFS(".");
    $phpf=new SFile($fs,"php/");
    header("Content-type: text/plain");
    foreach ($phpf->recursive() as $f) {
        if ($f->endsWith(".php")) {
            $n=$f->truncExt();
            echo "    '$n' => '".$f->path()."',\n";
        }
    }
}
?>