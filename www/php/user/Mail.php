<?php
class Mail {
    static function available() {
        $p=ini_get('sendmail_path');
        if (!$p) return false;
        $p=preg_replace("/ .*/","",$p);
        return file_exists($p);
    }
    static function send($to, $sub , $body, $options=array()) {
        if (defined("PHPMAILER_PATH")) {
            require_once (PHPMAILER_PATH);
            sendmail_PHPMailer($to,$sub,$body,$options);
        } else if (self::available()) {
            $h="";
            foreach ($options as $k=>$v) {
                $h.="$k: $v\r\n";
            }
            mb_send_mail($to,$sub,$body,$h);
        } else {
            $options["To"]=$to;
            $options["Subject"]=$sub;
            $name=time();
            $fp=fopen ("/tmp/mail_$name.txt","w");
            if (!$fp) die("Send fail");
            foreach ($options as $k=>$v) {
                fwrite($fp,"$k: $v\n");
            }
            fwrite($fp,"----\n");
            fwrite($fp,$body);
            fclose($fp);
        }
    }

}
?>
