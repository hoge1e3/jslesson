var curcv;
var pat=/([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+):([0-9]+)/;
var min=str2date("2016-04-01T00:00:00");
var max=str2date("2016-08-01T00:00:00");
var WIDTH=800,HEIGHT=30;
var queue=[];
setInterval(function () {
    var f=queue.shift();
    if (f) f();
},0);
Date.prototype.add=function (o) {
    if (typeof o=="number") {
        return new Date(this.getTime()+o);
    } 
};
Date.prototype.sub=function (o) {
    if (typeof o=="number") {
        return new Date(this.getTime()-o);
    } 
    return this.getTime()-o.getTime();
};
function pad(str,p) {
    str=p+str;
    return str.substring(str.length-p.length);
}
Date.prototype.format=function (fmt) {
    var d=this;
    return fmt.replace(/y/ig,function () {
        return pad(d.getYear()+1900,"0000");    
    }).replace(/M/g,function () {
        return pad(d.getMonth()+1,"00");    
    }).replace(/d/ig,function () {
        return pad(d.getDate(),"00");    
    }).replace(/h/ig,function () {
        return pad(d.getHours(),"00");    
    }).replace(/m/g,function () {
        return pad(d.getMinutes(),"00");    
    }).replace(/s/ig,function () {
        return pad(d.getSeconds(),"00");    
    });
};
function duration() {
    return max.sub(min);
}
function pos2date(x) {
    return min.add(x/WIDTH*duration());
}
function setRange(i,a) {
    min=str2date(i);max=str2date(a);
    var ctx=$("#scale")[0].getContext("2d");
    for (i=0; i<10 ;i++) {
        var d=pos2date(WIDTH/10*i);
        ctx.fillText(d.format("M/D"),WIDTH*i/10,HEIGHT/3);
        ctx.fillText(d.format("h:m"),WIDTH*i/10,HEIGHT/3*2);
    }
    addZoomListener($("#scale"));
}
function addZoomListener(cv) {
    cv.click(function (e) {
        var x=(e.clientX-cv.offset().left);
        // 0.5 -> 2
        // 0.25 -> 1
        // 0 -> 0.5
        var zoom=0.5+Math.abs(x/WIDTH-0.5)*3;
        var center=pos2date(x)
        var nmin=center.sub(duration()*zoom/2);
        var nmax=center.add(duration()*zoom/2);
        location.href="showTimeline.php?min="+date2str(nmin)+"&max="+date2str(nmax);
        //alert(date2str(nmin)+" - "+date2str(nmax));
    });
}
function date2str(d) {
    return d.format("Y-M-DTh:m:s");
}
function str2date(s) {
    var m=pat.exec(s);
    var res=new Date();
    if (m) {
        res.setFullYear(m[1]);
        res.setMonth(m[2]-1);
        res.setDate(m[3]);
        res.setHours(m[4]);
        res.setMinutes(m[5]);
        res.setSeconds(m[6]);
    }
    return res;
}
function showLine(time) {
//2016-05-08T20:51:17+09:00  
    var ctx=curcv[0].getContext("2d");
    var d=str2date(time);
    ctx.fillRect(d.sub(min)/max.sub(min)*WIDTH,0,1,HEIGHT);
}
function setUser(file) {
    //0123-cho-data-time.txt
    var row=$("<tr>").appendTo("#tl");
    $("<td>").text(file).appendTo(row);
    curcv=$("<canvas>").attr({width:800,height:30});
    $("<td>").append(curcv).appendTo(row);
    
}
function setColor(col) {
    var ctx=curcv[0].getContext("2d");
    ctx.fillStyle=col;
}