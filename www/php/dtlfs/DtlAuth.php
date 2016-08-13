<?php
require_once __DIR__."/../auth.php";
class DtlAuth {
    public function curUser() {
        return Auth::curUser();
    }
    public function curClass() {
        return Auth::curClass();
    }
    public function loggedIn() {
        return Auth::loggedIn();
    }
    public function homeDir() {
        if (!$this->loggedIn()) throw new Exception("Not logged in");
        $fs=Auth::getFS();
        $rootDir=new SFile($fs,"/home/");
        return $rootDir->rel($this->curClass()."/")->rel($this->curUser()."/");
    }
}
?>