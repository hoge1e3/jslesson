<?php
class DtlShell {
    public function exec($cmd) {
        //print "Exec $cmd";
        system($cmd);
    }
    public function _eval($cmd) {
        return eval($cmd);
    }
    public function sleep($s) {
        usleep($s*1000*1000);
    }
}


?>