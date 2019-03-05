define(["Klass","FS","UI","Pos2RC","UserAgent"],
function (Klass,FS,UI,Pos2RC,ua) {
    var regrc=/:([0-9]+):([0-9]+)/;
    //function unknownF(){return "不明";}
    var bytes=function(s) {
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
    };
    return Klass.define({
        $this:"t",
        decodeTrace: function (t,e) {
            var stack=e.stack+"";
            if (ua.isChrome) {
                stack=(""+stack).split("\n").map(bytes).join("\n");
            }
            if (ua.isFirefox) {
                stack=(e+"\n"+stack).replace(/\\u([0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])/g,function (_,c) {
                    return String.fromCharCode("0x"+c);
                });
            }
            return stack.split("\n").map(function (line) {
                var r=regrc.exec(line);
                var res={line:line};
                if (r) {
                    res.row=r[1];
                    res.col=r[2];
                    var before=line.substring(0,r.index);
                    var pathCand;
                    for (var i=before.length-1; i>=0;i--) {
                        if (before[i]==="/" || before[i]==="\\") {
                            var path=before.substring(i);
                            try {
                                if (FS.get(path).exists()) {
                                    pathCand=path;
                                }
                            } catch(e){console.error(e);}
                        }
                    }
                    if (pathCand) {
                        res.file=FS.get(pathCand);
                    }
                }
                return res;
            });
        },
        show: function (t, mesg, src, pos, trace) {
            var appendPos;
            if (mesg && mesg.stack) {
                var tr=t.decodeTrace(mesg);
                for (var i=0;i<tr.length;i++) {
                    if (tr[i].file) {
                        var cve=tr[i].file.name()+"の"+
                        tr[i].row+"行目"+tr[i].col+"文字目付近でエラーが発生しました";
                        return t.show(cve,tr[i].file, tr[i] , mesg.stack);
                    }
                }
                src=mesg.src;
                if (!src && mesg.srcPath) {
                    src=FS.get(mesg.srcPath);
                }
                pos=mesg.pos;
                //console.log(mesg,mesg.stack);
                trace=mesg.stack;
                mesg=mesg+"";
                appendPos=true;
            }
            var elem=t.createDom();
            t.mesgd.text(
                mesg//+" 場所："+src.name()+(typeof row=="number"?":"+p.row+":"+p.col:"")
            );
            if (src && pos!=null) {
                var str=src.text();
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
