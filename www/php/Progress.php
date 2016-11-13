<?php
$progressID=0;
function showProgress($msg) {
    global $progressID;
    if (!$progressID) {
        $progressID="PRG".rand(0,100000);
        echo "<div id='$progressID'></div>";
    }
    echo "<script>";
    echo "document.getElementById('$progressID').innerHTML='$msg'";
    echo "</script>";
    flush();
    ob_flush();
}

?>