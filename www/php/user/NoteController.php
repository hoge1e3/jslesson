<?php
/*
create table note(
    `id` varchar(32),
    `target` varchar(32), -- externalized.id or null(root)
    `time` integer,
    `class` varchar(32),
    `user` varchar(32),
    `file` varchar(250), -- file path or null (for other externalized)
    `content` text, -- empty on just a fav
    `favs` integer, -- 0 or 1?
    `options` text
);
*/
req("auth","DateUtil","Note");
class NoteController {
    public static function put() {
        $user=Auth::curUser2();
        $time=DateUtil::now();
        $target=param("target",null);// varchar(32), -- externalized.id or null(root)
        //`time` integer,
        //`class` varchar(32),
        //`user` varchar(32),
        $file=param("file");// varchar(250), -- file path or null (for other externalized)
        $content=param("content");// text, -- empty on just a fav
        $favs=param("favs",0);// integer, -- 0 or 1?
        $id=pdo_uniqID("note","id");
        pdo_insert("note",array(
            "id"=>$id,
            "class"=>$user->_class->id,
            "user"=>$user->name,
            //"target"=>"target",
            "time"=>$time,
            "file"=>$file,
            "content"=>$content,
            "favs"=>$favs
        ));
        echo $id;
    }
    public static function get() {
        $user=Auth::curUser2();
        $file=param("file",null);
        $target=param("target",null);
        $since=param("since",0);
        $ra=Note::get($user,$file,$target,$since);
        header("Content-type: text/json");
        echo json_encode($ra);
    }
    public static function addFav() {
        $user=Auth::curUser2();
        $time=DateUtil::now();
        $target=param("id");
        $id=pdo_uniqID("note","id");
        $favs=param("favs",1);
        pdo_insert("note",array(
            "id"=>$id,
            "class"=>$user->_class->id,
            "user"=>$user->name,
            "target"=>$target,
            "time"=>$time,
            //"file"=>$file,
            //"content"=>$content,
            "favs"=>$favs
        ));
        echo $id;
    }
    public static function addReply() {
        $user=Auth::curUser2();
        $time=DateUtil::now();
        $target=param("target");
        $content=param("content");
        $id=pdo_uniqID("note","id");
        pdo_insert("note",array(
            "id"=>$id,
            "class"=>$user->_class->id,
            "user"=>$user->name,
            "target"=>$target,
            "time"=>$time,
            //"file"=>$file,
            "content"=>$content,
            "favs"=>0
        ));
        echo $id;
    }
    public static function rmFav() {
        $id=param("id");
        pdo_exec("delete from note where id=? ",$id);
    }
    public static function showAll(){
        $class=Auth::curClass2();
        if(!Auth::isTeacherOf($class)){
            return redirect("Teacher/login");
        }
        $it=pdo_select_iter("select distinct file from note where class=? and file is not null order by file ",$class->id);
        $p=null;
        foreach ($it as $e) {
            $file=$e->file;
            $ra=Note::get($class,$file,null, 0, true);
            echo"<h1>$file に関するノート</h1>\n<ul>";
            foreach ($ra as $e) {
                $reps=$e->repliesHaving;
                ?><li>
                    ♥<?=$e->favsHaving?> <?= $e->content ?> by <?= $e->user ?> at <?= DateUtil::toString($e->time) ?>
                    <?php if (count($reps)>0) {
                        echo "<ul>";
                        foreach($reps as $rep) {
                            ?>
                            <li>
                                <?= $rep->c_content ?> by <?= $rep->c_user ?> at <?= DateUtil::toString($rep->c_time) ?>
                            </li>
                            <?php
                        }
                        echo "</ul>";
                    } ?>
                </li><?php
            }
            echo "</ul>";
        }
    }
    public static function showAllAsTable(){
        $class=Auth::curClass2();
        if(!Auth::isTeacherOf($class)){
            return redirect("Teacher/login");
        }
        $it=pdo_select_iter("select distinct file from note where class=? and file is not null order by file ",$class->id);
        $p=null;
        echo "<table>";
        ?><tr>
            <td>File</td>
            <td>User</td>
            <td>Time</td>
            <td>Favs</td>
            <td>Content</td>
        </tr><?php
        foreach ($it as $e) {
            $file=$e->file;
            $ra=Note::get($class,$file,null, 0, true);
            //echo"<h1>$file に関するノート</h1>\n<ul>";
            foreach ($ra as $e) {
                $reps=$e->repliesHaving;
                ?><tr>
                    <td><?= $file ?></td>
                    <td><?= $e->user ?></td>
                    <td><?= DateUtil::toString($e->time) ?></td>
                    <td><?=$e->favsHaving?></td>
                    <td><?= htmlspecialchars($e->content) ?></td>
                </tr><?php
            }
        }
        echo "</table>";
    }

    public static function myNotes() {
        $stats=param("stats",false);
        $user=Auth::curUser2();
        //header("Content-type: text/json");
        $ra=(Note::get($user,null,null,0,true));
        if ($stats) {
            $f=0;$coms=0;
            foreach ($ra as $e) {
                $f+=$e->favsHaving;
                $coms++;
            }
            header ("Content-type: text/json");
            echo json_encode(array("favs"=>$f, "count"=>$coms));
            return;
        }
        usort($ra,function ($a,$b) {
            if ($b->favsHaving>$a->favsHaving) return 1;
            if ($b->favsHaving<$a->favsHaving) return -1;
            return  ($b->time-$a->time);
        });
        echo"<h1>".$user->name." が書いたノート</h1>\n";
        echo "<ul>";
        foreach ($ra as $e) {
            $reps=$e->repliesHaving;
            ?><li>
                ♥<?=$e->favsHaving?> <?= $e->content ?> for <?= $e->file ?> at <?= DateUtil::toString($e->time) ?>
                <?php if (count($reps)>0) {
                    echo "<ul>";
                    foreach($reps as $rep) {
                        ?>
                        <li>
                            <?= $rep->c_content ?> at <?= DateUtil::toString($rep->c_time) ?>
                        </li>
                        <?php
                    }
                    echo "</ul>";
                } ?>
            </li><?php
        }
        echo "</ul>";
    }
}
