<?php
class CDBController {
    static function get() {
        $apikey=param("key");
        $url="https://cdb.eplang.jp/api/get?key=$apikey";
        $context = array(
            'http' => array(
                   'method'  => 'GET',
            ),
            'ssl'=>['verify_peer'=>false, 'verify_peer_name'=>false]
        );
        header('Content-Type: application/json');
        $html = file_get_contents($url, false, stream_context_create($context));
        print $html;
    }
    static function post(){
        $apikey=param("key");
        $url="https://cdb.eplang.jp/api/post?key=$apikey";
        $data=param("data");
        $context = array(
            'http' => array(
                   'method'  => 'POST',
                   'header'  => implode("\r\n", array('Content-Type: application/json',)),
                   'content' => ($data)
            ),
            'ssl'=>['verify_peer'=>false, 'verify_peer_name'=>false]
        );
        $html = file_get_contents($url, false, stream_context_create($context));
        // { "res": "ok" }
        print $html;
    }

}
