<?php
req("auth","param","DateUtil","pdo","TeacherLogController");
class LogQueryController {
    static function index() {
        $h=function ($t){return htmlspecialchars($t);};
        $allUsers=(param("user","")==="");
        $p=TeacherLogController::parseUser();
        //TODO $userはBAUserオブジェクトだけど、hoge% みたいなものも許容。存在していないけど。
        $user=$p["user"];
        $teacherObj=$p["teacher"];
        //BAUserのclass は現在のクラス情報から渡されるので、ユーザとして存在してなくてもセーフ。
        $class=$user->getClass();

        $date=param("date","");
        $file=param("file","");
        $limit=param("limit",100)-0;
        $sort=param("sort","desc");

        $dateExample=DateUtil::toString(DateUtil::toDayTop());
        $output=param("output","table");
        $groupBy=[];
        if ($p["canSeeOtherUsersLogs"]) {
            if ($allUsers) $user=null;
            if (param("grp_user",false)) {
                $groupBy[]="user";
                //$user=null;
            }
        }
        if (param("grp_file",false)) {
            $groupBy[]="file";
            //$file=null;
        }
        if ($output==="table") {
        ?>
        <div class="header">
        クラス：<?= $class->id ?><Br/>
        <form action=".?LogQuery/index" method=POST>
            日付<input name="date" value="<?= $h($date) ?>"> 例：<?= $dateExample ?><br/>
            <?php if ($p["canSeeOtherUsersLogs"]) { ?>
            ユーザ名<input name="user" value="<?= $h($user ? $user->name :"") ?>">
            <input type="checkbox" value="1" name="grp_user" 
                <?=param("grp_user",false) ?"checked":""?>>集計<br/>
            <?php }  else  { ?>
                ユーザ名 <?= $h($user ? $user->name :"") ?><Br/>
            <?php } ?>
            ファイル名<input name="file" value="<?= $h($file ? $file :"") ?>">
            <input type="checkbox" value="1" name="grp_file"
                <?=param("grp_file",false) ?"checked":""?>>集計<br/>
            件数<input name="limit" value="<?= $h($limit) ?>"><br/>
            <input type="radio" name="sort" value="desc" <?=$sort==="desc"?"checked":"" ?>/>新しい(多い)順
            <input type="radio" name="sort" value="asc" <?=$sort==="asc"?"checked":"" ?>/>古い(少ない)順<br/>
            <input type="submit">
        </form>
        <button onclick="document.querySelector('.header').style='display:none;';">Hide Form</button>
        </div>
        <?php
        }
        self::show  ($output, $class, $date, $user, $file, $limit, $sort, $groupBy);
    }
    static function get($class, $date=null, $user=null, $file=null, $limit=100, $sort="desc", $groupBy=null) {
        if ($sort!="desc") $sort="asc";
        if (!is_int($limit)) $limit=100;
        $wheres=[];
        $wheres[]=["class=?",$class->id];
        if ($date) {
            if (is_array($date)) {
                $dateMin=($date[0] ? DateUtil::toInt($date[0]) : 0);
                $dateMax=DateUtil::toInt($date[1]);
            } else {
                $dateMin=DateUtil::toInt($date);
                $dateMax=$dateMin+86400;
            }
            $wheres[]=["time > ?", $dateMin];
            $wheres[]=["time < ?", $dateMax];
        }
        if ($user) {
            $wheres[]=["user like ?", $user->name];
        }
        if ($file) {
            $wheres[]=["filename like ?", $file];
        }
        pdo_enableIter();
        if (!$groupBy || count($groupBy)==0) {
            $it=pdo_select_ands("select * from log where ? order by time $sort, id $sort limit $limit ",$wheres);
            return $it;    
        } else {
            $gq=[];
            foreach ($groupBy as $g) {
                if ($g==="file"||$g==="filename") $gq[]="filename";
                if ($g==="user") $gq[]="user";
            }
            $gq=implode(", ",$gq);
            $q="select $gq, count(*) as count from log ".
                "where ? group by $gq order by count $sort limit $limit";
            $it=pdo_select_ands($q,$wheres);
            return $it;
        }
    }
    static function show($output, $class, $date, $user, $file, $limit, $sort, $groupBy) {
        $it=self::get($class, $date, $user, $file, $limit, $sort, $groupBy);
        if ($output==="table") {
            self::showTable($it);
            if ($user && $file) {
                req("TeacherLogController");
                $a=TeacherLogController::getActualtime2($user, $file);
                echo "actualTime2= $a";
            }
        } else self::showJSON($it);
    }
    static function showJSON($it) {
        header("Content-type: text/json");
        $res=[];
        foreach ($it as $rec) {
            $res[]=$rec;
        }
        print(json_encode($res));
    }
    static function showTable($it) {
        $h=function ($t){return htmlspecialchars($t);}
        //print "$datesec ";
        ?>
        <Script src="js/lib/jquery-1.12.1.js"></Script>
        <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
        <Script src="js/log/actTime.js"></Script>
        <?php
        print"<table>";
        $thShown=false;
        foreach ($it as $rec) {
            if (!$thShown) {
                print "<thead><tr class='header'>";
                foreach ($rec as $key=>$val) {
                    if ($key=="raw" || $key=="detail" || $key=="class") continue;
                    print "<th data-attr='$key'>$key</th>";
                }
                print "</tr></thead>\n";
                $thShown=true;
            }
            if (isset($rec->filename) && strpos($rec->filename,"?")!==false) continue;
            if (isset($rec->filename) && strpos($rec->filename,"../")!==false) continue;
            print "<tr class='record'>";
            if (isset($rec->time)) $date=DateUtil::toDayTop($rec->time);
            foreach ($rec as $key=>$val) {
                if ($key=="raw" || $key=="detail" || $key=="class") continue;
                ?><td data-attr='<?=$h($key)?>'><?php
                if ($key=="time") {
                    ?><?= $h(DateUtil::toString($val)) ?><?php
                } else if ($key=="id") {
                    $u=$rec->user;
                    ?>
                    <a href='.?TeacherLog/view1new&user=<?= $h($u)?>&day=<?= $h($date)?>&logid=<?= $h($val)?>&' 
                        target="view1"><?= $h($val)?></a>
                    <?php
                }
                else if ($key=="count") {
                    if (isset($rec->user) && isset($rec->filename) ) {?>
                        <a href='.?TeacherLog/view1new&user=<?=$h($rec->user)?>&file=<?=$h($rec->filename)?>'
                         target=view1><?=$h($val)?></a><?php
                    }
                } else {
                    print $h($val);
                }
                ?></td><?php
            }
            print "</tr>\n";
        }
        print"</table>";
    }
    static function byId(){
        req("LogUtil");
        $id=param("id");
        $r=LogUtil::get($id);
        header("Content-type: text/json");
        print json_encode($r);
    }

}

 ?>
