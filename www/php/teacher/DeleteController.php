<?php
req("auth");
class DeleteController {
    static function users() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $students=$class->getAllStu();

        ?>
        <h1>ユーザの削除</h1>
        <ul>
            <li>プロジェクトを１つも作成していないユーザは，削除可能です．</li>
            <li>プロジェクトを作成済のユーザを削除するには，「代理ログイン」を使用して，そのユーザのプロジェクトをすべて削除してください．</li>
        </ul>
        <button onclick="selectAll()">すべてチェック</button>
        <table border=1>
            <tr><th>ユーザID</th><th>名前</th><th>削除？</th></tr>
        <?php
        foreach($students as $s){
            $opt=$s->getOptions();
            if(!isset($opt->name)){
                $n="未登録";
            }else{
                $n=$opt->name;
                if($n==""){
                    $n="未登録";
                }
            }
            $lf=$s->getLog();
            $l=end($lf);
            if(gettype($l) == "string"){
                $l=json_decode($l);
            }
            $tmpf=explode("/",$l->filename);
            if(count($tmpf)>5){
                $l->filename=$tmpf[4]."/".$tmpf[5];
            }
            $deletable=Auth::userDeletable($s);
            ?>
            <tr><th><?=$s->name?></th><th><?=$n?></th>
                <?php if( $deletable ) { ?>
                    <td><input type="checkbox" name="<?= htmlspecialchars("del_".$s->name) ?>" />削除</td>
                <?php } else { ?>
                    <td>削除不可． <a href="a.php?Class/su&user=<?= htmlspecialchars($s->name) ?>">代理ログイン...</a></td>
                <?php } ?>
            </tr>
            <?php
        }
        print"</table>";

    }
}

?>