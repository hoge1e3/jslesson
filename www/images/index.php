<style>
  .item {
     border: solid black 1px;
     float: left;
     margin: 5px;
     padding: 10px;
  }
</style>
<script>
function imageSelected(t) {
    const img=t.querySelector("img");
    const url=img.getAttribute("src");
    console.log(url);
    if (window.parent && window.parent.onImageSelected) window.parent.onImageSelected(url);
}
</script>
<h1> Bit Arrow で使用可能な画像ファイル一覧</h1>
<h3>使用例：HTML/JavaScript</h3>
<pre>&lt;img src="images/99.png"/&gt;</pre>
<h3>使用例：ドリトル</h3>
<pre>かめた＝タートル！作る．
かめた！作る "99.png" 変身する．</pre>
<?php
$excludes=array(
    "Sample.png"=>1,
    "base.png"=>1,
    "inputPad.png"=>1,
    "mapchip.png"=>1,
    "neko.png"=>1,
    "ui-icons_888888_256x240.png"=>1
);
if ($handle = opendir(".")) {
    $ents=array();
    while (false !== ($entry = readdir($handle))) {
    	if (preg_match('/(png|gif)$/',$entry) && !isset($excludes[$entry])) {
    	   array_push($ents,$entry);
    	}
    }
    closedir($handle);
    sort($ents);
    foreach ($ents as $entry) {
    ?>
      <div class=item onclick="imageSelected(this)">
    	<div><img src="<?= $entry ?>"/></div>
        <div><?= $entry ?></div>
      </div>
    	<?php
    }
}

?>
