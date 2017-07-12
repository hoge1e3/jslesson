<?php
function param() {
    $a=func_get_args();
    $key=$a[0];
    if (isset($_POST[$key])) {
        return $_POST[$key];
    }
    if (isset($_GET[$key])) {
        return $_GET[$key];
    }
    if (count($a)===1) throw new Exception("Parameter required: $key");
    return $a[1];
}
?>
