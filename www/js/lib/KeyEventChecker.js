define([],function () {
	var KEC={};
	KEC.down=function (elem, name, handler) {
		if (!(elem instanceof $)) elem=$(elem);
		elem.bind("keydown", function (e) {
			if (KEC.is(e, name)) {
				return handler.call(elem[0],e);
			}
		});
	};
	var codes={8:"bs",13:"enter",37:"left",38:"up",39:"right",40:"down"};
	KEC.is=function (e,name) {
		name=name.toLowerCase();
		e = e.originalEvent || e;
		var s="";
		if (e.altKey) {
			s+="alt+";
		}
		if (e.ctrlKey) {
			s+="ctrl+";
		}
		if (e.shiftKey) {
			s+="shift+";
		}
		if (e.keyCode>=112 && e.keyCode<=123) {
			s+="f"+(e.keyCode-111);
        } else if (codes[e.keyCode]){
            s+=codes[e.keyCode];
		} else {
			s+=String.fromCharCode(e.keyCode);
		}
		s=s.toLowerCase();
		return name==s;
	};
	return KEC;
});