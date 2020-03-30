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

https://bitarrow.eplang.jp/bitarrow/?Personal/regForm&token=$token
EOF
,array("From"=>MAIL_FROM)
);
        header("Location: ?Personal/regMailSent&mail=$mail");
    }
    static function regMailSent() {
        $mail=param("mail");
        ?>
        <h1>個人ユーザ発行</h1>
        <?= $mail ?> にメールを送りました
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
            <!--
            ユーザ名（任意）<input name="name" value="<?= htmlspecialchars($name) ?>"/><br/>
            -->
            パスワード<input type="password" name="pass1"/><br/>
            パスワード(確認)<input type="password" name="pass2"/><br/>
            <input type="submit" value="登録"/>
        </form>
        <?php
    }
    static function regDone() {
        $token=param("token");
        //$name="";//param("name");
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
        $name=$r->mail;
        $u->password=$pass;//ENC(at BAUser::make)
        $u->setOptions("name",$name);
        $u->make();
        $uid=$u->name;
        MailToken::clean($token);
        $cid=$u->_class->id;
        ?>
        完了<BR>
            <a href=".?Login/form&class=<?= $cid ?>&user=<?= $uid ?>">ログイン</a>
        <?php
    }

    static function resetReqForm($mesg="") {
        if (!Mail::available()) {
            echo "!TEST!<BR>";
        }
        ?>
        <h1>個人ユーザパスワード再発行フォーム</h1>
        メールアドレスを入れてください
        <form action="?Personal/sendResetMail" method="POST">
            <?= $mesg ?>
            <input name="mail">
            <input type="submit" value="OK"/>
        </form>
        <?php

    }
    static function sendResetMail() {
        $mail=param("mail");
        $user=self::theUser($mail);
        if ($user->exists()) {
            $token=MailToken::publish($mail,"personal",$mail,"reset");
            Mail::send($mail, "BitArrowパスワード再発行", <<<EOF
次のページからパスワード再発行を完了してください．

https://bitarrow.eplang.jp/bitarrow/?Personal/resetForm&token=$token
EOF
,array("From"=>MAIL_FROM));
        }
        header("Location: ?Personal/resetMailSent&mail=$mail");
    }
    static function resetMailSent() {
        $mail=param("mail");
        ?>
        <h1>個人ユーザパスワード再発行</h1>
         <?= $mail ?> にメールを送りました<br/>
        （※入力されたメールアドレスが登録済でない場合，送られません）
        <?php
    }
    static function resetForm($mesg="") {
        $token=param("token");
        $r=MailToken::get($token);
        if (!$r) die("Token $token is invalid");
        ?>
        <form action=".?Personal/resetDone" method="POST">
            <input type="hidden" name="token" value="<?= $token ?>"/ >
            <?= $mesg ?><br/>
            ユーザID <?= $r->mail ?><br/>
            パスワード<input type="password" name="pass1"/><br/>
            パスワード(確認)<input type="password" name="pass2"/><br/>
            <input type="submit" value="登録"/>
        </form>
        <?php
    }
    static function resetDone() {
        $token=param("token");
        $pass=param("pass1");
        if (strlen($pass)<4) {
            self::resetForm("パスワードが短すぎます");
            return;
        }
        if ($pass!=param("pass2")) {
            self::resetForm("パスワードが一致しません");
            return;
        }
        $r=MailToken::get($token);
        if (!$r) die("Token $token is invalid");
        $u=self::theUser($r->mail);
        $u->password=$pass;//ENC(at BAUser::update)
        $u->update();
        $uid=$u->name;
        MailToken::clean($token);
        $cid=$u->_class->id;
        ?>
        完了<BR>
            <a href=".?Login/form&class=<?= $cid ?>&user=<?= $uid ?>">ログイン</a>
        <?php

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
