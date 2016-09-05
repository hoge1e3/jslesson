define(["UI"], function (UI) {
    var res={};
	res.show=function (prjInfo,onOK,options) {
    	var d=res.embed(prjInfo,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjInfo,onOK,options) {
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
        $.get("copySample.php").then(function (r) {
            console.log("res", r);
            d.$vars.sample.empty();
            d.$vars.sample.append(UI("option",{$var:"loading",selected:true,value:"notsel"},"選択してください"));
            d.$vars.loading.text("選択してください");
            r.sort().forEach(function (n) {
                    d.$vars.sample.append(UI("option",{value:n},n)); 
            });
        });
        var model={name:options.defName||"",lang:"js"};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    	    if (model.sample=="notsel") {
    			this.addError("name","プロジェクトを選んでください");
    			return;
    	    } else if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		}
    		//console.log(model.parentDir);
    		if (prjInfo.findProject(model.name) ) {
                //this.addError("name","このプロジェクトはすでに存在します");
                //return;
                model.existent=true;
            } else {
                model.existent=false;
            }
    		this.allOK();
    		//d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    var ovrd;
    	    if (d.$edits.validator.isValid()) {
    	        if (model.existent) {
    	            ovrd=UI("div",{title:"確認"},
        	            ["div","サンプルプロジェクト",model.sample,"を開きます。"],
        	            ["form",{$var:"theForm"},
            	            ["div",
            	                ["input",{type:"radio",name:"overwrite",value:"no",checked:true}],
            	                "そのまま開く"
            	            ],
            	            ["div",
            	                ["input",{type:"radio",name:"overwrite",value:"yes"}],
            	                "最初の状態に戻す(以前に",model.sample,"で行った変更が取り消されます)"
            	            ],
        	            ],
        	            ["div",
        	                ["button",{on:{click:handle}},"OK"]
        	            ]
    	            );
    	            ovrd.dialog({modal:true,width:600});
    	        } else doCopy();
    	    } 
    	    function handle() {
    	        //alert(ovrd.$vars.theForm[0].overwrite.value);
    	        //return;
    	        if (ovrd.$vars.theForm[0].overwrite.value=="yes") doCopy();
    	        else {
                    onOK(model);
                    d.dialog("close");
    	        }
    	    }
    	    function doCopy() {
                d.$vars.OKButton.attr("disabled", true);
    	        d.$vars.OKButton.text("コピー中...");
                $.get("copySample.php",{src:model.sample,dst:model.name}).then(function (r) {
                    console.log(r);
                    onOK(model);
                    d.dialog("close");
                }).fail(function (e) {
                    alert(e.responseText||e);
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
