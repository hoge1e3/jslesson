function isinclude(arr,name){var res=false;arr.forEach(function(e){if(e==name)res=true;});return res;}

function startup(options){
  console.log(options);
  if(isinclude(options,"grid"))grid_show();

	if(isinclude(options,"moveslow")){
		root["_turtle"]=root["turtle"];
		// 元のタートルを継承した入れ物にする（空の入れ物だと Turtle.js の builtinImageSize や Figure.js の lineIntersection が
		// 「タートル」経由で見つからず、ゆっくり実行でタートルが作れなかった。2026-10-31）
		root["turtle"]=Object.create(root["_turtle"]);
		root["turtle"]["create"]=dtlbind(root,function(){
			return root["_turtle"]["create"]()["moveSlow"]();
		});
		root["addAlias"]("turtle","Turtle","タートル","たーとる");
	}
}
