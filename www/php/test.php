<?php
  print $_GET["test"].". test <BR>";
  print (!$_GET["test"]).". !test <BR>";
  print (!!$_GET["test"]).". !!test <BR>";
  print ($_GET["test"]==null).". test==null<BR>";
//  print '/^[a-zA-Z0-9\\-_]+$/';
  print $_COOKIE["user"]."<BR>";
//  print (true).".<BR>";
//  print (false).".<BR>";
  
?>

test <?= 2+3 ?>

