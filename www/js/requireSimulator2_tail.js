//-----------
	var resMod;
	requirejs(["pyRun"], function (r) {
	  resMod=r;
	});
	if (typeof window!=="undefined" && window.pyRun===undefined) window.pyRun=resMod;
	if (typeof module!=="undefined") module=resMod;
	return resMod;
})(window);
