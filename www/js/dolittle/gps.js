/*root.GPS=new (function(){
	var gps;
	this.緯度__question=function(){
		return gps.coords.latitude;
	}
	this.経度__question=function(){
		return gps.coords.longitude;
	}
	this.作る=function(){
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0)==false){
			alert("タブレット専用のオブジェクトです。この端末では動作しないことがあります");
			//return -1;
		}
		var obj={};
		var success=function(pos){return pos;};
		var error=function(){alert("GPSの立ち上げに失敗しました。");};
		gps=navigator.geolocation.getCurrentPosition(success,error);
		obj=Object.create(this);
		return obj;
	}
});
*/