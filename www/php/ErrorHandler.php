<?php
if (!function_exists('http_response_code'))
{
    function http_response_code($newcode = NULL)
    {
        static $code = 200;
        if($newcode !== NULL)
        {
            header('X-PHP-Response-Code: '.$newcode, true, $newcode);
            if(!headers_sent())
                $code = $newcode;
        }       
        return $code;
    }
}
function h_err($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    //print_r(debug_backtrace());
    die ("SERVER ERROR!\n$errno $errstr $errfile:$errline\nSERVER ERROR END!");
    //exit(1);
}
set_error_handler("h_err");
?>