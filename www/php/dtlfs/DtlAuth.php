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
    public function homeDir() {//deprecated?
        return new SFile($this->getFS(),$this->homeDirPath());
    }
    public function homeDirPath() {
        if (!$this->loggedIn()) throw new Exception("Not logged in");
        return "/home/".$this->curClass()."/".$this->curUser()."/";   
    }
    public function getFS() {
        return Auth::getFS();
    }
}
?>