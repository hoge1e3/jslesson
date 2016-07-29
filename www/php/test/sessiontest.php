<?php 
//セッションの保存先を明確にします
session_save_path("/tmp");

//実験のためセッションが消される時間を１０秒と短くします
ini_set('session.gc_maxlifetime', 10);

//ガベージコレクトを毎回行うようにします
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 1);

session_start();
if(isset($_SESSION["test"])) {
    $_SESSION["test"]=$_SESSION["test"]+1;
    
} else {
    $_SESSION["test"]=1;
}
print $_SESSION["test"];

?>
<a href="sessiontest.php?<?=SID?>">リロード</a>