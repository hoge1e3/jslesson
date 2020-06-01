define(["Klass","FS","UI","Pos2RC","UserAgent","stacktrace"],
function (Klass,FS,UI,Pos2RC,ua,StackTrace) {
    //var regrc=/:([0-9]+):([0-9]+)/;
    //function unknownF(){return "不明";}
    /*var bytes=function(s) {
        try {
            var r="",noconv;
            for(var i=0;i<s.length;i++) {
                var c=s.charCodeAt(i);
                if (c>=256) noconv=true;
                r+="%"+(c.toString(16));
            }
            return noconv?s:decodeURIComponent(r);
        }catch(e) {
            console.log(e, s);
            return s;
        }
    };*/
    return Klass.define({
        $this:true,
        convertPath: function (t,e) {return e;},// replaced with BuilderClient.convertFromWorkerPath
        decodeTrace: async function (t,e) {
            try {
                const tr=(e.stack && e.stack[0] && e.stack[0].fileName) ? e.stack : await StackTrace.fromError(e,{offline:true});
                for (let tre of tr) {
                    try {
                        const fn=t.convertPath(tre.fileName);
                        if (FS.get(fn).exists()) {
                            tre.file=FS.get(fn);
                        }
                        tre.row=tre.lineNumber-0;
                        tre.col=tre.columnNumber-0;
                    } catch(e1) {
                    }
                }
                return tr;
            } catch(e2) {
                var stack=e.stack+"";
                return stack.split("\n");
            }
        },
        show: async function (t, mesg, src, pos, trace) {
            var appendPos;
            console.log("ERRD",mesg);
            if (mesg && mesg.noTrace) return;
            if (mesg && mesg.stack) {
                var tr=await t.decodeTrace(mesg);
                var detail=(mesg.message ? "("+mesg.message+")" : "");
                for (var i=0;i<tr.length;i++) {
                    if (tr[i].file) {
                        var cve=tr[i].file.name()+"の"+
                        tr[i].row+"行目"+tr[i].col+"文字目付近でエラーが発生しました"+detail;
                        return await t.show(cve,tr[i].file, tr[i] , mesg.stack);
                    }
                }
                src=mesg.src;
                if (!src && mesg.srcPath) {
                    src=FS.get(mesg.srcPath);
                }
                pos=mesg.pos;
                //console.log(mesg,mesg.stack);
                trace=mesg.stack;
                mesg=(mesg.message||mesg)+"";//detail;
                appendPos=true;
            }
            var elem=t.createDom();
            t.mesgd.text(
                mesg//+" 場所："+src.name()+(typeof row=="number"?":"+p.row+":"+p.col:"")
            );
            if (src && pos!=null) {
                var str=typeof src==="string"?src:src.text();
                var p=new Pos2RC(str).getAll(pos);
                if (appendPos) t.mesgd.append("場所："+src.name()+":"+p.row+":"+p.col);
                t.srcd.show();
                t.srcd.empty();
                t.srcd.append($("<span>").text(str.substring(0,p.pos)));
                t.srcd.append($("<img>").attr("src",FS.expandPath("${sampleImg}/ecl.png")));//MODJSL
                t.srcd.append($("<span>").text(str.substring(p.pos)));
            } else {
                t.srcd.hide();
            }
            if (!trace) {
                t.traceb.hide();
                t.traced.hide();
            } else {
                t.traceb.show();
                t.traced.text(trace);
            }
            elem.dialog({width:600,height:400});
        },
        close: function (t) {
            if (t.dom) t.dom.dialog("close");
        },
        createDom: function (t) {
            if (t.dom) return t.dom;
            var elem=$("<div>");
            elem.attr("title","エラー");
            t.dom=elem;
            t.mesgd=$("<div>");
            elem.append(t.mesgd);
            //elem.append($("<div>").attr("class","quickFix"));
            t.srcd=$("<pre>");
            elem.append($("<div>").append(t.srcd));
            t.traced=$("<pre>");
            t.traceb=$("<button>").text("エラーの詳細...").click(t.$bind.showTrace);
            elem.append($("<div>").
                append(t.traceb).
                append($("<div>").append(t.traced))
            );
            t.traced.hide();
            return t.dom;
        },
        showTrace: function (t) {
            if (t.traceShowing) {
                t.traced.hide();
            } else {
                t.traced.show();
            }
            t.traceShowing=!t.traceShowing;
        }
    });
});
