define(["UI"], function (UI) {
    var res={};
	res.show=function (prjInfo, onOK,options) {
    	var d=res.embed(prjInfo,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjInfo, onOK, options) {
	    if (!options) options={};
        if (!res.d) {
            var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:(options.ren?"プロジェクト名の変更":"新規プロジェクト")},
        			["div",
        			 ["span","プロジェクト名"],
        			 ["input",{$edit:"name",id:"prjName",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
				["div",
        			 ["span","プログラミング言語"],
        			 ["select",{$edit:"lang",id:"prjLang"},
        			 ["option",{selected:"selected",value:"select"},"言語を選択してください"],
        			 ["option",{value:"js"},"JavaScript"],
        			 ["option",{value:"dtl"},"ドリトル"],
        			 ["option",{value:"c"},"C"]]
				],
         		/*	["div",{css:{"display":"none"}},
        			 ["span","親フォルダ"],
        			 ["input",{$edit:{name:"parentDir",type:FType}}]],
        			 ["div",{css:{"display":"none"}},
        			   ["span","作成先フォルダ："],
        			   ["span",{$var:"dstDir"}]
        			  ],*/
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
        }
        var d=res.d;
        var model={name:options.defName||"",lang:"select"};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		}
    		if (model.name.match(/[^a-zA-Z0-9_]+/)) {
    			this.addError("name","プロジェクト名は英数字とアンダーバー(_)を組み合わせたものにしてください");
    			return;
    		}
            if (prjInfo.findProject(model.name) ) {
                this.addError("name","このプロジェクトはすでに存在します");
                return;
            }
            if(model.lang=="select"){
                this.addError("lang","言語を選択してください");
                return;
            }
    		this.allOK();
    		//d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    if (d.$edits.validator.isValid()) {
                onOK(model);
                d.dialog("close");
    	    }
    	};
    	return d;
    };
    return res;
});
