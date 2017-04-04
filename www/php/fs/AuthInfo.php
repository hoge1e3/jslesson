<?php
class AuthInfo {
    public $user,$teacher;
    public function AuthInfo($user,$teacher) {
        $this->user=$user;
        $this->teacher=$teacher;
    }
    public function getClassID(){
        return $this->user->_class->id;
    }
    public function getUserName() {
        return $this->user->name;
    }
}
?>