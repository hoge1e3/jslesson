define(["UI"], function (UI) {
    var res={};
	res.show=function (mesg,options) {
    	var d=res.embed(mesg,options);
    	if (!res.opened) {
            //-- Firefox scanf->enter-> open it -> focus to x(close)->release enter->close??
            setTimeout(function () {
                d.dialog({width:500,height:100,
            	    position: { my: "left bottom", at: "left bottom"},
            	    close: function () {
            	        res.opened=false;
            	    }
            	});
                afterOpen();
            },100);
    	} else afterOpen();
        function afterOpen() {
            res.opened=true;
        	var dcon=d.closest(".ui-dialog-content");
        	dcon[0].scrollTop=dcon[0].scrollHeight;
        }
	};
	res.embed=function (mesg, options) {
	    if (!options) options={};
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"通知"},
        	    ["div",{$var:"cont"},""]
                /* ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]*/
            );
        }
        var d=res.d;
        var c=d.$vars.cont;
        if (res.lastLine) {
            if (res.lastLine.$vars.mesg.text()===mesg) {
                var ti=res.lastLine.$vars.times;
                var c=ti.text();
                if (!c) c="(2)";
                else c="("+(c.replace(/\D/g,"")-(-1))+")";
                ti.text(c);
            }
        } else {
            res.lastLine=UI("div", ["span",{$var:"times"}],["span",{$var:"mesg"},mesg]);
            c.append(res.lastLine);
        }
    	d.done=function () {
    	    /*if (d.$edits.validator.isValid()) {
                onOK(model);
                d.dialog("close");
    	    }*/
    	};
    	return d;
    };
    return res;
});
