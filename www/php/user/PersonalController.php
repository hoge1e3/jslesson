<?php
req("MySession","pdo");
class PersonalController {
    static function regReqForm() {
        ?>
        <h1>個人ユーザ発行フォーム</h1>
        メールアドレスを入れてください
        <?php
    }
    static function sendRegMail() {
        $mail=param("mail");
        $token=MailToken::publish($mail,"new");
        sendMail($mail, $token);

    }
    static function regMailSent() {
        ?>
        <h1>個人ユーザ発行</h1>
        メールを送りました
        <?php

    }
    static function regForm() {
        $token=param("token");
        MailToken::get($token);


    }
    static function regDone() {

    }

    static function resetReqForm() {

    }
    static function sendResetMail() {

    }
    static function resetMailSent() {

    }
    static function resetForm() {

    }
    static function resetDone() {

    }
}
class MailToken {
    static function uniqueToken(){
        do {
            $token=rand(10000000,
                        99999999);
        } while(MailToken::has($token));
        return $token;
    }
    static function publish($mail,$purpose) {
        $token=self::uniqueToken();
        pdo_insert("mailToken",array("token"=>$token,"mail"=>$mail,"purpose"=>$purpose));
        return $token;
    }
    static function get($token) {
        return pdo_select1("select * from mailToken where token=?",$token);
    }
    static function clean($token) {
        return pdo_exec("delete from mailToken where token=?",$token);
    }
}

 ?>
