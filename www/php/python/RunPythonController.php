<?php
req("param","auth");
class RunPythonController {
    static function run(){
        $srcPath=param("srcPath");
        $fs=Auth::getFS();
        $s=new SFile($fs,$srcPath);
        $npath=$s->nativePath();
        if (strpos($npath,"\\")!==FALSE){
            $npath=preg_replace("/\\//","\\",$npath);
        }
        //echo $npath;
        $res=system_ex(PYTHON_PATH." $npath");
        if ($res["return"]==0) print($res["stdout"]);
        else {
            http_response_code(500);
            print($res["stderr"]);
        }
    }
}
function system_ex($cmd, $stdin = "")
{
    $descriptorspec = array(
        0 => array("pipe", "r"),
        1 => array("pipe", "w"),
        2 => array("pipe", "w")
        );

    $process = proc_open($cmd, $descriptorspec, $pipes);
    $result_message = "";
    $error_message = "";
    $return = null;
    if (is_resource($process))
    {
        fputs($pipes[0], $stdin);
        fclose($pipes[0]);

        while ($error = fgets($pipes[2])){
            $error_message .= $error;
        }
        while ($result = fgets($pipes[1])){
            $result_message .= $result;
        }
        foreach ($pipes as $k=>$_rs){
            if (is_resource($_rs)){
                fclose($_rs);
            }
        }
        $return = proc_close($process);
    }
    return array(
        'return' => $return,
        'stdout' => $result_message,
        'stderr' => $error_message,
        );
}
 ?>
