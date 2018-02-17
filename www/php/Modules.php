<?php
$mod_aliases=array(
    //----AUTOGEN
    'BlobController' => "php/fs",
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
    'ErrorSeqController'=> 'php/analysis',
    "ZipController"=>"php/teacher",
    'auth' => 'php/auth.php',
    'Auth' => 'php/auth.php',
    "RunGccController" => "php/analysis",
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
    'LoginController' => 'php/user',
    'ClassController' => 'php/teacher/ClassController.php',
    'ResetController' => 'php/teacher/ResetController.php',
    'ResetRequests' => 'php/teacher/ResetRequests.php',
    'TeacherController' => 'php/teacher/TeacherController.php',
    'AddErrorInfoController' => 'php/analysis',
    'MarkController' => 'php/mark/MarkController.php',
    'sessiontest' => 'php/test/sessiontest.php',
    'test' => 'php/test',
    'BAClass' => 'php/user/BAClass.php',
    'BAUser' => 'php/user/BAUser.php',
    'BATeacher' => 'php/teacher/BATeacher.php',
    'index' => 'php/websock/index.php',
    'info' => 'php/websock/info.php',
    'server' => 'php/websock/server.php',
    "MarkTimeController" => "php/analysis/MarkTimeController.php",
    "LogFileToDBController" => "php/analysis",
    "KeyValue"=>"php/data",
    "KeyValueController"=>"php/data",
    "BigData"=>"php/data",
    "BigDataController"=>"php/data",
    "DateUtil"=>"php",
    "Published"=>"php/user",
    "ClassMigrationController"=>"php/user",
    "LogAnalysisController"=>"php/analysis",
    "JSQN"=>"php/data",
    "AssignmentController"=>"php/mark",
    "Assignment"=>"php/mark",
    //----/AUTOGEN
    "config"=>"config/config.php",
    "dbconf"=>"db/config.php",
    'foo' =>'bar'
);
function req() {
    global $mod_aliases;
    $top= __DIR__."/..";
    $args=func_get_args();
    foreach ($args as $a) {
        if (!isset($mod_aliases[$a])) {
            throw new Exception("module $a is not defined");
        }
        $fn=$mod_aliases[$a];
        if (!preg_match("/\\.php$/",$fn)) {
            $fn="$fn/$a.php";
        }
        require_once $top."/".$fn;
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
