use strict;
use warnings;

opendir(DIR,"./");
my $matched=0;
foreach(grep {/\.txt$/}readdir DIR){
	open(FILE,$_);
	my @fn=split(/\./);
	my $tmp;
	open(DESTFILE,">> $fn[0]-time.txt");
	open(DESTERFILE,">> $fn[0]-error.txt");
	while (my $line = <FILE>){
		if($matched==1){
			$tmp=$line;
			print DESTFILE $line;
			$matched=0;
		}
		if($line=~ m/--TIME--/){
			$matched=1;
		}
		if($line=~ m/ERROR END/){
			print DESTERFILE $tmp;
		}
	}
	close(DESTERFILE);
	close(DESTFILE);
	close(FILE);
}
closedir(DIR);