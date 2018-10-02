<?php
class Mail {
    static function available() {
        $p=ini_get('sendmail_path');
        if (!$p) return false;
        $p=preg_replace("/ .*/","",$p);
        return file_exists($p);
    }
    static function send($to, $sub , $body, $options=array()) {
        if (self::available()) {
            mb_send_mail($to,$sub,$body,$options);
        } else {
            $options["To"]=$to;
            $options["Subject"]=$sub;
            $name=time();
            $fp=fopen ("/tmp/mail_$name.txt","w");
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
