<?php
req("auth","DateUtil","pdo");
class TeacherLogController {
    static function getFileNames() {
        $classid=param("classid",NULL);
        if ($classid && strpos( $_SERVER["HTTP_HOST"],"localhost")!==FALSE ) {

        } else {
            $class=Auth::curClass2();
            $teacher=Auth::curTeacher()->id;
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
        // If i can do , i do it.
        $class=Auth::curClass2();
        $teacher=Auth::curTeacher();
        if($teacher) {
            $teacheIDr=Auth::curTeacher()->id;
            $userName=param("user",null);
            if (!$userName) {
                $targetUser=Auth::curUser2();
                $userName=$targetUser->name;
            }
            $user=$class->getUser($userName);
        } else {
            $teacheID="NOT_TEACHER";
            $user=Auth::curUser2();
        }
        //print $class->id." , ".$user->name;
        $it=pdo_select_iter("select time from log where class=? and user=? ",$class->id, $user->name);
        $has=array();
        $ord=array();
        req("DateUtil");
        foreach ($it as $obj) {
            $day=DateUtil::toDayTop($obj->time);
            if (isset($has[$day])) {$has[$day]++;continue;}
            $has[$day]=1;
            array_push($ord, $day);
        }
        foreach ($ord as $day) {
            ?>
            <a href=".?TeacherLog/view1&day=<?= $day ?>&user=<?= $userName ?>">
                <?= DateUtil::toString($day) ?>(<?=$has[$day] ?>)
            </a><BR/>
            <?php
        }
    }
    static function getLogs() {
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
        $base=DateUtil::getYear($day)."-".DateUtil::getMonth($day)."-".DateUtil::getDay($day)." 00:00:00";
        $baseInt=DateUtil::toInt($base);
        //echo $day." ".$base." ".$baseInt;
        $logs=$targetUser->getAllLogs($baseInt,$baseInt+86400);
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
                }
                $prevTime=$l['time'];
                $prevResult=$l['result'];
            }
        }
        header("Content-type: text/json");
        print json_encode($logs2);
    }
    static function view1new() {
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
        <script>
            classID='${CLASSID}';
            teacherID='${TEACHERID}';
            userId='${USERID}';
            reloadMode=0;
            logsOfOneUser=[];
            programs=[];
            var indexList=[];
        </script>
        <script src="js/log/logViewer.js"></script>
        <script src="js/log/getlog.js"></script>
    </head>
    <body>
        <div style="float:left; overflow-y:auto; height:100%; width:20%; resize:horizontal;">
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
                var userid='${USERID}';
                if(!logsOfOneUser["${FILENAME}"]) logsOfOneUser["${FILENAME}"]=[];
                      logsOfOneUser["${FILENAME}"].push(${LOGID});
                      var pRaw;
                      if(!indexList["${FILENAME}"]){
                        indexList["${FILENAME}"]=0;
                        pRaw=programs["${FILENAME}"][0];
                      }else{
                        var i=indexList["${FILENAME}"];
                        pRaw=programs["${FILENAME}"][i-1];
                        //console.log(i-1,pRaw);
                      }
                      indexList["${FILENAME}"]++;
                      var cRaw={"date":"2018/11/15","time":"10:31:24","lang":"C","filename":"/home/${CLASSID}/${USERID}/${FILENAME}","result":"C Run","detail":"Hello! words","code":{"C":"#include<stdio.h>\n// C\nint main(void ) {\n    printf(\"Hello! words\");\n}","HTML":"<html>\n\n</html>"}}
        ;
                      var lRaw=programs["${FILENAME}"][programs["${FILENAME}"].length-1];
                      console.log(pRaw,cRaw,lRaw);
                      var prevProg=getCode(pRaw);//.code.C || pRaw.code.JavaScript || pRaw.code.Dolittle || pRaw.code.Python || "";
                      var curProg=getCode(cRaw);//.code.C || cRaw.code.JavaScript || cRaw.code.Dolittle || cRaw.code.Python || "";
                      var lastProg=getCode(lRaw);//.code.C || lRaw.code.JavaScript || lRaw.code.Dolittle || lRaw.code.Python || "";
                      var prevDiffData=calcDiff(prevProg,curProg,"[id='"+userid+"diff']","Prev","Current",false);
                      var lastDiffData=calcDiff(curProg,lastProg,"[id='"+userid+"diffLast']","Current","Last",false);
                      var pd=":"+prevDiffData["delete"]+":"+prevDiffData["insert"]+":"+prevDiffData["replace"]+":"+prevDiffData["equal"];
                      var ld="-"+lastDiffData["delete"]+":"+lastDiffData["insert"]+":"+lastDiffData["replace"]+":"+lastDiffData["equal"];
                      var sameLines=":"+lastDiffData["equal"];
                      console.log("prev",prevProg);
                      console.log("cur",curProg);
                      console.log("diff",prevDiffData, lastDiffData);
                      console.log("cur/last",curProg,lastProg, curProg===lastProg);

                      var e=document.createElement("span");
                      e.id='${LOGID}summary';
                      e.innerHTML=sameLines;
                      document.getElementById('${LOGID}').appendChild(e);
            </script>
            -->
        </div>
        <div style="float:left; width:30%;">
            <div id="${USERID}res"></div><br>
            <textarea id="${USERID}" style="width:100%;" onclick="this.select(0,this.value.length)" readonly></textarea>
            <textarea id="${USERID}detail" style="width:100%;" readonly></textarea>
        </div>
        <div style="float:left;">
            <span id="${USERID}diff"></span><br>
            <span id="${USERID}diffLast"></span>
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
              var userid='<?=$l['user']?>';
              if(!logsOfOneUser["<?=$l['filename']?>"]) logsOfOneUser["<?=$l['filename']?>"]=[];
              logsOfOneUser["<?=$l['filename']?>"].push(<?=$l['id']?>);
              var pRaw;
              if(!indexList["<?=$l['filename']?>"]){
                indexList["<?=$l['filename']?>"]=0;
                pRaw=programs["<?=$l['filename']?>"][0];
              }else{
                var i=indexList["<?=$l['filename']?>"];
                pRaw=programs["<?=$l['filename']?>"][i-1];
                //console.log(i-1,pRaw);
              }
              indexList["<?=$l['filename']?>"]++;
              var cRaw=<?=$l['raw']?>;
              var lRaw=programs["<?=$l['filename']?>"][programs["<?=$l['filename']?>"].length-1];
              console.log(pRaw,cRaw,lRaw);
              var prevProg=getCode(pRaw);//.code.C || pRaw.code.JavaScript || pRaw.code.Dolittle || pRaw.code.Python || "";
              var curProg=getCode(cRaw);//.code.C || cRaw.code.JavaScript || cRaw.code.Dolittle || cRaw.code.Python || "";
              var lastProg=getCode(lRaw);//.code.C || lRaw.code.JavaScript || lRaw.code.Dolittle || lRaw.code.Python || "";
              var prevDiffData=calcDiff(prevProg,curProg,"[id='"+userid+"diff']","Prev","Current",false);
              var lastDiffData=calcDiff(curProg,lastProg,"[id='"+userid+"diffLast']","Current","Last",false);
              var pd=":"+prevDiffData["delete"]+":"+prevDiffData["insert"]+":"+prevDiffData["replace"]+":"+prevDiffData["equal"];
              var ld="-"+lastDiffData["delete"]+":"+lastDiffData["insert"]+":"+lastDiffData["replace"]+":"+lastDiffData["equal"];
              var sameLines=":"+lastDiffData["equal"];
              console.log("prev",prevProg);
              console.log("cur",curProg);
              console.log("diff",prevDiffData, lastDiffData);
              console.log("cur/last",curProg,lastProg, curProg===lastProg);

              var e=document.createElement("span");
              e.id='<?=$l['id']?>summary';
              e.innerHTML=sameLines;
              document.getElementById('<?=$l['id']?>').appendChild(e);
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
    static function view() {
        date_default_timezone_set('Asia/Tokyo');
        $class=Auth::curClass2();
        $teacher=Auth::curTeacher()->id;
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
        $logs=$class->getAllLogs($min,$max);
        $runcount=Array();
        $students=$class->getAllStu();
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
        logs["<?=$teacher?>"]=[];
        </script>
        <?php
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
      <iframe src="./js/log/timeline/index.html?day=<?=date("Y",$max)?>-<?=date("m",$max)?>-<?=date("d",$max)?>"></iframe><br>
      <a href="./js/log/timeline/index.html?day=<?=date("Y",$max)?>-<?=date("m",$max)?>-<?=date("d",$max)?>" target="_timeline">タイムラインを別画面で見る</a>
      <hr>
    	<?php
    	    echo date("Y/m/d H:i:s",$min)." から ".date("Y/m/d H:i:s",$max)."までの実行状況";
    	?>
        <table border=1 class="tablesorter">
            <thead>
            <tr><th>ユーザID</th><th>エラー/実行</th><th>実行からの経過時間</th><th>今実行しているファイル</th><th>実行結果履歴</th></tr>
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
            <tr><td><a href="a.php?TeacherLog/view1&user=<?=$k?>&day=<?=$max?>" target="view1"><?=$k?></a></td>
            <td data-rate="<?=$rate?>" bgcolor=<?=$errcaution?>><?=$errcount[$k]?>/<?=$v?>(<?=$rate?>%)</td>
            <td bgcolor=<?=$timecaution?>><?=str_pad($time['h'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['m'],2,0,STR_PAD_LEFT)?>:<?=str_pad($time['s'],2,0,STR_PAD_LEFT)?></td>
            <td><?=$latestfile[$k]?></td><td><?=$runhistory[$k]?></td>
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
}

?>
