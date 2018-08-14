(function(){
	this["for_list"]=[];
	this["for_judge_with_inc"]=function(id,condition){
		this["for_list"][id]=(this["for_list"][id])?this["for_list"][id]:0;
		this["for_list"][id]++;
		return condition;
	};
	this["if_list"]=[];
	this["if_judge_with_inc"]=function(id,condition){
		if(this["if_list"][id]===undefined){
			this["if_list"][id]={"比較":0,"真":0,"偽":0};
		}
		this["if_list"][id]["比較"]++;
		if(condition==true)this["if_list"][id]["真"]++;
		else this["if_list"][id]["偽"]++;
		return condition;
	};
	this["性能"]=function(){
		var performance_list=this["性能snapshot"]();
		this["性能disp"](performance_list);
	};
	this["性能diff"]=function(before,_after){
		after=Object.assign({},_after);
		after["if_list"]=_after["if_list"].map(function(v){
			return Object.assign({},v)
		});
		after["exe_time"]-=before["exe_time"];
		var before_for_ids=Object.keys(before["for_list"]);
		for(var i=0;i<before_for_ids.length;i++){
			var id=before_for_ids[i];
			after["for_list"][id]-=before["for_list"][id];
		}
		var before_if_ids=Object.keys(before["if_list"]);
		for(var i=0;i<before_if_ids.length;i++){
			var id=before_if_ids[i];
			after["if_list"][id]["比較"]-=before["if_list"][id]["比較"];
			after["if_list"][id]["真"]-=before["if_list"][id]["真"];
			after["if_list"][id]["偽"]-=before["if_list"][id]["偽"];
		}
		return after;
	};
	this["性能測定スタート"]=function(){
		var start=this["性能snapshot"]();
		return function(){ //end
			var end=this["性能snapshot"]();
			var diff=this["性能diff"](start,end);
			this["性能disp"](diff);
		}.bind(this);
	};
	this["性能snapshot"]=function(){
		return {
			"exe_time":(this["経過時間"]()),
			"for_list":(this["for_list"].concat()),
			"if_list":(this["if_list"].map(function(v){return Object.assign({},v);}))
		};
	};
	this["性能disp"]=function(performance_list){
		var plist=performance_list;
		var exe_time=["実行時間 => "+(plist["exe_time"].toFixed(3))+"秒"]
		var for_performance_list=plist["for_list"].map(function(v,k){
			var line="for"+(k+1)+" : ";//idは1オリジンで表示したい
			line+="実行回数 => "+v;
			return line;
		});
		var if_performance_list=plist["if_list"].map(function(v,k){
			var line="if"+(k+1)+" : ";//idは1オリジンで表示したい
			line+="比較回数 => "+v["比較"];
			line+=", 真の回数 => "+v["真"];
			line+=", 偽の回数 => "+v["偽"];
			return line;
		});
		var list=[].concat(exe_time,for_performance_list,if_performance_list);
		this["dncl_disp"](["\n性能テスト----------------"],true);
		this["dncl_disp"]([list.join("\n")],true);
		this["dncl_disp"](["--------------------------\n"],true);
	};
}).apply(dnclroot);
