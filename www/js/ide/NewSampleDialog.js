define(["UI"], function (UI) {
    var res={};
	res.show=function (prjDir,onOK,options) {
    	var d=res.embed(prjDir,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjDir,onOK,options) {
	    if (!options) options={};
        if (!res.d) {
        	res.d=UI("div",{title:("サンプルを見る")},
				["div",
        			 ["span","サンプル"],
        			 ["select",{$edit:"sample"/*,on:{realtimechange:sel}*/},
        			 ["option",{$var:"loading",selected:true,value:"notsel"},"読込中.."]]
				],                 
				["div",
				    ["span","プロジェクト名"],
        			 ["input",{$edit:"name",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
                ["div", {$var:"validationMessage", css:{color:"red"}}],
                ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
        }
        var d=res.d;
        d.$vars.OKButton.attr("disabled", false);
        d.$vars.OKButton.val("OK");
        $.get("php/copySample.php").then(function (r) {
            console.log("res", r);
            d.$vars.loading.text("選択してください");
            r.forEach(function (n) {
                    d.$vars.sample.append(UI("option",{value:n},n)); 
            });
        });
        var model={name:options.defName||"",lang:"js", parentDir:prjDir};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		}
    		//console.log(model.parentDir);
    		model.dstDir=model.parentDir.rel(model.name+"/");
            if (model.dstDir.rel("options.json").exists() ) {
                this.addError("name","このフォルダはすでに存在します");
                return;
            }
    		this.allOK();
    		//d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    if (d.$edits.validator.isValid()) {
                d.$vars.OKButton.attr("disabled", true);
    	        d.$vars.OKButton.text("コピー中...");
                $.get("php/copySample.php",{src:model.sample,dst:model.name}).then(function (r) {
                    console.log(r);
                    onOK(model);
                    d.dialog("close");
                }).fail(function (e) {
                    alert(e);
                });
    	    }
    	};
    	d.$edits.on.writeToModel=(function (name, value) {
    	    //console.log(name,value);
    	    if (name=="sample" && value!="notsel") {
    	        d.$vars.name.val(value);
    	    }
    	});
    	return d;
    };
    return res;
});
