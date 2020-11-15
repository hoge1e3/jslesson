<?php
req("auth","param","DateUtil","pdo","TeacherLogController");
class LogQueryController {
    static function index() {
        $p=TeacherLogController::parseUser();
        $user=$p["user"];
        $teacherObj=$p["teacher"];
        $class=$user->getClass();

        $date=param("date","");
        $file=param("file","");
        $limit=param("limit",100)-0;
        $sort=param("sort","desc");

        $dateExample=DateUtil::toString(DateUtil::toDayTop());
        $output=param("output","table");
        if ($output==="table") {
        ?>
        <div class="header">
        クラス：<?= $class->id ?><Br/>
        <form action=".?LogQuery/index" method=POST>
            日付<input name="date" value="<?= $date ?>"> 例：<?= $dateExample ?><br/>
            ユーザ名<input name="user" value="<?= $user->name ?>"><br/>
            ファイル名<input name="file" value="<?= $file ?>"><br/>
            件数<input name="limit" value="<?= $limit ?>"><br/>
            <input type="radio" name="sort" value="desc" <?=$sort==="desc"?"checked":"" ?>/>新しい順
            <input type="radio" name="sort" value="asc" <?=$sort==="asc"?"checked":"" ?>/>古い順<br/>
            <input type="submit">
        </form>
        <button onclick="document.querySelector('.header').style='display:none;';">Hide Form</button>
        </div>
        <?php
        }
        //if ($date!=="" && ($user!=="" || $file!=="")) {
            self::show  ($output, $date, $class, $user, $file, $limit, $sort);
        //}
    }
    static function show($output, $date, $class, $user, $file, $limit, $sort) {
        if ($sort!="desc") $sort="asc";
        if (!is_int($limit)) $limit=100;
        $wheres=[];
        $wheres[]=["class=?",$class->id];
        if ($date) {
            $dateMin=DateUtil::toInt($date);
            $wheres[]=["time > ?", $dateMin];
            $wheres[]=["time < ?", $dateMin+86400];
        }
        if ($user) {
            $wheres[]=["user =?", $user->name];
        }
        if ($file) {
            $wheres[]=["filename =?", $file];
        }
        pdo_enableIter();
        $it=pdo_select_ands("select * from log where ? order by time $sort limit $limit ",$wheres);
        if ($output==="table") self::showTable($it);
        else self::showJSON($it);
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
        //print "$datesec ";
        print"<table>";
        $thShown=false;
        foreach ($it as $rec) {
            if (!$thShown) {
                print "<tr>";
                foreach ($rec as $key=>$val) {
                    if ($key=="raw" || $key=="detail" || $key=="class") continue;
                    print "<td>$key</td>";
                }
                print "</tr>";
                $thShown=true;
            }
            print "<tr>";
            $date=DateUtil::toDayTop($rec->time);
            foreach ($rec as $key=>$val) {
                if ($key=="raw" || $key=="detail" || $key=="class") continue;
                if ($key=="time") $val=DateUtil::toString($val);
                if ($key=="id") {
                    $u=$rec->user;
                    $val="<a href='.?TeacherLog/view1&user=$u&day=$date&logid=$val&' target=view1>$val</a>";
                }
                print "<td>$val</td>";
            }
            print "</tr>";
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
