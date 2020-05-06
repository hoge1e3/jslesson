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
        /*
        $select="select n1.*, ".
            "n2.id as c_id, n2.time as c_time, ".
            "n2.class as c_class, n2.user as c_user, ".
            "n2.content as c_content, n2.favs as c_favs ";
        $from=" from ".
        "note n1 left join note n2 ".
        "on n2.target=n1.id ";
        if ($file) {
            $rf=pdo_select($select.$from.
                "where n1.content<>'' and n1.class=? and n1.file=? and (n1.time>? or n2.time>?)",
                $user->_class->id,$file,$since,$since);
            $ra=self::procResult($rf);
            header("Content-type: text/json");
            echo json_encode($ra);
            //return $ra;
        } else if ($target) {
            $rf=pdo_select($select.$from.
                "where n1.content<>'' and n1.target=? and (n1.time>? or n2.time>?)",
                $target,$since,$since);
            $ra=self::procResult($rf);
            header("Content-type: text/json");
            echo json_encode($ra);
        }*/
    }
    /*static function procResult($rf) {
        $user=Auth::curUser2();
        $rh=array();
        $ra=array();
        foreach ($rf as $e) {
            if (isset($rh[$e->id])) {
                $r=$rh[$e->id];
            } else {
                $r=$e;
                $rh[$e->id]=$r;
                $r->favsHaving=0;
                $r->repliesHaving=0;//array();
                array_push($ra,$r);
            }
            if ($e->c_favs) {
                $r->favsHaving+=$e->c_favs;
                if ($e->c_class===$user->_class->id &&
                    $e->c_user===$user->name ) {
                    $r->favByMyself=$e->c_id;
                }
            }
            if ($e->c_content) {
                $r->repliesHaving++;
                //array_push($r->commentsHaving, $e);
            }
        }
        return $ra;
    }*/
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
    public static function myNotes() {
        
    }
}
