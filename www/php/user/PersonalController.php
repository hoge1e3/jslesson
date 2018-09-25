<?php
req("MySession","pdo","Mail","BAClass","BAUser");
class PersonalController {
    static function regReqForm($mesg="") {
        ?>
        <h1>個人ユーザ発行フォーム</h1>
        メールアドレスを入れてください
        <form action="?Personal/sendRegMail" method="POST">
            <?= $mesg ?>
            <input name="mail">
            <input type="submit" value="OK"/>
        </form>
        <?php
    }
    static function theClass() {
        return new BAClass("personal");
    }
    static function theUser($user) {
        return new BAUser(self::theClass(),$user);
    }
    static function sendRegMail() {
        $mail=param("mail");
        $user=self::theUser($mail);
        if ($user->exists()) {
            self::regReqForm("すでに存在するメールアドレスです");
            return;
        }
        $token=MailToken::publish($mail,"personal",$mail,"new");
        Mail::send($mail, "BitArrowユーザ登録", <<<EOF
次のページからユーザ登録を完了してください．

https://bitarrow.eplang.jp/?Personal/regForm&token=$token
EOF
);
        header("Location: ?Personal/regMailSent");
    }
    static function regMailSent() {
        ?>
        <h1>個人ユーザ発行</h1>
        メールを送りました
        <?php

    }
    static function regForm($mesg="") {
        $token=param("token");
        $name=param("name","");
        $r=MailToken::get($token);
        if (!$r) die("Token $token is invalid");
        ?>
        <form action=".?Personal/regDone" method="POST">
            <input type="hidden" name="token" value="<?= $token ?>"/ >
            <?= $mesg ?><br/>
            ユーザID <?= $r->mail ?><br/>
            ユーザ名（任意）<input name="name" value="<?= htmlspecialchars($name) ?>"/><br/>
            パスワード<input type="password" name="pass1"/><br/>
            パスワード(確認)<input type="password" name="pass2"/><br/>
            <input type="submit" value="登録"/>
        </form>
        <?php
    }
    static function regDone() {
        $token=param("token");
        $name=param("name");
        $pass=param("pass1");
        if (strlen($pass)<4) {
            self::regForm("パスワードが短すぎます");
            return;
        }
        if ($pass!=param("pass2")) {
            self::regForm("パスワードが一致しません");
            return;
        }
        $r=MailToken::get($token);
        if (!$r) die("Token $token is invalid");
        $u=self::theUser($r->mail);
        $u->password=$pass;
        $u->setOptions("name",$name);
        $u->make();
        $uid=$u->name;
        MailToken::clean($token);
        ?>
        完了<BR>
            <a href=".?Login/form&user=$uid">ログイン</a>
        <?php
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
        } while(self::has($token));
        return $token;
    }
    static function publish($mail,$class,$user,$purpose) {
        $token=self::uniqueToken();
        pdo_insert("mailToken",array(
            "token"=>$token,
            "mail"=>$mail,
            "class"=>$class,
            "user"=>$user,
            "purpose"=>$purpose));
        return $token;
    }
    static function get($token) {
        return pdo_select1("select * from mailToken where token=?",$token);
    }
    static function has($token) {
        return self::get($token);
    }
    static function clean($token) {
        return pdo_exec("delete from mailToken where token=?",$token);
    }
}

 ?>
