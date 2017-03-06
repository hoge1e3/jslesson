function fillRect(x,y,w,h) {
    var ctx=initX()[0].getContext("2d");
    ctx.fillRect(x,y,w,h);
}
function clear() {
    fillRect(x,y,400,400);
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