function fillRect(x,y,w,h) {
    var ctx=initX()[0].getContext("2d");
    ctx.fillRect(x,y,w,h);
}
function clear() {
    var ctx=initX()[0].getContext("2d");
    var saveFillStyle=ctx.fillStyle;
    ctx.fillStyle="white";
    fillRect(0,0,400,400);
    ctx.fillStyle=saveFillStyle;
    if (window.drawGridFlag) doDrawGrid();
}
function update(){
    var msec=16;
    return new Promise(function (succ) {
        console.log("Sleeping for ",msec);
        setTimeout(succ,msec); 
    });
}
function initX() {
    if (window.xCanvas) return window.xCanvas;
    window.xCanvas=$("<canvas>").attr({width:400,height:400});
    $("body").append(window.xCanvas);
    return window.xCanvas;
}
function setColor(r,g,b) {
    var ctx=initX()[0].getContext("2d");
    ctx.fillStyle="rgb("+[Math.floor(r-0),Math.floor(g-0),Math.floor(b-0)].join(",")+")";
}
function drawGrid() {
    window.drawGridFlag=true;
    doDrawGrid();
}
function doDrawGrid() {
    var c=initX()[0];
    var ctx=c.getContext("2d");
    ctx.save();
	ctx.strokeStyle="#00ff00";
	for (var i=0 ; i<c.width ; i+=10) {
	    ctx.beginPath();
	    ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
	    ctx.moveTo(i,0);    
	    ctx.lineTo(i,c.height);    
	    ctx.closePath();
	    ctx.stroke();
	}

	for (var i=0 ; i<c.height ; i+=10) {
	    ctx.beginPath();
	    ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
	    ctx.moveTo(0,i);    
	    ctx.lineTo(c.width,i);    
	    ctx.closePath();
	    ctx.stroke();
	}
	ctx.fillStyle="black";
	ctx.font="15px monospaced";
	for (var i=100 ; i<c.width ; i+=100) {
	    ctx.fillText(i, i,15);
	}
	for (var i=100 ; i<c.height ; i+=100) {
	    ctx.fillText(i, 0,i);
	}
    ctx.restore();
}