<?php
class ResetController {
    static function showRequests() {
        //TODO  (教員が操作)現在ログインしているクラスの再発行リクエスト一覧を表示
        // 教員じゃなかったら拒否
        ?>
        <h1>再発行リクエスト一覧</h1>
        <?php
    }
    static function addRequest() {
        //TODO (学生が操作) 現在ログインしているユーザについての再発行リクエストを生成
        
    }
    static function allowReset() {
        //TODO  (教員が操作) 再発行リクエストを許可
        // 該当クラスの教員じゃなかったら拒否
        // パラメタ：
        // $_POST["pin"]
        
    }
    static function doReset() {
        //TODO （学生が操作）指定されたpinについての再発行リクエストが許可されていれば
        // パスワードを再設定させる
        // パラメタ：
        // $_POST["pin"]
        // $_POST["newpass"]
        // $_POST["newpass_check"]
    }
}
?>

