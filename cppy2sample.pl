
open F,'find . |grep py$|';
while(<F>){
    chomp;
    @a=split "/";
    $fn=pop @a;
    $prj=pop @a;
    print "mkdir -p 'py_samples/$prj'\n"; 
    print "cp  '$_' 'py_samples/$prj/$fn'\n";
}
