<?php
req("auth","LogUtil");
class GetLastFilesController {
    static function index() {
        Auth::assertTeacher();
        $t=Auth::curTeacher();
        $class=Auth::curClass2();

        $file=param("file");
        pdo_enableIter();
        $it=pdo_select("select ".
        " log.user as user,".
        " log.id as id,".
        " logtag.value as value,".
        " log.raw as raw,".
        " logtag.name as tagname,".
        " logtag.detail as logdetail".
        " from log left join logtag on log.id=logtag.log".
        " where (logtag.name is null or logtag.name='ok') and filename=? and class=? ".
        "order by time desc, log.id desc ", $file, $class->id);
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
        <script src="js/lib/util.js"></script>
        <style>
            .toggled {
                background-color: #0fa
            }
            
        </style>
        <script>
            let QueryString=Util.QueryString;
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
            function setStdin(t) {
                const stdin=$(t).val();
                $("a.autoexec").each(function () {
                    let a=$(this);
                    let href=a.attr("href");
                    let q=new QueryString(href);
                    q=q.put({stdin});
                    href=q.url;
                    a.attr({href});
                });
            }
            function screenInOut(targetElement, onin,onout) {
                // ターゲット要素を取得
                // Intersection Observerのコールバック関数
                onin=onin||(()=>0);
                onout=onout||(()=>0);
                const callback = (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            onin(targetElement);
                        } else {
                            onout(targetElement);
                        }
                    });
                };
                // Intersection Observerを作成
                const options = {
                    root: null, // ビューポートをルートとする
                    rootMargin: '0px', // ビューポートからのマージン
                    threshold: 0.5 // 要素が50%以上ビューポートと交差するとコールバックが呼ばれる
                };
                const observer = new IntersectionObserver(callback, options);
                // ターゲット要素を監視
                observer.observe(targetElement);
            }
            async function runEntry(ent) {
                const a=ent.find("a.autoexec");
                const url=a.attr("href");
                console.log("runEntry", url, ent);
                const q=new QueryString(url).put({ALWAYS_UPLOAD:"true"});
                const ifrm=$("<iframe>").attr({allowfullscreen:true}).css({float:"right"});
                const reloadButton=$("<button>").text("Reload").prop({disabled:true});
                ent.find(".right").append($("<div>").append(reloadButton)).append(ifrm);
                setInterval(resizeIframe, 100);                    
                async function doRun() {
                    while(window.sendURL) {
                        await new Promise((s)=>{ setTimeout(s, 10);});
                    }   
                    window.sendURL=true;
                    ifrm.attr({src:q.url});
                    const runurl=await new Promise((s)=>{
                        window.sendURL=(u, href)=>{
                            delete window.sendURL;
                            s(u);
                        };
                    });
                    const stdin=$("#stdin").val();
                    const rq=new QueryString(runurl).put({stdin});
                    ifrm.attr({src:rq.url});
                    reloadButton.prop({disabled:false});
                }
                await doRun();
                reloadButton.click(()=>{
                    reloadButton.prop({disabled:true});
                    doRun();
                    ifrm.focus();
                });
                function resizeIframe() {
                    let iframe=ifrm[0];
                    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                    var contentHeight = Math.max(
                    iframeDocument.body.scrollHeight,
                    iframeDocument.documentElement.scrollHeight,
                    iframeDocument.body.offsetHeight,
                    iframeDocument.documentElement.offsetHeight
                    );
                    iframe.style.height = contentHeight + 'px';
                    var contentWidth = Math.max(
                    iframeDocument.body.scrollWidth,
                    iframeDocument.documentElement.scrollWidth,
                    iframeDocument.body.offsetWidth,
                    iframeDocument.documentElement.offsetWidth
                    );
                    iframe.style.width = contentWidth + 'px';
                }
            }
            async function runAll() {
                $(".entry").each(function () {
                    const e=this;
                    let entered=false;
                    screenInOut($(e).find("a.autoexec")[0],()=>{
                        if (entered) return;
                        entered=true;
                        runEntry($(e));
                    }); 
                });
            }
            function hideChecked() {
                $(".entry").each(function () {
                    if ( 
                        $(this).find(".ok").hasClass("toggled")||
                        $(this).find(".ng").hasClass("toggled")) {
                            $(this).hide();
                        }
                });
            }
            function hideOK() {
                $(".entry").each(function () {
                    if ( 
                        $(this).find(".ok").hasClass("toggled")) {
                            $(this).hide();
                        }
                });
            }
            function hideNG() {
                $(".entry").each(function () {
                    if ( 
                        $(this).find(".ng").hasClass("toggled")) {
                            $(this).hide();
                        }
                });
            }
        </script>
        <div>
            <div>STDIN</div>
            <textarea id="stdin" rows=5 cols=40 onchange="setStdin(this)"></textarea>
            <button onclick="runAll()">Run All</button>
        </div>
        <div><button onclick="hideChecked()">Hide Checked</button>
        <button onclick="hideOK()">Hide OK</button>
        <button onclick="hideNG()">Hide NG</button>
        <?php
        foreach($users as $user=>$log) {
            //print_r($log);
            ?><div class="entry" id="<?=$log["id"]?>">
                <h4>
                <a id="<?= $user ?>" 
                target="autoexec" class="autoexec"
                href="index.html?r=jsl_edit&dir=/home/<?= $class->id ?>/<?= $t->id ?>/TestC/&autologexec=<?= $log["id"] ?>">
                <?= $user ?></a>
                <a target="log" href="?TeacherLog/view1new&user=<?= $user ?>&file=<?=$file ?>">Log...</a>
                </h4>
                <table>
                    <tr><td>
                <span class="left">
                    <pre><?= htmlspecialchars($log["code"]) ?></pre>
                    <button class="ok <?= $log["ok"]==="1" ? "toggled" :"" ?>" onclick="put(this,true)">OK</button>
                    <button class="ng <?= $log["ok"]==="0" ? "toggled" :"" ?>" onclick="put(this,false)">NG</button>
                    <input type="text" class="detail" onchange="put(this)" 
                    value="<?= htmlspecialchars($log["detail"]) ?>"/>
                </span></td>
                <td valign="top"><span class="right"></span></td>
                </tr></table>
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
