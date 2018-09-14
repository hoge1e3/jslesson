<style>
  .item {
     border: solid black 1px;
     float: left;
     margin: 5px;
     padding: 10px;
  }
</style>
<h1> Bit Arrow で使用可能な画像ファイル一覧</h1>
<?php

if ($handle = opendir(".")) {
    $ents=array();
    while (false !== ($entry = readdir($handle))) {
    	if (preg_match('/(png|gif)$/',$entry)) {
    	   array_push($ents,$entry);
    	}
    }
    closedir($handle);
    sort($ents);
    foreach ($ents as $entry) {
    ?>
      <div class=item>
    	<div><img src="<?= $entry ?>" /></div>
        <div><?= $entry ?></div>
      </div>
    	<?php
    }
}

?>