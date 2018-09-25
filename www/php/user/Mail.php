<?
class Mail {
    static function available() {
        return false;
    }
    static function send($to, $sub , $body, $options) {
        if (self::available()) {
            mb_send_mail($to,$sub,$body,$options);
        } else {
            if (!$options) $options=array();
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
