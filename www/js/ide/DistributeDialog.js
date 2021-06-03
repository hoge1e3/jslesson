define(["UI"], function (UI) {
    var res={};
	res.show=function (text, onOK,options) {
    	var d=res.embed(text,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (text, onOK, options) {
	    if (!options) options={};
        if (!res.d) {
            res.d=UI("div",{title:"一斉配布"},
        		$("<div>プログラム</div>"),
        		res.tx=$("<textarea>").attr({id:"fileCont",rows:20,cols:60}).val(text),
        		$("<br>"),
				$("<input>").attr({id:"overwrite",type:"checkbox"}),
         		$("<div>チェックを入れると既にファイルがある場合中身が上記の内容に更新されます</div>"),


			/*$("<div>input1</div>"),
			res.tx=$("<textarea>").attr({id:"fileCont2",rows:20,cols:20}).val(text),
			$("<br>"),*/


                res.okb=$("<button>OK</button>").click(function () {
                    //alert("clicked");
            	    res.d.done({next:false});
                }),
                res.oknb=$("<button>OK&Next</button>").click(function () {
                    //alert("clicked");
                    res.d.done({next:true});
                })
            );
        }
        res.tx.val(text);
        var d=res.d;
/*        d.$vars.OKButton.attr("disabled", false);
        d.$vars.OKButton.val("OK");*/
        d.done=function ({next}) {
            onOK($("#fileCont").val(),$("#overwrite").prop("checked"),{next});
            if(!next) d.dialog("close");
        };
        return d;
    };
    res.setDisabled=e=>{
        if (res.okb) res.okb.attr('disabled',e);
        if (res.oknb) res.oknb.attr('disabled',e);
        if (res.tx) res.tx.attr('disabled',e);
    };
    return res;
});
