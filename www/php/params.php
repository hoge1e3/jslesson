<?php
function params($key,$def=null) {
    if (isset($_POST[$key])) {
        return $_POST[$key];
    }
    if (isset($_GET[$key])) {
        return $_GET[$key];
    }
    return $def;
}
?>
