<?php
require_once "db/config.php";

function pdo() {
    if (defined("PDO_USER")) {
        return new PDO(PDO_DSN,PDO_USER,PDO_PASS);
    } else {
        $dbh=new PDO(PDO_DSN);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
}

?>