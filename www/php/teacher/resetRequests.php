<?php
class ResetRequests {
    static function getAll($class) {
        //TODO   
        // $class(BAClass)  に出ている再発行リクエストを
        //ResetRequestオブジェクトの配列で取得
    }
    static function create($user) {
        //TODO   
        // $user(BAUser)  についての再発行リクエストを生成
        // pin は他とかぶらないように！
    }
    static function getByPin($pin) {
        //TODO   
    }
}
class ResetRequest {
    var $user; // BAUser
    var $pin;
    function ResetRequest() {
        //TODO
    }
    function isAllowed() { //:Boolean
        //TODO   
    }
    function getClass() {  //:BAClass
        //TODO
    }
}
?>