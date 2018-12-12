(function(){
	var for_list=[];
	this["for_judge_with_inc"]=function(id,condition){
		for_list[id]=(for_list[id])?for_list[id]:0;
		if(condition==true)for_list[id]++;
		return condition;
	};
	var while_list=[];
	this["while_judge_with_inc"]=function(id,condition){
		while_list[id]=(while_list[id])?while_list[id]:0;
		if(condition==true)while_list[id]++;
		return condition;
	};
	var if_list=[];
	this["if_judge_with_inc"]=function(id,condition){
		if(if_list[id]===undefined){
			if_list[id]={"比較":0,"真":0,"偽":0};
		}
		if_list[id]["比較"]++;
		if(condition==true)if_list[id]["真"]++;
		else if_list[id]["偽"]++;
		return condition;
	};
	var func_list={};
	this["func_call_cnt"]=function(name){
		func_list[name]=func_list[name]||0;
		func_list[name]++;
		return name;
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
		var before_while_ids=Object.keys(before["while_list"]);
		for(var i=0;i<before_while_ids.length;i++){
			var id=before_while_ids[i];
			after["while_list"][id]-=before["while_list"][id];
		}
		var before_if_ids=Object.keys(before["if_list"]);
		for(var i=0;i<before_if_ids.length;i++){
			var id=before_if_ids[i];
			after["if_list"][id]["比較"]-=before["if_list"][id]["比較"];
			after["if_list"][id]["真"]-=before["if_list"][id]["真"];
			after["if_list"][id]["偽"]-=before["if_list"][id]["偽"];
		}
		var before_func_names=Object.keys(before["func_list"]);
		for(var i=0;i<before_func_names.length;i++){
			var name=before_func_names[i];
			after["func_list"][name]-=before["func_list"][name];
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
			"for_list":(for_list.concat()),
			"while_list":(while_list.concat()),
			"if_list":(if_list.map(function(v){return Object.assign({},v);})),
			"func_list":(Object.assign({},func_list)),
		};
	};
	this["性能disp"]=function(performance_list){
		var plist=performance_list;
		var exe_time=[(plist["exe_time"].toFixed(3))+"秒"];
		var for_performance_list=plist["for_list"].map(function(v,k){
			var line="for"+(k+1)+" : ";//idは1オリジンで表示したい
			line+=v;
			return line;
		});
		var while_performance_list=plist["while_list"].map(function(v,k){
			var line="while"+(k+1)+" : ";//idは1オリジンで表示したい
			line+=v;
			return line;
		});
		var if_performance_list=plist["if_list"].map(function(v,k){
			var line="if"+(k+1)+" : ";//idは1オリジンで表示したい
			line+="比較 "+v["比較"];
			line+=", 真 "+v["真"];
			line+=", 偽 "+v["偽"];
			return line;
		});
		var func_performance_list=Object.keys(plist["func_list"]).map(function(k){
			var line=k+" : ";
			line+=plist["func_list"][k];
			return line;
		});
		var list=[].concat(["(実行時間)"],exe_time,["(実行回数)"],for_performance_list,while_performance_list,if_performance_list,["(呼び出し回数)"],func_performance_list);
		this["dncl_disp"](["\n統計情報------------------"],true);
		this["dncl_disp"]([list.join("\n")],true);
		this["dncl_disp"](["--------------------------\n"],true);
	};
}).apply(dnclroot);
