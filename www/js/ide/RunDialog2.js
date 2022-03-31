define(["UI","LocalBrowser","LocalBrowserWindow","DiagAdjuster","ExportOutputDialog"],
function (UI, LocalBrowser,LocalBrowserWindow,DA,ExportOutputDialog) {
    var res={};
    var geom=res.geom={};
    res.hasLocalBrowserWindow=function () {
        return res.lbw && res.lbw.isActive();
    };
    res.show=function (runFile, options) {
        options=options||{};
        options.height=options.height||geom.height||600;
        options.width=options.width||geom.width||16*((options.height+10)/9);
        if (!geom.height) geom.height=options.height;
        if (!geom.width) geom.width=options.width;
        if (options.window && !options.window.closed) {
            if (res.hasLocalBrowserWindow()) res.lbw.close();
            res.lbw=new LocalBrowserWindow({
                window:options.window,
                onload:function () {
                    console.log(this);
                    var cons=this.contentWindow.document.getElementById("console");
                    if (cons) cons.style.fontSize=options.font+"px";
                }
            });
            return res.lbw.open(runFile);
        }
        window.dialogClosed=false;
        var d=res.embed(runFile, options);
        console.log("RunDialog2 options",options);
        d.dialog({
            //left: 50,top:50,
            width:options.width,
            height:options.height,
            position: (
                geom.top?{
                    my: "left top",
                    at: "left+"+geom.left+" top+"+geom.top
                }:{ my: "center top", at: "right bottom"}
            ),
            //position: { my: "center top", at: "right bottom"},
            close:function(){
                window.dialogClosed=true;
                if (res.b) res.b.close();
                if(typeof options.toEditor == "function")options.toEditor();
            },
            resize:handleResize,
            drag:handleDrag
        });//,height:options.height?options.height-50:400});
        handleResize();
        function handleDrag(e,ngeom) {
          if (ngeom) {
              //geom.width=ngeom.size.width;
              //geom.height=ngeom.size.height;
              geom.left=ngeom.position.left;
              geom.top=ngeom.position.top;
          }
        }
        function handleResize(e,ngeom) {
            //console.log("RSZ",arguments);
            if (res.b/* && res.b.iframe*/) {
                res.b.resize(d.width(),d.height()-d.$vars.OKButton.height());
                if (ngeom) {
                    geom.width=ngeom.size.width;
                    geom.height=ngeom.size.height;
                    geom.left=ngeom.position.left;
                    geom.top=ngeom.position.top;
                }
                /*res.b.iframe.attr({
                    width:d.width(),
                    height:d.height()-d.$vars.OKButton.height()});*/
            }
        }
    };
    function isie() {
        if(navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
            return true;
        }
        if(navigator.userAgent.toLowerCase().indexOf('trident') != -1) {
            return true;
        }
    }
    res.close=()=>res.d && res.d.dialog("close");
    res.embed=function (runFile, options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"実行画面ダイアログ",id:"runDlg",css:{overflow:"hidden"}},
                    ["div",{$var:"browser"}],
                    ["button", {type:"button",$var:"OKButton", on:{click: res.close}}, "閉じる"],
                    ["button", {type:"button",$var:"OKButton", on:{click: res.dlOut}}, "出力を共有……"],
                    (true?"":["button", {type:"button",$var:"WButton", on:{click: function () {
                        if (res.hasLocalBrowserWindow()) res.lbw.close();
                        res.lbw=new LocalBrowserWindow({
                            onload:function () {
                                console.log(this);
                                var cons=this.contentWindow.document.getElementById("console");
                                if (cons) cons.style.fontSize=options.font+"px";
                            }
                        });
                        res.lbw.open(runFile);
                        res.d.dialog("close");
                    }}}, "別ウィンドウ"])
            );
            res.da=new DA(res.d);
            res.da.afterResize=function (d) {
                if (res.b && res.b.iframe) {
                    res.b.iframe.attr({
                        width:d.width(),
                        height:d.height()-res.d.$vars.OKButton.height()});
                }
            };
            res.diagAdjuster=res.da;
            const bsize={width:400, height:400};
            if (options.targetDOM) {
                //console.log("targetDOM",res.targetDOM.width(), res.d.height());
                const td=options.targetDOM;
                res.d.appendTo(td);
                res.fitToTarget=()=>{
                    bsize.width=td.width();
                    bsize.height=td.height()-res.d.$vars.OKButton.height();
                    if (res.b) {
                        res.b.resize(bsize.width, bsize.height);
                    }
                };
                res.fitToTarget();
                //res.da.afterResize(res.d);
            }
            res.b=new LocalBrowser(res.d.$vars.browser[0],{
                id:"ifrmDlg",
                width:bsize.width,
                height:bsize.height,
            });
        }
        setTimeout(function () {
            res.b.focus();
        },100);
        res.b.open(runFile,{
            onload:function () {
                console.log(this);
                var cons=this.contentWindow.document.getElementById("console");
                if (cons) cons.style.fontSize=options.font+"px";
            }
        });
        //if (res.da) res.da.handleResize();
        return res.d;
    };
    res.dlOut=function () {
        const w=res.b.iframe[0].contentWindow;
        const d=w.document;
        const c=d.querySelector("#console") || d.body;
        ExportOutputDialog.show(c);
        return;
        window.saveAs(new Blob([c.innerText]), "output.txt");
    };
    return res;
});
