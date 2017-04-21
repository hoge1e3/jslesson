<?php
require_once "db/config.php";

function pdo() {
    if (defined("PDO_USER")) {
        return new PDO(PDO_DSN,PDO_USER,PDO_PASS);
    } else {
        return new PDO(PDO_DSN);
    }
}

?>