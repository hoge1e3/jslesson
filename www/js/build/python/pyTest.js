define(["UI","pyRun","FS","PyLib","root","SplashScreen"],
function (UI,prun,FS,PYLIB,root,SplashScreen) {
    //alert("LOAD");
    var prog=UI("textarea",{rows:30,cols:50}).appendTo("body");
    var runB=UI("button",{on:{click:run}},"Run").appendTo("body");
    PYLIB.STDOUT=UI("pre",{id:"console"}).appendTo("body");
    PYLIB.CANVAS=UI("canvas",{id:"canvas"}).appendTo("body");
    var srcF=FS.get("/tmp/test.py");
    prog.val(srcF.exists()?srcF.text():"");

    function save() {
        srcF.text(prog.val());
    }
    function reset(){
        var ctx=PYLIB.CANVAS[0].getContext("2d");
        ctx.clearRect(0,0,PYLIB.CANVAS.width(),PYLIB.CANVAS.height());
        PYLIB.STDOUT.text("");
    }
    function run() {
        save();
        reset();
        prun(srcF);
    }
    SplashScreen.hide();
});
