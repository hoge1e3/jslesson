<?php
req("auth","LogUtil");
class GetLastFilesController {
    static function index() {
        Auth::assertTeacher();
        $t=Auth::curTeacher();
        $class=Auth::curClass2();

        $file=param("file");
        pdo_enableIter();
        $it=pdo_select("select log.user as user, log.id as id, logtag.value as value, log.raw as raw, logtag.name as tagname, logtag.detail as logdetail from log left join logtag on log.id=logtag.log where (tagname is null or tagname='ok') and filename=? and class=? order by time desc ", $file, $class->id);
        $users=[];
        foreach ($it as $log) {
            //print ($log->tagname);
            $user=$log->user;
            if (isset($users[$user])) continue;
            //print(json_encode($log->raw));
            $code=removeEmptyLines( LogUtil::getCode(json_decode($log->raw)) );
            if (!$code) continue;
            //print_r($log);
            $users[$user]=["id"=>$log->id, "code"=>$code, 
            "ok"=>$log->value,"detail"=>$log->logdetail,"tagname"=>$log->tagname];

        }        
        ?>
        <script src="js/lib/jquery-1.12.1.js"></script>
        <style>
            .toggled {
                background-color: #0fa
            }
        </style>
        <script>
            function put(t,ok) {
                let div=$(t).closest("div.entry");
                let okb=div.find(".ok");
                let ngb=div.find(".ng");
                if (typeof ok==="boolean") {
                    ok=ok?1:0;
                    if (ok) {
                        ngb.removeClass("toggled");
                        okb.addClass("toggled");
                    } else {
                        okb.removeClass("toggled");
                        ngb.addClass("toggled");
                    }
                } else {
                    if (okb.hasClass("toggled")) ok=true;
                    if (ngb.hasClass("toggled")) ok=false;
                }
                let detail=div.find(".detail");
                console.log("div", div[0].id, detail.val(),ok);
                $.get("?GetLastFiles/put", {id: div[0].id, detail:detail.val(), ok});
            }
        </script>
        <?php
        foreach($users as $user=>$log) {
            //print_r($log);
            ?><div class="entry" id="<?=$log["id"]?>"><h4>
                <a 
                target="autoexec"
                href="index.html?r=jsl_edit&dir=/home/<?= $class->id ?>/<?= $t->id ?>/TestC/&autologexec=<?= $log["id"] ?>">
                <?= $user ?></a></h4>
            <pre><?= htmlspecialchars($log["code"]) ?></pre>
            <button class="ok <?= $log["ok"]==="1" ? "toggled" :"" ?>" onclick="put(this,true)">OK</button>
            <button class="ng <?= $log["ok"]==="0" ? "toggled" :"" ?>" onclick="put(this,false)">NG</button>
            <input type="text" class="detail" onchange="put(this)" 
            value="<?= htmlspecialchars($log["detail"]) ?>"/>
            </div>
            <?php
        }
    }
    static function put() {
        $id=param("id");
        $ok=param("ok",null);
        $detail=param("detail");
        $tag=pdo_select1("select * from logtag where name='ok' and log=?", $id);
        if ($tag) {
            pdo_exec("update logtag set name=?, value=?, detail=?  where log=? ","ok", $ok, $detail, $id);
        } else {
            //print_r([$id,$ok,$detail]);
            pdo_exec("insert into logtag(log,name,value,detail) values(?,?,?,?)", $id,"ok", $ok, $detail );
        }
        print "OK";
    }
}
function removeEmptyLines($input) {
    $pattern = '/^\s*\n/m'; // 正規表現パターン: 空行を表す
    return preg_replace($pattern, '', $input);
}
