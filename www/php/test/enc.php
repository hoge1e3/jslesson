<?php

$key = '長い鍵長い鍵長い鍵長い鍵長い鍵長い鍵長い鍵長い鍵長い鍵長い鍵';
$plain_text = '暗号化したいデータ';

//openssl
$c_t = openssl_encrypt($plain_text, 'AES-128-ECB', $key);
$p_t = openssl_decrypt($c_t, 'AES-128-ECB', $key);
var_dump($plain_text, $c_t, $p_t);