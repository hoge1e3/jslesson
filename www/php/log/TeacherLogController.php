<?php
req("auth","DateUtil","pdo","LogUtil");
function enableIter() {
    if (param("enableIter",false)) {
        pdo_enableIter();
    }
}
class TeacherLogController {
    static function getFileNames() {
        $p=self::parseUser();
        $user=$p["user"];
        $teacher=$p["teacher"];
        $class=$user->getClass();
        if (!$teacher && !$class->getOption("showOtherStudentsLogs")) {
            throw new Exception("You cannot see logs");
        }
        $classid=param("classid",NULL);
        if ($classid && strpos( $_SERVER["HTTP_HOST"],"localhost")!==FALSE ) {

        } else {
            //$class=Auth::curClass2();
            //$teacher=Auth::curTeacher()->id;
            $classid=$class->id;
        }

        $day=DateUtil::toInt(param("day"));
        $sel=pdo_select("select user,filename,time ".
        "from log where class=? and time>=? and time<=?".
        "order by user, time",
        $classid,$day,$day+86400);
        header("Content-type: text/plain");
        foreach ($sel as $r) {
            echo $r->user."\t".preg_replace("/\n/","",$r->filename)."\t".$r->time."\n";
        }
        //echo $day;
    }
    static function view1Dates() {
        $day=DateUtil::toInt(param("day",DateUtil::now()));
        $p=self::parseUser();
        $user=$p["user"];
        $teacher=$p["teacher"];
        $class=$user->getClass();
        if ($teacher || $class->getOption("showOtherStudentsLogs")) {
            ?>
            <a href=".?TeacherLog/view">他ユーザのログを見る</a>
            <?php
        }
        // If i can do , i do it.
        /*$class=Auth::curClass2();
        $teacher=Auth::curTeacher();
        if($teacher) {
            $teacherID=Auth::curTeacher()->id;
            $userName=param("user",null);
            if (!$userName) {
                $targetUser=Auth::curUser2();
                $userName=$targetUser->name;
            }
            $user=$class->getUser($userName);
        } else {
            $teacheID="NOT_TEACHER";
            $user=Auth::curUser2();
        }*/
        //print $class->id." , ".$user->name;
        $it=pdo_select_iter("select time,result from log where class=? and user=? order by time desc ",$class->id, $user->name);
        $has=array();
        $ord=array();
        req("DateUtil");
        $prevTime=0;
        $prevResult="";
        foreach ($it as $obj) {
            if (strpos($obj->result,'Save')===false && strpos($obj->result,'rename')===false) {
                if (!(($obj->time)-$prevTime<=1 &&
                $obj->result==$prevResult &&
                strpos(mb_strtolower($obj->result),'runtime')!==false)) {
                    $day=DateUtil::toDayTop($obj->time);
                    if (isset($has[$day])) {$has[$day]++;continue;}
                    $has[$day]=1;
                    array_push($ord, $day);
                }
                $prevTime=$obj->time;
                $prevResult=$obj->result;
            }
        }
        ?>
        <h1>ユーザ<?= $user->name ?>のログ一覧</h1>
        <?php
        foreach ($ord as $day) {
            ?>
            <?= DateUtil::toString($day) ?>(<?=$has[$day] ?>):
            <a href=".?TeacherLog/view1new&day=<?= $day ?>&user=<?= $user->name ?>">
                一部
            </a>
            |
            <a href=".?TeacherLog/view1new&day=<?= $day ?>&user=<?= $user->name ?>&all=1">
                詳細
            </a>
            <BR/>
            <?php
        }
    }
    static function parseUser() {
        enableIter();
        req("LogFileToDBController");
        LogFileToDBController::run();
        $class=Auth::curClass2();
        $teacherObj=Auth::curTeacher();
        $canSeeOtherUsersLogs=0;
        if($teacherObj && $teacherObj->isTeacherOf($class)) {
            $teacher=$teacherObj->id;
            $user=param("user",null);
            if (!$user) {
                $targetUser=Auth::curUser2();
                $user=$targetUser->name;
            }
            $targetUser=$class->getUser($user);
            $canSeeOtherUsersLogs=1;
        } else {
            $teacherObj=null;
            $teacher="NOT_TEACHER";
            $targetUser=Auth::curUser2();
            if (!$targetUser) {
                die("Not logged in");
            }
            if ($class->getOption("showOtherStudentsLogs")) {
                $canSeeOtherUsersLogs=1;
                $user=param("user",null);
                if ($user) {
                    $targetUser=$class->getUser($user);
                }
            }
            //$user=$targetUser->name;
        }
        return array("user"=>$targetUser, "teacher"=>$teacherObj,
        "canSeeOtherUsersLogs"=>$canSeeOtherUsersLogs);
    }
    static function getLogClusters() {
        $day=DateUtil::toInt(param("day",DateUtil::now()));
        $days=param("days",1);
        // If i can do , i do it.
        $p=self::parseUser();
        $targetUser=$p["user"];

        $base=DateUtil::getYear($day)."-".DateUtil::getMonth($day)."-".DateUtil::getDay($day)." 00:00:00";
        $baseInt=DateUtil::toInt($base);
        //echo $day." ".$base." ".$baseInt;
        $all=param("all",false);
        $prevTime=0;
        $prevResult="";
        $logs2=Array();
        $logs=$targetUser->getAllLogs($baseInt,$baseInt+$days*86400);
        req("LogCluster");
        $c=null;
        foreach($logs as $i=>$l){
            if (!LogUtil::isValidEntry($l)) {
                continue;
            }
            if (!$c) {
                $c=new LogCluster();
            }
            if (!$c->collect($l)) {
                $logs2[]=$c->withRaw();
                $c=new LogCluster();
                $c->collect($l);
            }
        }
        if ($c) $logs2[]=$c->withRaw();
        header("Content-type: text/json");
        print json_encode($logs2);
    }
    static function getLogs() {
        // ある日のあるユーザの全ログ（all=1のとき）を，JSONで返してくれる．
        $day=DateUtil::toInt(param("day",DateUtil::now()));
        // If i can do , i do it.
        $p=self::parseUser();
        $targetUser=$p["user"];

        $base=DateUtil::getYear($day)."-".DateUtil::getMonth($day)."-".DateUtil::getDay($day)." 00:00:00";
        $baseInt=DateUtil::toInt($base);
        //echo $day." ".$base." ".$baseInt;
        $all=param("all",false);
        $prevTime=0;
        $prevResult="";
        $logs2=Array();
        $logs=$targetUser->getAllLogs($baseInt,$baseInt+86400);
        foreach($logs as $i=>$l){
            if(strpos($l['result'],'Save')===false && strpos($l['result'],'rename')===false){
              //if(array_key_exists($i+1,$logs)){
                //没：次のログが3秒以上後，または 「実行しました（実行しようとしました）」ではない
                //if($logs[$i+1]['time']-$l['time']>=3 || ($logs[$i+1]['time']-$l['time']<3 && $l['detail']!="実行しました")) {
                // 実行しました（実行しようとしました）  は除外(all=1で表示可能)
                /*
                除外されるもの
                    (detailが実行しました|| ビルドしました )<-allが1なら除外しない
                      ||
                    (1秒以内に隣り合っているもので，しかも1個前と結果が同じ，ただし、1回目のruntime errorは除外しない)
                */
                if((($l['detail']!="実行しました" &&
                    //$l['detail']!="ビルドしました" &&
                    strpos($l['result'],'Build')===false
                ) || $all) &&
                // 1秒以内に隣り合っているもので，しかも1個前と結果が同じ，しかもruntime errorは除外
                // => runtime errorが連続で出ているものは除外
                    !($l['time']-$prevTime<=1 &&
                    $l['result']==  $prevResult &&
                    strpos(mb_strtolower($l['result']),'runtime')!==false)
                ) {
                    array_push($logs2,$l);
                }
                $prevTime=$l['time'];
                $prevResult=$l['result'];
            }
        }
        header("Content-type: text/json");
        print json_encode($logs2);
    }
    static function view1new() {
        $p=self::parseUser();
        $logid=param("logid", false);
        //print_r($p);
        if ($logid && $p["canSeeOtherUsersLogs"]) {
            //$log=LogUtil::get($id);
            $log=pdo_select1("select * from log where id = ?",$logid);
            //print_r($log);
            $day = DateUtil::toDayTop($log->time);
            $userName=$log->user;
            $curClass=$p["user"]->_class;
            if ($log->class !== $curClass->id) {
                throw new Exception(" Class is different");
            }
            $targetUser=$curClass->getUser($userName);
        } else {
            $day=DateUtil::toInt(param("day",DateUtil::now()));
            $targetUser=$p["user"];
            $userName=$targetUser->name;
        }
        $all=param("all",false);
        $teacherObj=Auth::curTeacher();
        if ($teacherObj) {
            $teacherID=$teacherObj->id;
        } else {
            $teacherID="";
        }
        ?>
<html>
    <head>
        <script type="text/javascript" src="js/lib/jquery-1.12.1.js"></script>
        <script type="text/javascript" src="js/lib/jquery-ui.js"></script>
        <script type="text/javascript" src="js/lib/difflib.js"></script>
        <script type="text/javascript" src="js/lib/diffview.js"></script>
        <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
        <link rel="stylesheet" href="css/jquery-ui.css"></link>
        <link rel="stylesheet" href="css/diffview.css"></link>
        <link rel="stylesheet" href="css/logViewer.css"></link>
        <script>
            classID='<?= $targetUser->_class->id ?>';
            userId='<?= $userName ?>';
            day=<?= $day ?>;
            all=<?= ($all?"true":"false") ?>;
            teacherID='<?= $teacherID ?>';
            reloadMode=0;
            logsOfOneUser=[];
            programs=[];
            var indexList=[];
            $(()=>view1new());
        </script>
        <script src="js/log/logViewer.js"></script>
        <script src="js/log/getlog.js"></script>
        <title><?= $userName ?></title>
    </head>
    <body>
        <div id="fileList" style="float:left; overflow-y:auto; height:100%; width:20%; resize:horizontal;">
            <!--
            <script>
                if(!programs["${FILENAME}"]) programs["${FILENAME}"]=[];
                    programs["${FILENAME}"].push({"date":"2018/11/15","time":"10:31:24","lang":"C","filename":"/home/${CLASSID}/${USERID}/${FILENAME}","result":"C Run","detail":"Hello! words","code":{"C":"#include<stdio.h>\n// C\nint main(void ) {\n    printf(\"Hello! words\");\n}","HTML":"<html>\n\n</html>"}});
            </script>
            -->
            <!--
            <div>${FILENAME}</div>
            <div onClick="showLogOneUser.call(this,'${LOGID}','${USERID}','${FILENAME}');"
                id='${LOGID}'
            ><font color="black">${FILENAME}</font></div>
            <script>
                 showFileEntry(${L});
            </script>
            -->
        </div>
        <div id="fileDetail" style="float:left; width:30%;">
            <div id="<?= $userName ?>res"></div><br>
            <textarea id="<?= $userName ?>" style="width:100%;" onclick="this.select(0,this.value.length)" readonly></textarea>
            <textarea id="<?= $userName ?>detail" style="width:100%;" readonly></textarea>
        </div>
        <div id="diffArea" style="float:left;">
            <span id="<?= $userName ?>diff"></span><br>
            <span id="<?= $userName ?>diffLast"></span>
        </div>
    </body>
</html>
        <?php
    }
    static function view1() {
        // focus to one student
        $day=DateUtil::toInt(param("day",DateUtil::now()));
        // If i can do , i do it.
        $class=Auth::curClass2();
        $teacherObj=Auth::curTeacher();
        if($teacherObj) {
            $teacher=Auth::curTeacher()->id;
            $user=param("user",null);
            if (!$user) {
                $targetUser=Auth::curUser2();
                $user=$targetUser->name;
            }
            $targetUser=$class->getUser($user);
        } else {
            $teacher="NOT_TEACHER";
            $targetUser=Auth::curUser2();
            $user=$targetUser->name;
        }
        ?>
        <script type="text/javascript" src="js/lib/jquery-1.12.1.js"></script>
        <script type="text/javascript" src="js/lib/jquery-ui.js"></script>
        <script type="text/javascript" src="js/lib/difflib.js"></script>
        <script type="text/javascript" src="js/lib/diffview.js"></script>
        <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
        <link rel="stylesheet" href="css/jquery-ui.css"></link>
        <link rel="stylesheet" href="css/diffview.css"></link>
        <script>
            classID='<?=$class->id?>';
            teacherID='<?=$teacher?>';
            userId='<?=$targetUser->name?>';
            reloadMode=0;
            logsOfOneUser=[];
        </script>
        <script src="js/log/logViewer.js"></script>
        <script src="js/log/getlog.js"></script>
        <?php
        //$now=DateUtil::now();
        //"Y-m-d H:i:s"
        $base=DateUtil::getYear($day)."-".DateUtil::getMonth($day)."-".DateUtil::getDay($day)." 00:00:00";
        $baseInt=DateUtil::toInt($base);
        //echo $day." ".$base." ".$baseInt;
        $logs=$targetUser->getAllLogs($baseInt,$baseInt+86400);
        if (count($logs)===0) {
            echo "この日のログはありません．";
            ?>
            <a href=".?TeacherLog/view1Dates&user=<?= $user ?>">他の日のログを見る</a>
            <?php
            return;
        }
        ?>
        <div style="float:left; overflow-y:auto; height:100%; width:20%; resize:horizontal;">
          <script>
          programs=[];
          </script>
          <?php
          $all=param("all",false);
          $prevTime=0;
          $prevResult="";
          $logs2=Array();
          foreach($logs as $i=>$l){
            if(strpos($l['result'],'Save')===false && strpos($l['result'],'rename')===false){
              //if(array_key_exists($i+1,$logs)){
                //没：次のログが3秒以上後，または 「実行しました（実行しようとしました）」ではない
                //if($logs[$i+1]['time']-$l['time']>=3 || ($logs[$i+1]['time']-$l['time']<3 && $l['detail']!="実行しました")) {
                // 実行しました（実行しようとしました）  は除外(all=1で表示可能)
                if(($l['detail']!="実行しました" || $all) &&
                // 1秒以内に隣り合っているもので，しかも1個前と結果が同じ，しかもruntime errorは除外
                // => runtime errorが連続で出ているものは除外
                    !($l['time']-$prevTime<=1 &&
                    $l['result']==$prevResult &&
                    strpos(mb_strtolower($l['result']),'runtime')!==false)
                ) {
                  array_push($logs2,$l);
                  ?>
                  <script>
                  if(!programs["<?=$l['filename']?>"]) programs["<?=$l['filename']?>"]=[];
                  programs["<?=$l['filename']?>"].push(<?=$l['raw']?>);

                  </script>
                  <?php
                }
              //}
              $prevTime=$l['time'];
              $prevResult=$l['result'];
            }
          }
          //if(strpos($l['result'],'Save')===false && strpos($l['result'],'rename')===false) array_push($logs2,$l);
          ?>
          <script>
          var indexList=[];
          console.log("programs", programs, '<?= count($logs2) ?>');
          </script>
          <?php
          foreach($logs2 as $l){
            //if(strpos($l['result'],'Save')===false && strpos($l['result'],'rename')===false && ($l['time']-$prevTime>=0 || $prevResult!=$l['result'])){
              ?>
              <!--<div><?=$l['filename']?></div>-->
              <div onClick="showLogOneUser.call(this,'<?=$l['id']?>','<?=$l['user']?>','<?=$l['filename']?>');"
                    id='<?=$l['id']?>'
                  ><font color="<?=strpos($l['result'],'Error')!==false ? 'red' : 'black'?>"><?=$l['filename']?></font></div>
              <script>
              showFileEntry(<?=json_encode($l)?>);
              </script>
              <?php
            //} else {
               //echo "Skip l={res=".$l['result']." time=".$l['time']."}, p={T=$prevTime , res=$prevResult},".
               //" [".(strpos($l['result'],'Save')===false)."]  [".($prevTime-$l['time'])."]  [".($prevResult!=$l['result']) ."]<BR>";
           //}
            $prevTime=$l['time'];
            $prevResult=$l['result'];
          }
          if (param("logid",false)) {
              echo "<script>document.getElementById('".param("logid")."').click();</script>";
          }
          ?>
        </div>
        <div style="float:left; width:30%;">
        <div id="<?=$user?>res"></div><br>
        <textarea id="<?=$user?>" style="width:100%;" onclick="this.select(0,this.value.length)" readonly></textarea>
        <textarea id="<?=$user?>detail" style="width:100%;" readonly></textarea>
        </div>
        <div style="float:left;">
        <span id="<?=$user?>diff"></span><br>
        <span id="<?=$user?>diffLast"></span>
      </div>
        <?php
    }
    static function userWeight() {
        $r=pdo_select("select user, count(*) as count from log_annotation as a inner join log on a.target=log.id group by user ");
        $anonCount=[];
        foreach ($r as $e) {
            $anonCount[$e->user]=$e->count;
        }
        print_r($anonCount);
        // if (短い || isset($anonCount[$user])) {
        //    //プログラム全文表示
        // } else {
        //    // プログラムの一部を表示
        // }
    }
    static function getActualtime2($user,$file, $dateMax=null) {
        req("LogQueryController");
        $class=Auth::curClass2();
        if ($dateMax) $drange=[0,$dateMax];
        else $drange=null;
        $it=LogQueryController::get($class, $drange, $user, $file, 100000, "asc");
        $prev=null;
        if (!defined("IDLE_TIME")) define("IDLE_TIME",300);
        $actTime2=0;
        foreach ($it as $log) {
            if (!$prev) { $prev=$log; continue; }
            $elapsedFromLast=$log->time-$prev->time;
            if ($elapsedFromLast>=IDLE_TIME) {
                $actTime2+=IDLE_TIME;
            } else {
                $actTime2+=$elapsedFromLast;
            }
            $prev=$log;
        }
        return $actTime2;
    }
    static function bot() {
        date_default_timezone_set('Asia/Tokyo');
        $class=Auth::curClass2();
        if (!$class->getOption("showOtherStudentsLogs")) {
            Auth::assertTeacher();
        }
        req("LogFileToDBController");
        LogFileToDBController::run();

        $thisURL="a.php?TeacherLog/bot";
        $now=time();
        $interval=param('interval',300);
        if(!param("Y",false)){
            $min=$now-$interval;
            $max=$now;
        }else{
            $max=strtotime(param('Y')."/".param('m')."/".param('d')." ".param('H').":".param('i').":".param('s'));
            $min=$max-$interval;
            //$max=strtotime(param('aY')."/".param('am')."/".param('ad')." ".param('aH').":".param('ai').":".param('as'));
        }
        $next=$max+$interval;
        echo param("Y",false);
        echo param("s",false);
        ?>
        <script>
        // $interval秒後にリロードされて，$interval秒進んだあとの結果が表示される
        setTimeout( function () {
            document.forms.dateform.submit();
        },<?= $interval*1000 ?>);
        </script>
        <form name="dateform" action="<?= $thisURL ?>" method="POST">
            <input name="Y" value="<?=date("Y",$next)?>" maxlength="4" size="4">年
            <input name="m" value="<?=date("m",$next)?>" maxlength="2" size="2">月
            <input name="d" value="<?=date("d",$next)?>" maxlength="2" size="2">日
            <input name="H" value="<?=date("H",$next)?>" maxlength="2" size="2">時
            <input name="i" value="<?=date("i",$next)?>" maxlength="2" size="2">分
            <input name="s" value="<?=date("s",$next)?>" maxlength="2" size="2">秒<br>
    	    <input type="submit" value="Botで送る"/>
    	</form><?php
        $logs=$class->getAllLogs($min,$max);
        $slack_bot_url=$class->getOption("botURL");
        print "BOT URL=$slack_bot_url<BR>\n";
        //print_r ($logs);
        $errorLogs=[];
        $prevTime=0;
        $prevResult=0;
        $errorSolved=[];
        foreach($logs as $log){
            /*echo "<HR>\n";
            print_r($log);
            print("<BR> raw=");*/
            $raw=json_decode($log["raw"]);
            /*print_r($raw);
            print("<BR> result=");
            print($raw->result);*/
            $id=$log["id"];
            $time=$log["time"];
            $nEtime="";
            $result=/*json_decode*/($log["result"]);
            $name=/*json_decode*/($log["user"]);
            $filename=/*json_decode*/($log["filename"]);
            $nEcode="";
            $code=LogUtil::getCode($raw);
            $detail=json_decode($log["detail"]);
            if(strpos($result,'Error') !== false){
                // URL設定はdata/config.shadow.php に移転しました。
                //$url = $slack_bot_url;
                $mesg="";
                if ($detail && isset($detail->message)) {
                    $mesg=$detail->message;
                }
                if ($detail && isset($detail->pos)) {
                    $pos=$detail->pos;
                    $code=mb_substr($code, 0, $pos).":exclamation:".mb_substr($code,$pos);
                }
                if (!($log['time']-$prevTime<=1 &&
                $log['result']==$prevResult &&
                strpos(mb_strtolower($log['result']),'runtime')!==false)) {
                    $errorLogs[]=array("user"=>$name, "mesg"=>$mesg, "code"=>$code, "time"=>$time,"filename"=>$filename,"id"=>$id);
                }
                $prevTime=$log['time'];
                $prevResult=$log['result'];

                /*if(strpos($name,$log["user"]) !== false){
	                if($time>$nEtime){
	                    $nEtime=$time;
	                    $nEcode=$code;
	                }
                }
                //https://api.slack.com/messaging/webhooks
                $data = array(
                    'payload' => json_encode( array(
                        "text"=>"最新(過去)エラー配信テスト\n$id\n$name\n$filename\n$mesg\n$nEcode"
                        "blocks"=>array(
        		                array(    "type"=> "section",
        		                    "text"=> array(
        			                        "type"=> "mrkdwn",
        			                        "text"=> "Danny Torrence left the `following` review for your property:"
                                        ))
        	             )
                    ))
                );

                $context = array(
                    'http' => array(
                                 'method'  => 'POST',
                                 'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
                                 'content' => http_build_query($data)
                    )
                );

                $html = file_get_contents($url, false, stream_context_create($context));

                var_dump($http_response_header);

                echo $html;*/
            } else if(strpos($result,'Unsaved') !== false) {
            } else if(strpos($result,'Build')!==false) {
            } else if(strpos($result,'Save')!==false) {
            } else {// うまくいっている？
                $errorSolved[$name]=$time;
            }
        }
        //print_r($errorLogs);
        //ユーザごとに集計
        /*$logs=[
            ["user"=>"a", "mesg"=>"Error1"],
            ["user"=>"a", "mesg"=>"Error2"],
            ["user"=>"b", "mesg"=>"Error3"],
            ["user"=>"a", "mesg"=>"Error4"],
            ["user"=>"b", "mesg"=>"Error5"],
            ["user"=>"a", "mesg"=>"Error6"],
        ];
*/
        // $stat:
        // ["a"=>  ["Error1","Erro2","Error4","Error6"],  "b"=>["Error3","Error5"]]
        $stat=[];
        foreach ($errorLogs as $log) {
            $user=$log["user"];
            $mesg=$log["mesg"];
            $time=$log["time"];
            $filename=/*json_decode*/($log["filename"]);
            $code="";
            $id=$log["id"];

            if (!isset($stat[$user])) {
                $stat[$user]=[];
            }
            $stat[$user][]=$log;
        }
        print_r("--------");
        //print_r($stat);
        uasort($stat, function ($a, $b) { return count($a)-count($b); } );
        $buffer="エラー：";
        //$url="";
        foreach ($stat as $s) {
          //print_r($s);
          print_r("--------");
          $count=count($s);
          //print_r($s[$count-1]);
          //$url = $slack_bot_url;
          $mesg=$s[$count-1]["mesg"];
          $name=$s[$count-1]["user"];
          $code=$s[$count-1]["code"];
          $filename=$s[$count-1]["filename"];
          $id=$s[$count-1]["id"];
          $lastErrorTime=$s[$count-1]["time"];

          $solved="未解決";
          if (isset($errorSolved[$name]) && $errorSolved[$name]>$lastErrorTime) {
              $solved="解決済み";
          }else{
  //https://api.slack.com/messaging/webhooks

          $URL=BA_TOP_URL."?TeacherLog/view1new&logid=$id";
          $option=[
            'http' => [
              'method'  => 'GET',
              'timeout' => 600, // タイムアウト時間
            ]
          ];
          if (defined("HINT_URL")){
            $Hint=@file_get_contents(HINT_URL."?path=/home/$class->id/$name/$filename",false,stream_context_create($option));
          } else {
            $Hint="";
          }

          $Hint=str_replace('<h1>','',$Hint);
          $Hint=str_replace('</h1>','',$Hint);
          $Hint=str_replace('<br/>','',$Hint);
          $Hint=str_replace('<BR/>','',$Hint);
          $Hint=str_replace('メインページ','',$Hint);

          $mesg=mb_substr($mesg,0,100);

          $user=$class->getUser($name);

          $a2=self::getActualtime2($user,$filename);

          $element="test $URL $name ($count 件) $filename $mesg \n Actualtime2= $a2 \n $name \n $filename で苦戦中のようなので，ヒントを貼っておきます．それでもわからないなら遠慮なく質問してください． \n$Hint";

          $buffer.="[".$element."]\n";
          /*
          $data = array(
              'payload' => json_encode( array(
                  "text"=>BA_TOP_URL."?TeacherLog/view1new&logid=$id $name($count 件) $filename $mesg"
                  /*"blocks"=>array(
                      array(    "type"=> "section",
                          "text"=> array(
                                "type"=> "mrkdwn",
                                "text"=> "Danny Torrence left the `following` review for your property:"
                              ))
                 )*/
               /*))
          );

          $context = array(
              'http' => array(
                     'method'  => 'POST',
                     'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
                     'content' => http_build_query($data)
              )
          );

          $html = file_get_contents($url, false, stream_context_create($context));

          var_dump($http_response_header);

          echo $html;*/

          }



        }
        if($solved=="未解決"){
          $data = array(
              'payload' => json_encode( array(
                  "text"=>$buffer
                  /*"blocks"=>array(
                      array(    "type"=> "section",
                          "text"=> array(
                                "type"=> "mrkdwn",
                                "text"=> "Danny Torrence left the `following` review for your property:"
                              ))
                 )*/
               ))
          );

          $context = array(
              'http' => array(
                     'method'  => 'POST',
                     'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
                     'content' => http_build_query($data)
              )
          );

          $html = file_get_contents($slack_bot_url, false, stream_context_create($context));
          print ("Sent Message: $buffer");
          var_dump($http_response_header);
          echo $html;
        }

      }


    static function bot_noerr() {
      date_default_timezone_set('Asia/Tokyo');
      $class=Auth::curClass2();
      if (!$class->getOption("showOtherStudentsLogs")) {
          Auth::assertTeacher();
      }
      req("LogFileToDBController");
      LogFileToDBController::run();

      $thisURL="a.php?TeacherLog/bot_noerr";
      $now=time();
      $interval=param('interval',300);
      if(!param("Y",false)){
          $min=$now-$interval;
          $max=$now;
      }else{
          $max=strtotime(param('Y')."/".param('m')."/".param('d')." ".param('H').":".param('i').":".param('s'));
          $min=$max-$interval;
          //$max=strtotime(param('aY')."/".param('am')."/".param('ad')." ".param('aH').":".param('ai').":".param('as'));
      }
      $next=$max+$interval;
      echo param("Y",false);
      echo param("s",false);
      ?>
      <script>
      // $interval秒後にリロードされて，$interval秒進んだあとの結果が表示される
      setTimeout( function () {
          document.forms.dateform.submit();
      },<?= $interval*1000 ?>);
      </script>
      <form name="dateform" action="<?= $thisURL ?>" method="POST">
      <input name="Y" value="<?=date("Y",$next)?>" maxlength="4" size="4">年
      <input name="m" value="<?=date("m",$next)?>" maxlength="2" size="2">月
      <input name="d" value="<?=date("d",$next)?>" maxlength="2" size="2">日
      <input name="H" value="<?=date("H",$next)?>" maxlength="2" size="2">時
      <input name="i" value="<?=date("i",$next)?>" maxlength="2" size="2">分
      <input name="s" value="<?=date("s",$next)?>" maxlength="2" size="2">秒<br>
      <input type="submit" value="Botで送る"/>
      </form><?php
      $logs=$class->getAllLogs($min,$max);
      $slack_bot_url=$class->getOption("botURL");
      print "BOT URL=$slack_bot_url<BR>\n";
      //print_r ($logs);
      $buffer=[];
      $prevTime=0;
      $prevResult=0;
      $stat=[];
      foreach ($logs as $log) {
          $user=$log["user"];
          $time=$log["time"];
          $filename=/*json_decode*/($log["filename"]);
          $code="";
          $id=$log["id"];
          if (!isset($stat[$user])) {
              $stat[$user]=[];
          }
          $stat[$user][]=$log;
      }
      print_r("--------");
      //print_r($stat);
      //$url="";
      foreach ($stat as $s) {
          //print_r($s);
          //print_r("--------");
          $count=count($s);
          //print_r($s[$count-1]);
          //$url = $slack_bot_url;
          $name=$s[$count-1]["user"];
          $filename=$s[$count-1]["filename"];
          $id=$s[$count-1]["id"];
          $lastErrorTime=$s[$count-1]["time"];
          $user=$class->getUser($name);
          $a2=self::getActualtime2($user,$filename,$max);
          if ($a2>900) {
              $URL=BA_TOP_URL."?TeacherLog/view1new&logid=$id&all=1";
              $option=[
                  'http' => [
                      'method'  => 'GET',
                      'timeout' => 600, // タイムアウト時間
                  ]
              ];
              if (defined("HINT_URL")){
                  $Hint=@file_get_contents(HINT_URL."?path=/home/$class->id/$name/$filename",false,stream_context_create($option));
              } else {
                  $Hint="";
              }

              $Hint=str_replace('<h1>','',$Hint);
              $Hint=str_replace('</h1>','',$Hint);
              $Hint=str_replace('<br/>','',$Hint);
              $Hint=str_replace('<BR/>','',$Hint);
              $Hint=str_replace('メインページ','',$Hint);

              //$mesg=mb_substr($mesg,0,100);

              $user=$class->getUser($name);

              $element="test $URL $name  $filename \n Actualtime2= $a2 \n $name \n $filename で苦戦中のようなので，ヒントを貼っておきます．それでもわからないなら遠慮なく質問してください． \n$Hint";
              $buffer[]=[$a2, $element];//"[".$element."]\n";

          }
      }
      if(count($buffer)>0) {
          uasort($buffer, function ($a, $b) { return $a[0]-$b[0]; } );
          $buffer=array_map(function ($e){return $e[1];}, $buffer);
          $data = array(
          'payload' => json_encode( array(
          "text"=>implode( "\n", $buffer)
          ))
          );

          $context = array(
          'http' => array(
          'method'  => 'POST',
          'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
          'content' => http_build_query($data)
          )
          );

          $html = file_get_contents($slack_bot_url, false, stream_context_create($context));
          var_dump($http_response_header);
          echo $html;
      }
    }


    static function view() {
        date_default_timezone_set('Asia/Tokyo');
        $showActTime=param("showActTime",true);
        $class=Auth::curClass2();
        if (!$class->getOption("showOtherStudentsLogs")) {
            Auth::assertTeacher();
        }
        $teacherObj=Auth::curTeacher();
        if ($teacherObj) {
            $teacher=$teacherObj->id;
        } else {
            $teacher="";
        }
        $now=time();
        $interval=param('interval',600);
        if(!param("Y",false)){
            $min=$now-$interval;
            $max=$now;
        }else{
            $min=strtotime(param('Y')."/".param('m')."/".param('d')." ".param('H').":".param('i').":".param('s'));
            $max=strtotime(param('aY')."/".param('am')."/".param('ad')." ".param('aH').":".param('ai').":".param('as'));
        }
        $reloadMode=param('reloadMode',0);
        $students=$class->getAllStu();
        $runcount=Array();
        $runhistory=[];
        ?>
        <script>
          logs=[];
        </script>
        <?php
        foreach($students as $s){
          $runcount[$s->name]=0;
          $errcount[$s->name]=0;
          $latestrun[$s->name]='実行していません';
          $runhistory[$s->name]='<span id="'.$s->name.'hist">';
          $latestfile[$s->name]="";

          ?>
          <script>
          logs["<?=$s->name?>"]=[];
          </script>
          <?php
        }
        ?>
        <script>
        if ("<?=$teacher?>") logs["<?=$teacher?>"]=[];
        </script>
        <?php
        $logs=$class->getAllLogs($min,$max);
        foreach($logs as $log){
            if(!isset($runcount[$log['user']])){
                $runcount[$log['user']]=0;
            }
            if(!isset($runhistory[$log['user']])){
                $runhistory[$log['user']]='<span id="'.$log['user'].'hist">';
            }
            $fnid=str_replace("/","__",$log['filename']);
            $fnid=str_replace(".","__",$fnid);
            if(strpos($log['result'],'Error')!==false){
				$runcount[$log['user']]++;
                if(isset($errcount[$log['user']])){
                    $errcount[$log['user']]++;
                }else{
                    $errcount[$log['user']]=1;
                }
                $runhistory[$log['user']]='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));"><font color="red">E</font></span>'.$runhistory[$log['user']];
            }else if(strpos($log['result'],'Run')!==false){
				$runcount[$log['user']]++;
                $runhistory[$log['user']]='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">R</span>'.$runhistory[$log['user']];
            }else if(strpos($log['result'],'Save')!==false){
                $runhistory[$log['user']]='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">S</span>'.$runhistory[$log['user']];
            }else if(strpos($log['result'],'Build')!==false){
                $runhistory[$log['user']]='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">B</span>'.$runhistory[$log['user']];
            }else if(strpos($log['result'],'Unsaved')!==false){
                $runhistory[$log['user']]='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">U</span>'.$runhistory[$log['user']];
            }
            if(!isset($errcount[$log['user']])){
                $errcount[$log['user']]=0;
            }
            $latestrun[$log['user']]=$max-$log['time'];
            $latestfile[$log['user']]=$log['filename'];
            ?>
            <script>
            logs["<?=$log['user']?>"].push(<?=$log['id']?>);
            </script>
            <?php

        }
        foreach($runhistory as $runhistkey => $runhistval){
            $runhistory[$runhistkey].='</span><br id="'.$runhistkey.'ui" style="display:none"><button id="'.$runhistkey.'ui" style="display:none" data-user='.$runhistkey.' onclick="getOneUsersLogId(this.getAttribute('."'".'data-user'."'".'),'."'".'next'."'".')">Next</button>  <button id="'.$runhistkey.'ui" style="display:none" data-user='.$runhistkey.' onclick="getOneUsersLogId(this.getAttribute('."'".'data-user'."'".'),'."'".'prev'."'".')">Prev</button><span id="'.$runhistkey.'res" style="display:none"></span><br><span id="'.$runhistkey.'diff" style="display:none" ></span><textarea rows=10 cols=60 id="'.$runhistkey.'" style="display:none" onclick="this.select(0,this.value.length)">test</textarea>';
        }
        $thisURL="a.php?TeacherLog/view";
        ?>
        <script type="text/javascript" src="js/lib/jquery-1.12.1.js"></script>
        <script type="text/javascript" src="js/lib/jquery-ui.js"></script>
        <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
        <script type="text/javascript" src="js/lib/difflib.js"></script>
        <script type="text/javascript" src="js/lib/diffview.js"></script>
        <link rel="stylesheet" href="css/jquery-ui.css"></link>
        <link rel="stylesheet" href="css/diffview.css"></link>
        <script>
            reloadMode=<?=$reloadMode?>;
            interval=<?=$interval?>;
            classID='<?=$class->id?>';
            teacherID='<?=$teacher?>';
            thisURL='<?=$thisURL?>';
        </script>
        <script src="js/log/logViewer.js"></script>
        <div id="detail" style="display:none;"></div>
        <a href="a.php?Class/show">クラス管理に戻る</a><hr>
        <h1><?=$class->id?> - ユーザ一覧</h1>
        <button id="reloadButton" onclick="toggleReload()"><?=$reloadMode ? "自動再読み込みを停止" : "自動再読み込みをする"?></button><br>
        対象の時刻を変える<br>
        <form action="<?= $thisURL ?>" method="POST" style="display: inline">
          <input name="interval" value="600" type="hidden">
          <input name="min" value="<?=time()-600?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近10分間"/>
    	</form>
      <form action="<?= $thisURL ?>" method="POST" style="display: inline">
        <input name="interval" value="1800" type="hidden">
        <input name="min" value="<?=time()-1800?>" type="hidden">
          <input name="max" value="<?=time()?>" type="hidden">
        <input type="submit" value="最近30分間"/>
    </form>
        <form action="<?= $thisURL ?>" method="POST" style="display: inline">
          <input name="interval" value="3600" type="hidden">
          <input name="min" value="<?=time()-3600?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近60分間"/>
    	</form>
        <form action="<?= $thisURL ?>" method="POST" style="display: inline">
          <input name="interval" value="5400" type="hidden">
          <input name="min" value="<?=time()-5400?>" type="hidden">
            <input name="max" value="<?=time()?>" type="hidden">
    	    <input type="submit" value="最近90分間"/>
    	</form>
        <form action="<?= $thisURL ?>" method="POST">
            <!--div><input type="checkbox" name="showActTime" <?= $showActTime ? "checked": ""?>>着手時間を表示</div-->
            <input name="Y" value="<?=date("Y",$min)?>" maxlength="4" size="4">年
            <input name="m" value="<?=date("m",$min)?>" maxlength="2" size="2">月
            <input name="d" value="<?=date("d",$min)?>" maxlength="2" size="2">日
            <input name="H" value="<?=date("H",$min)?>" maxlength="2" size="2">時
            <input name="i" value="<?=date("i",$min)?>" maxlength="2" size="2">分
            <input name="s" value="<?=date("s",$min)?>" maxlength="2" size="2">秒から<br>
            <input name="aY" value="<?=date("Y",$max)?>" maxlength="4" size="4">年
            <input name="am" value="<?=date("m",$max)?>" maxlength="2" size="2">月
            <input name="ad" value="<?=date("d",$max)?>" maxlength="2" size="2">日
            <input name="aH" value="<?=date("H",$max)?>" maxlength="2" size="2">時
            <input name="ai" value="<?=date("i",$max)?>" maxlength="2" size="2">分
            <input name="as" value="<?=date("s",$max)?>" maxlength="2" size="2">秒までの<br>
    	    <input type="submit" value="状況を見る"/>
    	</form>
        <hr>
        <a target="panorama" href="?TeacherLog/panorama">最新のソースコード一覧</a>
    	<hr>
      <iframe src="./js/log/timeline/index.html?day=<?=date("Y",$max)?>-<?=date("m",$max)?>-<?=date("d",$max)?>"></iframe><br>
      <a href="./js/log/timeline/index.html?day=<?=date("Y",$max)?>-<?=date("m",$max)?>-<?=date("d",$max)?>" target="_timeline">タイムラインを別画面で見る</a>
      <hr>
    	<?php
    	    echo date("Y/m/d H:i:s",$min)." から ".date("Y/m/d H:i:s",$max)."までの実行状況";
    	?>
        <a href="?TeacherLog/count&min=<?= $min ?>&max=<?= $max ?>">集計....</a>
        <table border=1 class="tablesorter">
            <thead>
            <tr><th>ユーザID</th><th>エラー/実行</th><th>実行からの経過時間</th><th>今実行しているファイル</th><th>着手時間</th><th>実行結果履歴</th>
            </tr>
            </thead>
            <tbody>
        <?php
        //<th>実行時刻</th><th>実行ファイル</th><th>実行結果</th><th>実行詳細</th><th>プログラム</th>
        foreach($runcount as $k => $v){
            $time=self::calcTime($latestrun[$k]);
            $rate=$v!=0?floor($errcount[$k]/$v*100):'--';
            if($rate<40){
                $errcaution="white";
            }else if($rate<60){
                $errcaution="yellow";
            }else if($rate<80){
                $errcaution="orange";
            }else{
                $errcaution="red";
            }
            if($time['m']>15 || $time['h']>0){
                $timecaution="red";
            }else if($time['m']>10){
                $timecaution="orange";
            }else if($time['m']>5){
                $timecaution="yellow";
            }else{
                $timecaution="white";
            }
            ?>
            <tr><td><a href="a.php?TeacherLog/view1new&user=<?=$k?>&day=<?=$max?>" target="view1"><?=$k?></a></td>
            <?php if ($v!=0) { ?>
            <td data-rate="<?=$rate?>" bgcolor=<?=$errcaution?>><?=$errcount[$k]?>/<?=$v?>(<?=$rate?>%)</td>
            <td bgcolor=<?=$timecaution?>><?=str_pad($time['h'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['m'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['s'],2,0,STR_PAD_LEFT)?></td>
            <td><?=$latestfile[$k]?></td>
            <td><?= $latestfile[$k]? self::getActualtime2($class->getUser($k),$latestfile[$k],$max) : "" ?></td>
            <td><?=$runhistory[$k]?></td>
            <?php } else {
                for ($emp=0; $emp<5; $emp++) print "<td></td>";
            } ?>
            </tr>

            <?php
        }
        ?>
        </tbody>
        <?php
    }
    static function calcTime($t){
        if(is_int($t)){
            $ret=Array();
            $ret['h']=floor($t/(3600));
            $ret['m']=floor(($t/60)%60);
            $ret['s']=floor($t%60);
            return $ret;
        }else{
            return Array('h'=>'--','m'=>'--','s'=>'--');
        }
    }
    static function panorama() {
        pdo_enableIter();
        $p=self::parseUser();
        $user=$p["user"];
        $teacher=$p["teacher"];
        $class=$user->getClass();
        if (!$teacher && !$class->getOption("showOtherStudentsLogs")) {
            throw new Exception("You cannot see logs");
        }
        $file=param("file",null);
        $error=param("error",false);
        $wheres=self::buildPanoramaQuery($class, $file, $error);
        $q=self::getPanorama($wheres);
        ?>
        <a href="?TeacherLog/panorama&error=<?= ($error?1:0) ?>">
            Any Files
        </a>
        -
        <a href="?TeacherLog/panorama&file=<?= $file ?>&error=<?= ($error?0:1) ?>">
            Toggle Error
        </a>
        <?php
        print "<hR>\n";
        foreach ($q as $r) {
            /*$raw=json_decode($r->raw);
            if (!is_object($raw)) continue;
            if (isset($shown[$r->user])) {
                $shown[$r->user]++;
                continue;
            }
            $shown[$r->user]=1;*/
            $raw=$r->raw;
            print( DateUtil::toString($r->time)." - ");
            ?>
            <a target="view1" href="?TeacherLog/view1&user=<?=$r->user?>&day=<?=$r->time?>&logid=<?= $r->id?>">
                <?= $r->user ?>
            </a>
            -
            <?= $r->filename ?>:
            <a href="?TeacherLog/panorama&file=<?=$r->filename?>&error=<?= ($error?1:0) ?>">
                Filter
            </a>
            /
            <a href="?TeacherLog/diffSeq&file=<?=$r->filename?>&user=<?= $r->user ?>">
                Timeline
            </a>
            <?php
            print ("<pre>");
            print (htmlspecialchars(self::getCode($raw)));
            print ("</pre>");
            if (strpos($r->result,"Error")!==false) {
                print ("<h2>Error</h2>");
                print ("<pre>");
                $detail=$raw->detail;
                if (is_string($detail)) {
                    print htmlspecialchars($raw->detail);
                } else if ($detail && is_object($detail)) {
                    print htmlspecialchars(json_encode($raw->detail));
                }
                print ("</pre>");
            }
            print ("<hR>\n");
        }
    }
    static function buildPanoramaQuery($class, $file=null, $error=false) {
        $wheres=[];
        $wheres[]=["class=?",$class->id];
        if ($file) {
            $wheres[]=[' filename=? ',$file];
        }
        if ($error) {
            $wheres[]=" result like '%Error%' ";
        }
        return $wheres;
    }
    static function getPanoramaStat($wheres) {
        //$wheres=self::buildPanoramaQuery($class, $file, $error);
        return pdo_select_ands(
            "select max(time) as last, count(*) as count, user from log ".
            "where ? group by user ",$wheres);
    }
    static function getPanorama($wheres) {
        //$wheres=self::buildPanoramaQuery($class, $file, $error);
        $minq=self::getPanoramaStat($wheres);
        $mint=time();
        foreach ($minq as $m) {
            if ($mint > $m->last) $mint=$m->last;
        }
        $wheres[]=[' time>=? ',$mint];
        $q=pdo_select_ands(
            "select * from log ".
            "where ? order by time desc ",$wheres);
        $shown=[];
        foreach ($q as $r) {
            $raw=json_decode($r->raw);
            if (!is_object($raw)) continue;
            if (isset($shown[$r->user])) {
                $shown[$r->user]->count++;
            } else {
                $shown[$r->user]=$r;
                $r->count=0;
                $r->raw=$raw;
            }
        }
        return $shown;
    }
    static function getCode($r) {
        if (!isset($r->code)) return "";
        if (!is_object($r->code)) return "";
        foreach ($r->code as $k=>$v) {
            return $v;
        }
        return "";
    }
    static function diffSeq() {
        $p=self::parseUser();
        $user=$p["user"];
        $teacher=$p["teacher"];
        $class=$user->getClass();
        $file=param("file");
        $hint=param("hint",false);
        if ($hint) {
            $wheres=self::buildPanoramaQuery($class, $file, false);
            $stat=self::getPanoramaStat($wheres);
            $cands=[];
            foreach ($stat as $r) {
                $cands[]=$r;//print_r($r);
            }
            $user=$class->getUser($cands[random_int(0,count($cands)-1)]->user);
        }
        ?>
        <html>
            <head>
                <script type="text/javascript" src="js/lib/jquery-1.12.1.js"></script>
                <script type="text/javascript" src="js/lib/jquery-ui.js"></script>
                <script type="text/javascript" src="js/lib/difflib.js"></script>
                <script type="text/javascript" src="js/lib/diffview.js"></script>
                <script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
                <style>
                    pre{	border: solid black 1px;}
                </style>
                <link rel="stylesheet" href="css/jquery-ui.css"></link>
                <link rel="stylesheet" href="css/diffview.css"></link>
                <script>
                    reloadMode=false;
                </script>
                <script src="js/log/logViewer.js"></script>
                <script src="js/log/getlog.js"></script>
                <script src="js/log/diffSeq.js"></script>
            </head>
            <body>
                <?php if ($hint) { ?>
                    <a href="?TeacherLog/diffSeq&file=<?= $file ?>&hint=1">他のヒントを見る</a>
                    <hr/>
                <?php } ?>
                <h2><?= $file ?></h2>

            </body>
            <script>
                diffSeq('<?= $user->name ?>', '<?= $file ?>');
            </script>
        </html>
        <?php
    }
    static function activityMatrix() {
        Auth::assertTeacher();
        $teacherObj=Auth::curTeacher();
        $class=Auth::curClass2();
        $base=param("base");
        req("DateUtil");
        $base=DateUtil::toInt($base);
        $zoneWidth=86400*7;
        pdo_enableIter();
        $logs=pdo_select_iter("select user,time from log where class=?", $class->id);
        $mat=array();// user=> (zone=>count)
        $zonemax=-1000;
        foreach ($logs as $log) {
            $user=$log->user;
            $zone= intval( ($log->time-$base)/$zoneWidth );
            if ($zone>$zonemax) $zonemax=$zone;
            if (!isset($mat[$user])) {
                $mat[$user]=array();
            }
            if (!isset($mat[$user][$zone])) {
                $mat[$user][$zone]=0;
            }
            $mat[$user][$zone]++;
        }
        echo "<table><tr><td>-</td>";
        for ($i=0;$i<=$zonemax ; $i++) {
            ?><td><?= DateUtil::toString($base+$zoneWidth*$i,"Y/m/d") ?></td><?php
        }
        echo "</tr>\n";
        foreach ($mat as $user=>$zonec) {
            echo "<tr>";
            ?><td><?=$user?></td><?php
            for ($i=0;$i<=$zonemax ; $i++) {
                ?><td><?= isset($mat[$user][$i])?$mat[$user][$i]:"" ?></td><?php
            }
            echo "</tr>\n";
        }
        echo "</table>";
    }
    static function count() {
        $min=param("min");
        $max=param("max");
        $class=Auth::curClass2();
        $r=pdo_select_iter(
            "select filename ,user, count(*) as c from log where result not like '%Save' and class=? and time>? and time<? group by filename, user order by filename, c desc", $class->id, $min, $max);
        ?>
        <table>
            <tr><td>ファイル名</td><td>ユーザ名</td><td>ログ総数</td></tr><?php
        foreach ($r as $e) {
            ?>
            <tr>
                <td><?= $e->filename ?></td>
                <td>
                    <a href="a.php?TeacherLog/view1new&filename=<?= $e->filename ?>&user=<?=$e->user?>&day=<?=$max?>" target="view1">
                        <?=$e->user?>
                    </a>
                </td>
                <td><?= $e->c ?></td>
            </tr>
            <?php
        }
        ?></table><?php
    }
    static function getNameOfUser() {
        $p=self::parseUser();
        $user=$p["user"];
        $teacher=$p["teacher"];
        echo $user->getOptions()->name;
    }
}

?>
