
opendir LS,"new/";
while($l=readdir(LS)) {
   next if ($l eq ".." or $l eq ".");
   system "wc $l new/$l";
}
closedir LS;

