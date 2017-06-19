<?php
require_once __DIR__."/../Modules.php";
req("dbconf");
//require_once "db/config.php";

function pdo() {
    global $pdo_dbh;
    if (isset($pdo_dbh)) {
        return $pdo_dbh;
    }
    $pdo_dbh=pdo_new();
    return $pdo_dbh;
}
function pdo_new() {
    if (defined("PDO_USER")) {
        return new PDO(PDO_DSN,PDO_USER,PDO_PASS);
    } else {
        $dbh=new PDO(PDO_DSN);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
}

?>
