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