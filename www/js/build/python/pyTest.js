define(["UI","pyRun","FS"],
function (UI,prun,FS) {
    //alert("LOAD");
    var prog=UI("textarea",{rows:30,cols:50}).appendTo("body");
    var runB=UI("button",{on:{click:run}},"Run").appendTo("body");
    PYLIB.STDOUT=UI("pre",{id:"console"}).appendTo("body");
    var srcF=FS.get("/tmp/test.py");
    prog.val(srcF.exists()?srcF.text():"");

    function save() {
        srcF.text(prog.val());
    }
    function run() {
        save();
        prun(srcF);
    }
    SplashScreen.hide();
});
