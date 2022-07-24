<?php
req("auth","pdo");
class DeleteController {
    static function users() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $students=$class->getAllStu();

        ?>
        <a href="a.php?Class/showUsers">ユーザ一覧</a>
        <hr/>
        <h1>ユーザの削除</h1>
        <ul>
            <li>プロジェクトを１つも作成していないユーザは，削除可能です．</li>
            <li>プロジェクトを作成済のユーザを削除するには，「代理ログイン」を使用して，そのユーザのプロジェクトをすべて削除してください．</li>
        </ul>
        <script>
            function selectAll() {
                for (let e of document.querySelectorAll(".delChk")){
                    e.checked=true;
                }
            }
        </script>
        <button onclick="selectAll()">すべてチェック</button>
        <form action="a.php?Delete/usersDone" method="POST">
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
                    <td><input class="delChk" type="checkbox" 
                    name="<?= htmlspecialchars("del_".$s->name) ?>" />削除</td>
                <?php } else { ?>
                    <td>削除不可． <a href="a.php?Class/su&user=<?= htmlspecialchars($s->name) ?>">代理ログイン...</a></td>
                <?php } ?>
            </tr>
            <?php
        }
        print"</table>";
        ?>
        <input type="submit">
        </form>
        <?php
    }
    static function usersDone() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $head="del_";
        foreach ($_POST as $key=>$value) {
            if (substr($key, 0, strlen($head))===$head) {
                $key=substr($key, strlen($head));
                self::user($class->getUser($key));
                print "ユーザ $key を削除しました<BR>";
            }
        }
        ?>
        <BR/>
        <a href="a.php?Class/showUsers">ユーザ一覧</a> | 
        <a href="a.php?Delete/users">ユーザの削除</a>
        <?php
    }
    static function user($user) {
        if (!$user->exists()) {
            die($user->name."Not exists");
        }
        $deletable=Auth::userDeletable($user);
        if (!$deletable) {
            die($user->name." is not deletable");
        }
        $lim1=" limit 1 ";
        if (preg_match("/^sqlite:/",PDO_DSN)) $lim1="";
        return pdo_exec("delete from user where class=? and name=? $lim1 ", 
            $user->_class->id, $user->name);
    }
    static function klass() {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        if (!Auth::classDeletable($class)) {
            ?>
            <?= $class->id ?> にユーザが残っています．まず
            <a href="a.php?Delete/users">ユーザの削除</a>を行ってください．
            <?php
            return;
        }
        ?>
        クラス　 <?= $class->id ?> を本当に削除しますか？
        <div style="color: red;">
        クラスを削除してしまうと，
        今後，<?= $class->id ?>という名前のクラスは作成できなくなります．
        もし，将来使う予定がある場合は，このままにしておいてください．
        </div>
        <a href="a.php?Class/show">キャンセル</a>
        <br/><br/><br/><br/><br/>
        <a href="a.php?Delete/classDone">本当に削除する</a><br/>
        <?php
    }
    static function classDone(){
        Auth::assertTeacher();
        $class=Auth::curClass2();
        if (!Auth::classDeletable($class)) {
            die($class->id." is not deletable");
        }
        $teacher=Auth::curTeacher();
        $lim1=" limit 1 ";
        if (preg_match("/^sqlite:/",PDO_DSN)) $lim1="";
        pdo_exec("delete from role where class = ? and user = ? and type = ? $lim1 ",
    	        $class->id,$teacher->id,Auth::TEACHER);
        ?>
        クラス　 <?= $class->id ?> を削除しました．<hr/>
        <a href="a.php?Teacher/home">教員ホーム</a>
        <?php
    }
}   

?>