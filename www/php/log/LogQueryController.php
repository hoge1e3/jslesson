<?php
req("auth","param","DateUtil","pdo");
class LogQueryController {
    static function index() {
        $date=param("date","");
        $user=param("user","");
        $file=param("file","");
        Auth::assertTeacher();
        $class=Auth::curClass2();
        ?>
        <div class="header">
        クラス：<?= $class->id ?><Br/>
        <form action=".?LogQuery/index" method=POST>
            日付<input name="date" value="<?= $date ?>"><br/>
            ユーザ名<input name="user" value="<?= $user ?>"><br/>
            ファイル名<input name="file" value="<?= $file ?>"><br/>
            <input type="submit">
        </form>
        <button onclick="document.querySelector('.header').style='display:none;';">Hide Form</button>
        </div>
        <?php
        if ($date!=="" && ($user!=="" || $file!=="")) {
            self::show($date,$user,$file);
        }
    }
    static function show($date,$user,$file) {
        Auth::assertTeacher();
        $class=Auth::curClass2();
        $datesec=DateUtil::toInt($date);
        $it=pdo_select_iter("select * from log where class=? and ".
        "user like ? and filename like ? and time>? and time<?",
        $class->id,
        "%$user%","%$file%",$datesec, $datesec+86400
        );
        //print "$datesec ";
        print"<table>";
        $thShown=false;
        foreach ($it as $rec) {
            if (!$thShown) {
                print "<tr>";
                foreach ($rec as $key=>$val) {
                    if ($key=="raw" || $key=="detail") continue;
                    print "<td>$key</td>";
                }
                print "</tr>";
                $thShown=true;
            }
            print "<tr>";
            foreach ($rec as $key=>$val) {
                if ($key=="raw" || $key=="detail") continue;
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
