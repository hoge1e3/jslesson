<?php
req("pdo");
class OTP {
    static function create($data, $duration=30) {
        $id=random_int(
            10000000,
            99999999
        );
        if (!is_string($data)) $data=json_encode($data);
        pdo_insert("otp", ["id"=>$id, "content"=>$data, "expires"=>time()+$duration]);
        return $id;
    }
    static function clean() {
        pdo_exec("delete from otp where expires<?",time());
    }
    static function get($id) {
        self::clean();
        $r=pdo_select1("select * from otp where id=?",$id);
        if (!$r) return $r;
        pdo_exec("delete from otp where id=?",$id);
        return $r->content;
    }
}