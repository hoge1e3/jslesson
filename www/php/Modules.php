<?php
$mod_aliases=array(
    //----AUTOGEN
    'AddErrorInfoController' => 'php/analysis/AddErrorInfoController.php',
    'AddScoreInfo' => 'php/analysis/AddScoreInfo.php',
    'DetectFile' => 'php/analysis/DetectFile.php',
    'ErrorSeqController' => 'php/analysis/ErrorSeqController.php',
    'LogAnalysisController' => 'php/analysis/LogAnalysisController.php',
    'LogFileToDBController' => 'php/analysis/LogFileToDBController.php',
    'LogUtil' => 'php/analysis/LogUtil.php',
    "PythonCheckController"=>"php/analysis",
    'MarkTimeController' => 'php/analysis/MarkTimeController.php',
    'MkCluster' => 'php/analysis/MkCluster.php',
    'MkScoreSheet' => 'php/analysis/MkScoreSheet.php',
    'Mkvec' => 'php/analysis/Mkvec.php',
    'RunGccController' => 'php/analysis/RunGccController.php',
    'Score' => 'php/analysis/Score.php',
    'ScoreUtil' => 'php/analysis/ScoreUtil.php',
    'TagUtil' => 'php/analysis/TagUtil.php',
    'TagVsCluster' => 'php/analysis/TagVsCluster.php',
    'VecUtil' => 'php/analysis/VecUtil.php',
    'auth' => 'php/auth.php',
    'BigData' => 'php/data/BigData.php',
    'BigDataController' => 'php/data/BigDataController.php',
    'JSONLines' => 'php/data/JSONLines.php',
    'JSQN' => 'php/data/JSQN.php',
    'KeyValue' => 'php/data/KeyValue.php',
    'KeyValueController' => 'php/data/KeyValueController.php',
    'PData' => 'php/data/PData.php',
    'pdo' => 'php/data/pdo.php',
    "Asset" => "php/data/",
    "AssetController" => "php/data/",
    'DateUtil' => 'php/DateUtil.php',
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
    'BlobController' => 'php/fs/BlobController.php',
    'MountableFS' => 'php/fs/MountableFS.php',
    'NativeFS' => 'php/fs/NativeFS.php',
    'PathUtil' => 'php/fs/PathUtil.php',
    'Permission' => 'php/fs/Permission.php',
    'SFile' => 'php/fs/SFile.php',
    'SyncController' => 'php/fs/SyncController.php',
    'test' => 'php/fs/test.php',
    'getDirInfoLib' => 'php/getDirInfoLib.php',
    'horiPra' => 'php/horiPra.php',
    'json' => 'php/json.php',
    'TeacherLogController' => 'php/log/TeacherLogController.php',
    'LogQueryController' => 'php/log/LogQueryController.php',
    'logout' => 'php/logout.php',
    'Assignment' => 'php/mark/Assignment.php',
    'AssignmentController' => 'php/mark/AssignmentController.php',
    'MarkController' => 'php/mark/MarkController.php',
    'Submission' => 'php/mark/Submission.php',
    'Testcase' => 'php/mark/Testcase.php',
    'TestcaseController' => 'php/mark/TestcaseController.php',
    'Modules' => 'php/Modules.php',
    'MySession' => 'php/MySession.php',
    'MySession0' => 'php/MySession0.php',
    'param' => 'php/param.php',
    'PQuery' => 'php/PQuery.php',
    'Progress' => 'php/Progress.php',
    'runit' => 'php/runit.php',
    'BATeacher' => 'php/teacher/BATeacher.php',
    'ClassController' => 'php/teacher/ClassController.php',
    'ResetController' => 'php/teacher/ResetController.php',
    'resetRequests' => 'php/teacher/resetRequests.php',
    'TeacherController' => 'php/teacher/TeacherController.php',
    'ZipController' => 'php/teacher/ZipController.php',
    'phpinfo' => 'php/test/phpinfo.php',
    'sessiontest' => 'php/test/sessiontest.php',
    'test' => 'php/test/test.php',
    'TestController' => 'php/test/TestController.php',
    'BAClass' => 'php/user/BAClass.php',
    'BAUser' => 'php/user/BAUser.php',
    'ClassMigrationController' => 'php/user/ClassMigrationController.php',
    'LoginController' => 'php/user/LoginController.php',
    'Mail' => 'php/user/Mail.php',
    'PersonalController' => 'php/user/PersonalController.php',
    'Published' => 'php/user/Published.php',
    'RunPythonController' => 'php/python/',
    'Process' => 'php/docker/Process.php',
    'Docker' => 'php/docker/Docker.php',
    'NoteController' => 'php/user/',
    'UniqID' => 'php/data/',
    "NoteController"=>"php/user/",
    'OAuthController' => 'php/user',
    //----/AUTOGEN
    'Auth' => 'php/auth.php',
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
if (isset($argv) && isset($argv[1])) {
    require_once "fs/NativeFS.php";
    require_once "fs/SFile.php";
    $fs=new NativeFS(".");
    $phpf=new SFile($fs,"");
    header("Content-type: text/plain");
    foreach ($phpf->recursive() as $f) {
        if ($f->endsWith(".php")) {
            $n=$f->truncExt();
            $r=$f->path();
            echo "    '$n' => 'php$r',\n";
        }
    }
}
?>
