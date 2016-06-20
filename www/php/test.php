<?php

require_once"ErrorHandler.php";
require_once"MySession.php";

if (!MySession::has("count")) {
    $c=0;
} else {
    $c=MySession::get("count");
}
$c++;
echo $c;
MySession::set("count",$c);

/*require_once"PathUtil.php";

print PathUtil::rel("a","b");
print "<BR>\n";
print PathUtil::rel("a/","b");
print "<BR>\n";
print PathUtil::relPath("a/b/","a/");
print "<BR>\n";
print PathUtil::startsWith("a/b/","a/");
print "<BR>\n";
print PathUtil::startsWith("a/","a/b/");
print "<BR>\n";
print PathUtil::endsWith("a/b/","b/");
print "<BR>\n";
print PathUtil::endsWith("b/","a/b/");
print "<BR>\n";
print PathUtil::truncSep("b/c/d/");
print "<BR>\n";
print PathUtil::truncSep("b/c/d");
print "<BR>\n";
print join("," ,PathUtil::splitPath("b/c/d/"));
print "<BR>\n";
print join("," ,PathUtil::splitPath("b/c/d"));
print "<BR>\n";
print PathUtil::up("b/c/d/");
print "<BR>\n";
print PathUtil::up("b/c/d");
print "<BR>\n";
*/

?>


