function fillRect(x,y,w,h) {
    var ctx=initX()[0].getContext("2d");
    ctx.fillRect(x,y,w,h);
    writeGraphicsLog("fillRect("+[x,y,w,h].join(",")+");\n");
}
function writeGraphicsLog(s) {
    if (typeof writeGraphicsLog.buffer==="string") {
        writeGraphicsLog.buffer+=s;
    }
}
function clear() {
    var c=initX()[0];
    var ctx=c.getContext("2d");
    var saveFillStyle=ctx.fillStyle;
    ctx.fillStyle="white";
    fillRect(0,0,c.width,c.height);
    ctx.fillStyle=saveFillStyle;
    if (window.drawGridFlag) doDrawGrid();
    writeGraphicsLog("clear();\n");
}
function update(){
    var msec=16;
    loop_start2();
    var stats=KeyInfo.stats;
    for (var i in stats) {
        if (stats[i]>0) {stats[i]++;}
        if (stats[i]==-1) stats[i]=1;
    }
    writeGraphicsLog("update();\n");
    return new Promise(function (succ) {
        //console.log("Sleeping for ",msec);
        setTimeout(succ,msec);
    });
}
var KeyInfo={
    stats:{},
    codes:{
        left: 37 , up:38 , right: 39, down:40, space:32, enter:13,
        shift:16, ctrl:17, alt:18, mouseleft: 1
    }
};
function initX() {
    if (window.xCanvas) return window.xCanvas;
    window.xCanvas=$("<canvas>").attr({width:500,height:500});
    $("body").append(window.xCanvas);

    var stats=KeyInfo.stats;
    $(window).keydown(function (e) {
        var s=stats[e.keyCode];
        //console.log("key",e.keyCode,s,stats[e.keyCode]);
        if (!s) {
            stats[e.keyCode]=1;
        }
        //console.log("key2",JSON.stringify(stats));

    });
    $(window).keyup(function (e) {
        stats[e.keyCode]=0;
    });
    var codes=KeyInfo.codes;
    var i;
    for (i=65 ; i<65+26; i++) {
        codes[String.fromCharCode(i).toLowerCase()]=i;
    }
    for (i=48 ; i<58; i++) {
        codes[String.fromCharCode(i)]=i;
    }
    return window.xCanvas;
}
function setColor(r,g,b) {
    var ctx=initX()[0].getContext("2d");
    ctx.fillStyle="rgb("+[Math.floor(r-0),Math.floor(g-0),Math.floor(b-0)].join(",")+")";
    ctx.strokeStyle="rgb("+[Math.floor(r-0),Math.floor(g-0),Math.floor(b-0)].join(",")+")";
    writeGraphicsLog("setColor("+[r,g,b].join(",")+");\n");
}
function setLineWidth(w) {
    var ctx=initX()[0].getContext("2d");
    ctx.lineWidth=w;
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
function setPen(x, y) {
    var ctx=initX()[0].getContext("2d");
    setPen.sx = x;
    setPen.sy = y;
    writeGraphicsLog("setPen("+[x,y].join(",")+");\n");
}
setPen.sx=0;
setPen.sy=0;
function movePen(dx, dy) {
    var ctx=initX()[0].getContext("2d");
    ctx.beginPath();
    ctx.moveTo(setPen.sx, setPen.sy);
    setPen.sx += dx;
    setPen.sy += dy;
    ctx.lineTo(setPen.sx, setPen.sy);
    ctx.stroke();
    writeGraphicsLog("movePen("+[dx,dy].join(",")+");\n");
}
function setTextSize(s) {
    var ctx=initX()[0].getContext("2d");
    ctx.font=s+"px monospaced";
}
function drawString(s, x, y, sz) {
    var ctx=initX()[0].getContext("2d");
    if (sz) {
        ctx.font = sz + "px monospace";
    }
    ctx.fillText(ch_ptr_to_str(s), x, y);
}
function drawText(s, x, y, sz) {
    drawString(s,x,y,sz);
}
function drawNumber(s, x, y, sz) {
    drawString(s+"",x,y,sz);
}
function drawLine(x1, y1, x2, y2) {
    var ctx=initX()[0].getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    //  setPen(x1,y1);movePen(x2-x1,y2-y1);
}
function fillOval(x, y, w, h) {
    var ctx=initX()[0].getContext("2d");
    if (w * h === 0) return;
    var a = w / h;
    var r = h / 2;
    ctx.beginPath();
    ctx.save();
    ctx.scale(a, 1);
    ctx.arc(x / a + r, y + r, r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
    writeGraphicsLog("fillOval("+[x,y,w,h].join(",")+");\n");
}
function getkey(code) {
    var ctx=initX()[0].getContext("2d");
    var stats=KeyInfo.stats;
    var codes=KeyInfo.codes;
    if (code.IS_POINTER) {
        code=ch_ptr_to_str(code);
    }
    if (typeof code=="string") {
        code=codes[code.toLowerCase()];
    }
    //console.log(code,JSON.stringify(stats));
    if (!code) return 0;
    if (stats[code]==-1) return 0;
    if (!stats[code]) stats[code]=0;
    return stats[code];
}
function wait() {}
