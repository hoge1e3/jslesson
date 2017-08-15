var comTex={};
var comList;
var prevs=[],prevc=0;
var NT=true;
var _tagOrder;
var tagNav,tagArea,tagFindBox;
$(function () {
    /*comList=$("<datalist>").attr("id","coms").appendTo("body");
    $(".com").attr("list","coms");
    $(".allok").after($("<button>").addClass("run").text("Run"));
    $(".allok").after($("<button>").addClass("same_next").text("Same&Next"));
    $(".allok").after($("<button>").addClass("same").text("Same"));


    $("input[type='checkbox']").hide();
    $(".allok").hide();
    addHandlers();
    $("body").prepend(
        $("<button>").text("Show only [d]").click(showOnlyD)
    );
    $("<script>").attr("src","../js/lib/difflib.js").appendTo("body");
    $("<script>").attr("src","../js/lib/diffview.js").appendTo("body");
    $("<link>").attr({rel:"stylesheet",href:"../css/diffview.css"}).appendTo("body");
    tagNav=$("<div>").css({position:"absolute",left:400,top:100,width:700,height:200,overflowY:"scroll"}).appendTo("body");
    tagNav.append(tagFindBox=$("<input>").on("input",findTag));
    tagNav.append(tagArea=$("<div>"));*/

    //tagNav
    diffAll();
});
function findTag() {
   var w=$(this).val();
   //if (w=="") return;
   //console.log("Find",w);
   tagArea.find(".tag").each(function () {
        if ($(this).text().indexOf(w)>=0) {
            //console.log("Found",$(this).val())
            $(this).show();
            //$(this).addClass("highlight");
        } else {
            $(this).hide();
            //$(this).removeClass("highlight");
        }
   });
}
function looks_like_html(source) {
    // <foo> - looks like html
    // <!--\nalert('foo!');\n--> - doesn't look like html

    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}
function showOnlyD() {
    var fs=$(".item");
    fs.each(function () {
        var cbox=$(this).find(".diy[name='d']")[0];
        if (!cbox) return;
        //console.log(cbox,cbox.checked);
        var d=cbox.checked;
        if (!d) {
            $(this).hide();
        }
    });
}
function sortByComment() {
    var fs=$(".item");
    $(".item").remove();
    fs=fs.reverse();
    fs.each(function () {
        $("body").append(this);
    });
}
function evalSame() {
    var items=$(".item");
    var i=0;
    var pc,tagn=0,logn=0,dists=[];
    items.each(function () {
        var com=$(this).find(".com").val();
        var acom=sortCom(excludeCom (com ));
        var d=acom.split("，").length;
        tagn+=d;
        if (pc) {
            d=tagDist(pc,acom);
        }
        dists[d]=(dists[d]||0)+1;
        if (!acom) console.log("!!!",com);
        else console.log(i,d,acom);
        pc=acom;
        i++;
        logn++;
    });
    console.log("#logs\tlogs\t"+logn);
    console.log("#tags\ttags\t"+tagn);
    for (var i=0;i<dists.length;i++) {
        console.log("#dist\t"+i+"\t"+dists[i]);
    }
}
function tagDist(a,b) {
    a=sortCom(excludeCom(a));
    b=sortCom(excludeCom(b));
    var v={};
    a.split("，").forEach(function (c) {
        if (v[c]) delete v[c]; else v[c]=1;
    });
    b.split("，").forEach(function (c) {
        if (v[c]) delete v[c]; else v[c]=1;
    });
    var d=0;
    for (var k in v) d++;
    return d;
}
setTimeout(evalSame,2000);
function addHandlers() {
    $(".run").click(function () {
		var f=$(this).closest(".item");
  	 	var codes=JSON.parse(f.find(".code").text());
  	 	var files={};
  	 	var autoexec="Run";
  	 	for (var k in codes) {
  	 		if (k=="HTML") files[autoexec+".html"]=codes[k];
  	 		if (k=="JavaScript") files[autoexec+".tonyu"]=codes[k];
  	 	}
  	 	files["options.json"]=JSON.stringify({
  	 		"compiler":{"namespace":"user","outputFile":"js/concat.js",
  	 		"defaultSuperClass":"jslker.Parent",
  	 		"dependingProjects":[{"namespace":"jslker","compiledURL":"${JSLKer}"}]}
  	 	});
  	 	if (window.wnd && window.wnd.location.href) {
  	 	    window.wnd.focus();
  	 	} else {
      	 	window.wnd=window.open("about:blank");
  	 	}
  	 	$.post("../a.php?runit",{
  	 		files: JSON.stringify(files),
  	 		autoexec:autoexec+".html"
  	 	}).then(function (u) {
  	 		window.wnd.location.href=u;
  	 	}).fail(function (e) {
  	 		console.log(e);
  	 	});

    });
  $(".same").click(same);
  $(".same").on("mouseout",function (){prevc=0;});
  $(".same_next").click(function () {
      var f=$(this).closest(".form");
      same.apply(this,[]);
      setTimeout(function () {f.find(".check").click();},500);
  });
  function same() {
  	    //console.log(prev);
  	    if (prevc>=prevs.length) return;
  	    var prev=prevs[prevc];
  	    prevc=(prevc+1)%prevs.length;
  	    var f=$(this).closest(".form");
  	    f.find(".diy").each(function () {
     	    this.checked=prev[this.name];
        });
        f.find(".com").val(prev.com);
  }
  $(".check").click(function () {
  	 var f=$(this).closest(".form");
  	 //console.log(f);
  	 var no=parseInt(f.find(".anchor").attr("name"));
  	 var digest=f.find(".digest").text();
  	 //console.log(digest);
  	 location.href=location.href.replace(/#.*/,"")+"#"+(no+1);
  	 var data={};
  	 f.find(".diy").each(function () {
  	     console.log(this.name,this.checked);
  	 	data[this.name]=this.checked;
  	 });
  	 data.com=f.find(".com").val();
  	 if (data.com==="") data.com="No comment";
  	 data.digest=digest;
  	 f.removeClass("notyet");
  	 if (!comTex[data.com]) {
  	     comTex[data.com]=data;
 	 	 comList.append($("<option>").val(data.com));
     }
     if (!prevs[0] || prevs[0].com!==data.com) {
        prevs.unshift(data);
        if (prevs.length>10) prevs.pop();
     }
     prevc=0;
     tagFindBox.val("");
  	 //alert("CHECK! "+no);
  	 $.post("../a.php?Score",{
  	 	cmd:"write",
  	 	digest:digest,
  	 	data:JSON.stringify(data)
  	 }).then(function (r) {
  	 	console.log("Succ",r);
  	 },function (e) {
  	 	console.log("Err",e);
  	 });
  });
  $(".allok").click(function () {
  	 var f=$(this).closest(".form");
  	 f.find(".diy").each(function () {
  	 	this.checked=true;
  	 });
     f.find(".check").click();
  });
  /*$(".com").on("change",function () {
        var r=comTex[this.value];
  	    if (r) {
            var f=$(this).closest(".form");
           	f.find(".diy").each(function () {
  	    		this.checked=!!r[this.name];
	  	    });
        }
  });*/
  $(".form").each(function () {
  	 var f=$(this);
  	 var digest=f.find(".digest").text();
  	 var com=f.find(".com");
  	 $.post("../a.php?Score",{
  	 	cmd:"read",
  	 	digest:digest,
  	 }).then(function (r) {
  	 	if (typeof r=="string") r=JSON.parse(r);
  	 	f.find(".diy").each(function () {
  	 		this.checked=!!r[this.name];
	  	});
  	 	//console.log("Succ",r);
  	 	if (!comTex[r.com]) {
    	 	comList.append($("<option>").val(r.com));
    	 	comTex[r.com]=r;
  	 	} else {
  	 	    if (checkStatus(comTex[r.com])!=checkStatus(r)) {
  	 	        console.log("Warning",r.com," has different check status");
  	 	    }
  	 	}

  	 	com.val(r.com);
  	 	if (!r.com) {
  	 		f.addClass("notyet");
  	 		f.append("NOTYET");
  	 	}
  	 },function (e) {
  	 	console.log("Err",e);
  	 });
  });
  $("pre").dblclick(toggleBeautify);

  var scr=$("<script>")[0];
  scr.src="beautify-html.js";
  scr.onload=(function () {
      //alert("LOAD");
      $("pre").each(toggleBeautify);
  });
  document.body.appendChild(scr);
  /*setTimeout(function () {
      $("pre").each(toggleBeautify);
  },10);*/
  $(".com").on("mouseenter",function () {
        var o=$(this).offset();
        console.log(o);
        tagNav.targetCom=$(this);
        tagNav.css({top:o.top+100});
        if (NT) {
            refreshTags($(this).val());
        }
  });

}
function refreshTags(cmt) {
    tagArea.empty();
    $.get("../a.php?Score",{cmd:"tags",cmt:cmt}).then(function (r) {
        var tags=JSON.parse(r);
        var input=tagNav.targetCom;
        tags.forEach(function (tag) {
            $("<span>").addClass("tag").text(tag).click(function () {
                addTag(input, tag);
            }).appendTo(tagArea);
        });
        findTag.apply(tagFindBox,[]);
    }).fail(function (e) {
        console.log("Err",e);
    });
}
function addTag(input, tag) {
    var t=input.val();
    if (t=="No comment") t="";
    var nv=t+(t!=""?"，":"")+tag.replace(/，$/,"");
    nv=sortCom(nv);
    input.val(nv);
    refreshTags(nv);
}
function toggleBeautify() {
  	var text=$(this).text();
  	var orig=$.data(this, "orig");
  	if (orig) {
	  	$.data(this, "orig", null);
  		$(this).text(orig);
  	} else {
	  	$.data(this, "orig", text);
  		text=text.replace(/\/\/.*\n/g,"").replace(/\n+/g,"\n");
  		//console.log("beautify",text);
  		if (looks_like_html(text)) {
  		    text=html_beautify(text);
  		} else {
      		text=js_beautify(text);
  		}
  		$(this).text(text);
  	}
}
function checkStatus(t) {
    return "D"+t.d+"I"+t.i+"Y"+t.y;
}
function tipEvent() {
    $(".tip").hover(function () {
        var d=this.hdom;
        if (!d) {
             d=this.hdom=$("<pre>").appendTo("body");
             var pos=$(this).offset();
            d.css({position:"absolute",
                   left: pos.left , top: pos.top+50,
                   backgroundColor:"#ffc",borderStyle:"solid",borderWidth:"1px"
            });
            d.text($(this).attr("data-text"));
        }
        d.show();
    },function () {
        var d=this.hdom;
        if (d) {
            d.hide();
        }
    });
}
function diffAll() {
    var items=$(".logitem").get();
    var i=items.length-2;
    setTimeout(diffItem,10);
    function diffItem() {
        if (i<0) {
            //tipEvent();
            return;
        }
        try {
            var prevItem=$(items[i]);
            var nextItem=$(items[i+1]);
            var prePres=prevItem.find(".prog").get();
            var nextPres=nextItem.find(".prog").get();
            for (var j=0;j<prePres.length;j++) {
                diff($(prePres[j]), $(nextPres[j]));
            }
        } catch (e){console.log(e);}
        i--;
        setTimeout(diffItem,10);
    }
}
function addEcl(elem) {
    var p=$.data(elem,"pos")-0;
    var tx=elem.text();
    elem.empty();
    elem.append($("<span>").text(tx.substring(0,p)));
    elem.append($("<img>").attr("src","images/ecl.png"));
    elem.append($("<span>").text(tx.substring(p)));
}
function diff(prev,next) {
    var base = /*difflib.stringAsLines*/(prev.text());
    var newtxt = /*difflib.stringAsLines*/(next.text());

    var sm = new difflib.SequenceMatcher(base, newtxt);

    // get the opcodes from the SequenceMatcher instance
    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    // in order to yield the new text
    var opcodes = sm.get_opcodes();
    var diffhtml="";
    var len=0;
    opcodes.forEach(function (opcode) {
        var tx=newtxt.substring(opcode[3],opcode[4]);
        var btx=base.substring(opcode[1],opcode[2]);
        // text-decoration:line-through;
        len+=opcode[4]-opcode[3];
        switch(opcode[0]) {
            case "equal":
                diffhtml+=esc(tx);
                break;
            case "insert":
                diffhtml+="<span style='background-color: #8f8'>"+esc(tx)+"</span>";
                break;
            case "delete":
                /*diffhtml+=
                "<span style='background-color: #f88;text-decoration:line-through'>"+
                esc(btx)+"</span>";*/
                diffhtml+="<img class='tip' data-text='"+esc(btx)+"' src='../images/ecl.png'/>";
                break;
            case "replace":
                /*diffhtml+=
                "<span style='background-color: #fc8;text-decoration:line-through'>"+
                esc(btx)+"</span>";*/
                diffhtml+="<span class='tip' data-text='"+esc(btx)+"' style='background-color: #ff8'>"+esc(tx)+"</span>";
                //diffhtml+="<span style='background-color: #ff8'>"+esc(tx)+"</span>";
                break;
            default:
                console.log(opcode[0]);
        }
    });
    //diffhtml="[len="+len+"  origlen="+newtxtstr.length+"]"+diffhtml;
    next.html(diffhtml);

    function esc(t) {
        return t.replace(/&/g,"&amp;").
        replace(/</g,"&lt;").
        replace(/>/g,"&gt;").
        replace(/"/g,"&quot;");
    }
    /*var diffoutputdivjq = $("<div>");
    next.after(diffoutputdivjq);
    var diffoutputdiv = diffoutputdivjq[0];
    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    //var contextSize = $("contextSize").value;
    contextSize = null; //contextSize ? contextSize : null;

    // build the diff view and add it to the current DOM
    diffoutputdiv.appendChild(diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        // set the display titles for each resource
        baseTextName: "prev"+"",
        newTextName: "next"+"",
        contextSize: contextSize,
        viewType: 1 //$("inline").checked ? 1 : 0
    }));*/
}
function tagOrder() {
    if (_tagOrder) return _tagOrder;
    var ord=["課題2","課題1","コラッツ","FizzBuzz","素数判定",
"[d]","[iR]","[iE]","[iB]","[iN]","[y]",
"不要なelseif文","二重ループに同じ変数使用","おしい","余分な改行",
"課題2のつもりっぽい","addText失敗したおかげで","題意は満たす",
"やりかけ","必ず改行してしまう","不要なaddText",
"ループ変数加算忘れ","elif","i++なし","番号が表示される","if文不使用","URL間違い",
"forの後ろに括弧がない","無限ループ","i初期化なし","同じ画像が連続する箇所あり",
"elseの後ろに括弧がない","同じ変数で二重ループ","src→scr",">がない","ループ条件","9個しかでない","個数違い",
"ただの複文を使っている","完全正解","不要なif文","num%2","二重ループ",
"二重ループにしていほしいところ","最初に改行","num*3","++→tt",
"繰り返す回数が違う","改行していない","i%2","課題1なら意図したとおりの正解","i%2==10",
"改行のタイミングが違う","改行しすぎ","10個でるけど1段おきにいれかわる","とてもおしい",
"png\"","Iとi","num初期化なし","エラー","2段しかない","i==1","{}の範囲がおかしい",
"空っぽのHTML","意図したとおりの正解","不要なdocument.write","bulefish","ifは使っていない",
"二重ループ使っている","課題1なら題意は満たす","正解","i<=0","画像が出ない","繰り返し不使用",
"表示ループ改行表示ループ","表示していない","変なところにaddText","謎のwhile","whilewhile",
"<がない","i%3","最初だけ9個で改行","ifの後ろに括弧がない","タグ名が違う","ループを使いこなせていない",
"コメントが多すぎて","i>25","タイミングがおかしい","ing","改行1回のみ","neco1","i%10==0なら","など",
"ed.png","pmg","FizzBuzzを改造中","やりかけ．課題1なら正解","画像表示と改行を同じif文で判定",
"奇偶判定がおかしい","addtext","i%5","Nabeatsu","課題1,src-images","課題1,i?","</script>なし",
"addTextで名前が違う","<img の<なし","test2","test","改行別ループ","Aoカンマpng","wait長すぎ",
"neco","画像が不要に出る","個数が違う","謎","題意は満たす．if文不使用","No comment","@png",
"二重ループおしい","i%3とは","すごーい","i%2がi%10 なら","なんか違う","入力された値+5が初期値",
"入力された値*5が初期値","{}なし","i%1","tekitou","出ない","tesu","uni-icons","i%2==1","不要なwhile",
"num=!1","num=num%2","while(num<1000)","num>1","num==10","逆にすごい","whileif","<vr>","num!=1",
"{ } の使い方間違い","whilw(num%2==0)","whileネスト","whileの後ろに括弧がない","奇偶判定なし",
"neko.png","i%4","繰り返しが多すぎ","不要なelseif文など","i<-10","なぜかかけざん","<div>で改行を代用",
"i%2==2","ifの条件がおかしい","if改行elseif画像表示","else→lese","fizzbuzzを改造中？","for(i=100;i<=100;i++)",
"これ桁あふれしないの？","1%2==0","if文不使用．i?","break知ってれば","空ループ","片方しかでない",
"6個ずつ改行","初期値が素数","練習問題","FizzBuzzを元に改造中","5個しかでない",
"1回しか繰り返さない","ifたくさん","[i]","if文を使いこなせていない"];
    var res={};
    for (var i in ord) {
        res[ord[i]]=i;
    }
    return _tagOrder=res;
}
var _exclusions;
function exclusions() {
    if (_exclusions) return _exclusions;
var ord=["[i]", "[y]", "No comment", "やりかけ", "題意は満たす",
"おしい", "完全正解", "エラー", "意図したとおりの正解", "など", "メッセージ変更",
"addText失敗したおかげで", "二重ループ使っている", "二重ループ", "題意は満たす．if文不使用",
"とてもおしい", "空ループ", "whilewhile", "{}の範囲がおかしい",
" ループを使いこなせていない", "i%2", "if文を使いこなせていない",
"rnd()で整数を初期化", "コメントが多すぎて", "複数解表示", "謎",
"FizzBuzzを元に改造中．<img>がない", "FizzBuzz．addtext",
"i%2==1", "tekitou", "tesu", "{ } の使い方間違い", "これ桁あふれしないの？",
"すごーい", "なんか違う", "謎のwhile", "逆にすごい"];
    var res={};
    for (var i in ord) {
        res[ord[i]]=i+1;
    }
    return _exclusions=res;
}
function excludeCom(com) {
    var e=exclusions() ;
    var coms=[];
    var v={};
    com.split("，").forEach(function (c) {
        if (v[c]) return;
        if (!e[c]) coms.push(c);
        v[c]=1;
    });
    return coms.join("，");
}
function sortCom(com) {
    var ord=tagOrder();
    var coms=com.split("，").sort(function (a,b) {
        return (ord[a]||10000)-(ord[b]||10000);
    });
    return coms.join("，");
}
