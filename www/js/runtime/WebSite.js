/*global process*/
define([], function () {
	if (typeof document==="undefined") {
		// node?;
		return {};
	}
	var loc=document.location.href;
	var WS=window.WebSite={};
	// from https://w3g.jp/blog/js_browser_sniffing2015
	var u=window.navigator.userAgent.toLowerCase();
	WS.tablet=(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
	|| u.indexOf("ipad") != -1
	|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
	|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
	|| u.indexOf("kindle") != -1
	|| u.indexOf("silk") != -1
	|| u.indexOf("playbook") != -1;
	WS.mobile=(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
	|| u.indexOf("iphone") != -1
	|| u.indexOf("ipod") != -1
	|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
	|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
	|| u.indexOf("blackberry") != -1;
	//-------------
	WS.top=".";
	if (!WS.pluginTop) {
		WS.pluginTop=WS.top+"/js/plugins";
	}
	WS.disableROM={};
	WS.sampleImg=WS.top+"/images";
	WS.isNW=(typeof process=="object" && process.__node_webkit);
	//WS.fsHome="";
	WS.tonyuHome="/Tonyu/";//changeHOME
	WS.JSLKer="runtime/lib/tjs/kernel.js";
	//WS.JSLKer="fs/Tonyu/Projects/JSLKer";
	WS.serverTop=location.href.replace(/\?.*$/,"").replace(/[^\/]*$/,"");//"."; // includes /
	WS.phpTop=WS.serverTop+"";//php/";
	WS.url={
		getDirInfo:WS.serverTop+"?getDirInfo",
		getFiles:WS.serverTop+"?getFiles",
		putFiles:WS.serverTop+"?putFiles"
/*			getDirInfo:WS.phpTop+"getDirInfo.php",
			getFiles:WS.phpTop+"getFiles.php",
			putFiles:WS.phpTop+"putFiles.php"*/
	};
	WS.controller=WS.serverTop+"";
	WS.runtime=WS.serverTop+"runtime/";
	//WS.published=WS.serverTop+"fs/home/";
	WS.published=WS.serverTop+"fs/pub/";
	WS.serverType="BA";
	WS.urlAliases= {
			"images/base.png":WS.runtime+"images/base.png",
			"images/Sample.png":WS.runtime+"images/Sample.png",
			"images/neko.png":WS.runtime+"images/neko.png",
			"images/inputPad.png":WS.runtime+"images/inputPad.png",
			"images/mapchip.png":WS.runtime+"images/mapchip.png",
			"images/sound.png":WS.runtime+"images/sound.png",
			"images/sound_ogg.png":WS.runtime+"images/sound_ogg.png",
			"images/sound_mp3.png":WS.runtime+"images/sound_mp3.png",
			"images/sound_mp4.png":WS.runtime+"images/sound_mp4.png",
			"images/sound_m4a.png":WS.runtime+"images/sound_m4a.png",
			"images/sound_mid.png":WS.runtime+"images/sound_mid.png",
			"images/sound_wav.png":WS.runtime+"images/sound_wav.png",
			"images/ecl.png":WS.runtime+"images/ecl.png"
	};
	WS.compiledKernel=WS.runtime+"/lib/tonyu/kernel.js";
	/*if (WS.isNW) {
		if (process.env.TONYU_HOME) {
			WS.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
		} else {
			WS.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
		}
	}*///DELJSL
	WS.tonyuKernel=WS.tonyuHome+"Kernel/";
	return WS;
});
