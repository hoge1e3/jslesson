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
    static function view1() {
        // focus to one student
        $user=param("user");
        $day=param("day",DateUtil::now())-0;
        // If i can do , i do it.
        $class=Auth::curClass2();
        $targetUser=$class->getUser($user);
        $teacher=Auth::curTeacher()->id;
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
        <?php
        //$now=DateUtil::now();
        //"Y-m-d H:i:s"
        $base=DateUtil::getYear($day)."-".DateUtil::getMonth($day)."-".DateUtil::getDay($day)." 00:00:00";
        $baseInt=DateUtil::toInt($base);
        //echo $day." ".$base." ".$baseInt;
        $logs=$targetUser->getAllLogs($baseInt,$baseInt+86400);
        ?>
        <div style="float:left; overflow-y:auto; height:100%; width:20%;">
          <?php
          $prevTime=0;
          $prevResult="";
          foreach($logs as $l){
            if(strpos($l['result'],'Save')===false && ($l['time']-$prevTime>=2 || $prevResult!=$l['result'])){
              ?>
              <!--<div><?=$l['filename']?></div>-->
              <div onClick="showLogOneUser.call(this,'<?=$l['id']?>','<?=$l['user']?>','<?=$l['filename']?>');"><font color="<?=strpos($l['result'],'Error')!==false ? 'red' : 'black'?>"><?=$l['filename']?></font></div>
              <script>
              if(!logsOfOneUser["<?=$l['filename']?>"]) logsOfOneUser["<?=$l['filename']?>"]=[];
              logsOfOneUser["<?=$l['filename']?>"].push(<?=$l['id']?>);
              </script>
              <?php
            } else {
               //echo "Skip l={res=".$l['result']." time=".$l['time']."}, p={T=$prevTime , res=$prevResult},".
               //" [".(strpos($l['result'],'Save')===false)."]  [".($prevTime-$l['time'])."]  [".($prevResult!=$l['result']) ."]<BR>";
           }
            $prevTime=$l['time'];
            $prevResult=$l['result'];
          }
          ?>
        </div>
        <div style="float:left; width:30%;">
        <div id="<?=$user?>res"></div><br>
        <textarea id="<?=$user?>" style="width:100%;" onclick="this.select(0,this.value.length)" readonly></textarea>
        </div>
        <span id="<?=$user?>diff"></span>
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
        foreach($logs as $log){
            if(isset($runcount[$log['user']])){
                $runcount[$log['user']]++;
            }else{
                $runcount[$log['user']]=1;
            }
            if(!isset($runhistory[$log['user']])){
                $runhistory[$log['user']]='<span id="'.$log['user'].'hist">';
            }
            $fnid=str_replace("/","__",$log['filename']);
            $fnid=str_replace(".","__",$fnid);
            if(strpos($log['result'],'Error')!==false){
                if(isset($errcount[$log['user']])){
                    $errcount[$log['user']]++;
                }else{
                    $errcount[$log['user']]=1;
                }
                $runhistory[$log['user']].='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));"><font color="red">E</font></span>';
            }else if(strpos($log['result'],'Run')!==false){
                $runhistory[$log['user']].='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">R</span>';
            }else if(strpos($log['result'],'Save')!==false){
                $runhistory[$log['user']].='<span filename=fn'.$fnid.' data-id='.$log['id'].' data-user='.$log['user'].' onClick="getLog(this.getAttribute('."'".'data-id'."'".'),this.getAttribute('."'".'data-user'."'".'));">S</span>';
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
            $runhistory[$runhistkey].='</span><br id="'.$runhistkey.'ui" style="display:none"><button id="'.$runhistkey.'ui" style="display:none" data-user='.$runhistkey.' onclick="getOneUsersLogId(this.getAttribute('."'".'data-user'."'".'),'."'".'prev'."'".')">Prev</button>  <button id="'.$runhistkey.'ui" style="display:none" data-user='.$runhistkey.' onclick="getOneUsersLogId(this.getAttribute('."'".'data-user'."'".'),'."'".'next'."'".')">Next</button><span id="'.$runhistkey.'res" style="display:none"></span><br><span id="'.$runhistkey.'diff" style="display:none" ></span><textarea rows=10 cols=60 id="'.$runhistkey.'" style="display:none" onclick="this.select(0,this.value.length)">test</textarea>';
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
            <tr><td><a href="a.php?TeacherLog/view1&user=<?=$k?>&day=<?=$max?>" target="view1"><?=$k?></a></td><td data-rate="<?=$rate?>" bgcolor=<?=$errcaution?>><?=$errcount[$k]?>/<?=$v?>(<?=$rate?>%)</td>
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
