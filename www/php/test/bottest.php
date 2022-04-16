<?php

$url = 'https://hooks.slack.com/services/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';
$url="https://hooks.slack.com/services/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";
$data = array(
    'payload' => '{"text": "これは、チャンネル内のテキスト行ですか?\nそしてもう1つテキスト行がありません。"}',
);

$context = array(
    'http' => array(
           'method'  => 'POST',
           'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
           'content' => http_build_query($data)
    )
);

$html = file_get_contents($url, false, stream_context_create($context));

var_dump($http_response_header);

echo $html;
