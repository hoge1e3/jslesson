function loadFiles(dir){
   if (WebSite.isNW) return;
	dir.rel('res.json').obj({"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":200,"pheight":200,"url":"images/icon_thumbnail.png"}],"sounds":[]});
	dir.rel('options.json').obj({"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"FNlog","bootClass":"Boot","globals":{"$defaultFPS":60,"$imageSmoothingDisabled":true}},"kernelEditable":false,"version":1527468833941,"plugins":{}});
}