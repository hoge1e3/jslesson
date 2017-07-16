(function(){this['Screen']=this['create']();
this['Screen']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['width']();
});
this['Screen']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['$']['create']((this['window']))['height']();
});
this['Screen']['paint']=dtlbind(this,function(c){
var self=this;var 自分=self;
return this['$']['create']("body")['css']("background-color",((c+"")));
});
this['addAlias']("Screen","Panel");
this['UI']=this['create']();
this['UI']['setTrans']=dtlbind(this,function(){
var self=this;var 自分=self;
var str;
str=(((("postion:absolute;left:"+(this['pos']['x']))+";top:")+(this['pos']['y']))+";");
this['element']['attr']("transform",(str))['attr']("data-trans",((((this['pos']['x'])+",")+(this['pos']['y']))));
return this;
});
this['UI']['hide']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['hide']();
}));
return this;
});
this['UI']['show']=dtlbind(this,function(){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['show']();
}));
return this;
});
this['UI']['addAlias']("hide","die");
this['UI']['addAlias']("show","appear");
this['UI']['top']=((((this['Screen']['height?']())/(2)))-(20));
this['UI']['autoLayout']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['UILayout']['add']((this));
});
this['UI']['moveTo']=dtlbind(this,function(left,top){
var self=this;var 自分=self;
this['UILayout']['remove']((this),(left),(top));
return this;
});
this['UI']['moveBy']=dtlbind(this,function(dx,dy){
var self=this;var 自分=self;
return this['moveTo']((((this['left?']())+dx)),(((this['top?']())+dy)));
});
this['UI']['left?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['element']['offset']())['left']-((this['UI']['container']['offset']())['left']));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['addAlias']("left?","xpos?");
this['UI']['right?']=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['left?']())+(this['width?']()));
});
this['UI']['top?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return -(((this['element']['offset']())['top']-((this['UI']['container']['offset']())['top'])));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['addAlias']("top?","ypos?");
this['UI']['bottom?']=dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['top?']())-(this['height?']()));
});
this['UI']['width?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['outerWidth']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['height?']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['outerHeight']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (0);
}));
});
this['UI']['width']=dtlbind(this,function(w){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['width']((w));
}));
return this;
});
this['UI']['height']=dtlbind(this,function(w){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['height']((w));
}));
return this;
});
this['UI']['nextLine']=dtlbind(this,function(){
var self=this;var 自分=self;
var top;
var left;
this['UILayout']['br']((this));
return this;
});
this['UI']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (this['element']['get']((0)))['innerHTML']=this['num2str']((m));
}));
return this;
});
this['UI']['addAlias']("write","set");
this['UI']['add']=dtlbind(this,function(m){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['write'](((((this['element']['get']((0)))['innerHTML'])+m)));
}));
return this;
});
this['UI']['newLine']=dtlbind(this,function(){
var self=this;var 自分=self;
this['add']("<br>");
return this;
});
this['UI']['clear']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['write']("");
});
this['UI']['num2strDigits']=(1000000);
this['UI']['num2str']=dtlbind(this,function(v){
var self=this;var 自分=self;
var r;
dtlbind(this,function(){
var self=this;var 自分=self;
return (v===this['null']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return v="";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (v===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return v="";
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['typeof']((v)))==="number");
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return v=(((this['window']['Math'])['round'](((v*this['num2strDigits']))))/this['num2strDigits']);
}));
return (v+"");
});
this['UI']['int2str']=this['UI']['num2str'];
this['UI']['str2num']=dtlbind(this,function(s){
var self=this;var 自分=self;
var r;
r=this['window']['parseFloat']((s));
return dtlbind(this,function(){
var self=this;var 自分=self;
return (r===r);
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return s;
}));
});
this['UI']['str2int']=this['UI']['str2num'];
this['UI']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['text']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "";
}));
});
this['UI']['read']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['str2num']((this['readString']()));
});
this['UI']['addAlias']("read","get");
this['UI']['inc']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
return this['write'](((((this['read']())-(0))+by)));
});
this['UI']['addAlias']("inc","increment");
this['UI']['dec']=dtlbind(this,function(by){
var self=this;var 自分=self;
by=dtlbind(this,function(){
var self=this;var 自分=self;
return by;
})['or'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}));
return this['write']((((this['read']())-by)));
});
this['UI']['addAlias']("dec","decrement");
this['UI']['paint']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
this['element']['css']("background-color",(c));
return this;
});
this['UI']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
this['element']['css']("color",(c));
return this;
});
this['UI']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;
this['element']['css']("font-size",(((s/(10))+"em")));
return this;
});
this['UI']['size']=dtlbind(this,function(w,h){
var self=this;var 自分=self;
this['element']['css']("width",((w+"px")))['css']("height",((h+"px")));
return this;
});
this['UI']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['UI']['container']=this['$']['create']("<div>")['appendTo']("body")['css']("position","absolute")['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
this['$']['create']((this['window']))['resize']((dtlbind(this,function(){
var self=this;var 自分=self;
return this['UI']['container']['css']("left",(((this['Screen']['width?']())/(2))))['css']("top",(((this['Screen']['height?']())/(2))));
})['bind']((this))));
this['UILayout']=this['create']();
this['UILayout']['space']=(20);
this['UILayout']['initElem']=dtlbind(this,function(){
var self=this;var 自分=self;
this['element']=this['$']['create']("<div>")['appendTo']((this['UI']['container']));
this['element']['css']("white-space","nowrap")['css']("position","absolute")['css']("left",(((-(this['Screen']['width?']())/(2))+this['space'])))['css']("top",(((-(this['Screen']['height?']())/(2))+this['space'])));
return this['$']['create']((this['window']))['resize']((dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['css']("left",(((-(this['Screen']['width?']())/(2))+this['space'])))['css']("top",(((-(this['Screen']['height?']())/(2))+this['space'])));
})['bind']((this))));
});
this['UILayout']['initElem']();
this['UILayout']['add']=dtlbind(this,function(ui){
var self=this;var 自分=self;
ui['element']['remove']();
ui['inUILayout']=this;
this['element']['append']((ui['element']));
ui['attachEvent']();
return ui['element']['css']("position","static");
});
this['UILayout']['remove']=dtlbind(this,function(ui,left,top){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return ui['inUILayout'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
ui['element']['remove']();
ui['inUILayout']=this['false'];
this['UI']['container']['append']((ui['element']));
return ui['attachEvent']();
}));
return ui['element']['css']("position","absolute")['css']("left",(left))['css']("top",(-top));
});
this['UILayout']['br']=dtlbind(this,function(ui){
var self=this;var 自分=self;
return this['$']['create']("<br>")['insertBefore']((ui['element']));
});
this['Label']=this['UI']['create']();
this['Label']['left']=(0);
this['Label']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
var t;
t=this;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<span>")['text']((this['num2str']((label))))['css']("font-size","1.0em")['css']("vertical-align","top")['css']("white-space","nowrap");
return this['autoLayout']();
});
this['Label']['fontColor']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var args;
var c;
args=root['window']['Array']['prototype']['slice']['call']((arguments));
dtlbind(this,function(){
var self=this;var 自分=self;
return (args['length']===(1));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=r;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=this['Color']['create']((r),(g),(b));
}));
this['element']['css']("color",(c));
return this;
});
this['Label']['fontSize']=dtlbind(this,function(s){
var self=this;var 自分=self;
this['element']['css']("font-size",(((s/(10))+"em")));
return this;
});
this['Button']=this['UI']['create']();
this['Button']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Button']['left']=(0);
this['Button']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;
var t;
t=this;
return this['element']['click'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}));
});
this['Button']['initialize']=dtlbind(this,function(label,key){
var self=this;var 自分=self;
var t;
t=this;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<button>")['text']((this['num2str']((label))))['css']("vertical-align","top")['css']("white-space","nowrap");
this['autoLayout']();
this['element']['css']("font-size","1.0em")['css']("white-space","nowrap")['css']("border-style","none");
return dtlbind(this,function(){
var self=this;var 自分=self;
return key;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return root['window']['$'](dtlbind(this,function(){
var self=this;var 自分=self;
return root['window']['document']['addEventListener']("keydown",dtlbind(this,function(k){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return (k['keyCode']===(root['Button']['keyCodeDict']['read']((((key+""))['toUpperCase']()))));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']();
}));
}),(root['true']));
}));
}));
});
this['Button']['setAction']=dtlbind(this,function(a){
var self=this;var 自分=self;
this['action']=a;
return this;
});
this['Button']['keyCodeDict']=this['Dict']['create']();
dtlbind(this,function(){
var self=this;var 自分=self;
var arr;
arr=this['Array']['create']("0","1","2","3","4","5","6","7","8","9");
dtlbind(this,function(n){
var self=this;var 自分=self;
return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(47))));
})['repeat']((arr['length?']()));
arr=this['Array']['create']("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
dtlbind(this,function(n){
var self=this;var 自分=self;
return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(64))));
})['repeat']((arr['length?']()));
arr=this['Array']['create']("F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12");
dtlbind(this,function(n){
var self=this;var 自分=self;
return this['Button']['keyCodeDict']['write']((arr['get']((n))),((n+(111))));
})['repeat']((arr['length?']()));
return this['Button']['keyCodeDict']['write']("ESCAPE",(27))['write']("MINUS",(189))['write']("BACK_SLASH",(220))['write']("OPEN_BRACKET",(219))['write']("CLOSE_BRACKET",(221))['write']("SEMICOLON",(186))['write']("COMMA",(188))['write']("PERIOD",(190))['write']("SLASH",(191))['write']("ENTER",(13))['write']("PAGE_UP",(33))['write']("PAGE_DOWN",(34))['write']("END",(35))['write']("HOME",(36))['write']("LEFT",(37))['write']("UP",(38))['write']("RIGHT",(39))['write']("DOWN",(40))['write']("SPACE",(32))['write']("SHIFT",(16))['write']("CTRL",(17));
})['execute']();
this['Button']['inc']=dtlbind(this,function(){
var self=this;var 自分=self;
var label;
label=(this['element']['get']((0)))['innerHTML'];
dtlbind(this,function(){
var self=this;var 自分=self;
return label['match']((root['window']['RegExp']("^([0-9０-９]+)$")));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['text']((((root['window']['parseInt']((label)))+(1))));
}));
return this;
});
this['Field']=this['UI']['create']();
this['Field']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
return });
this['Field']['attachEvent']=dtlbind(this,function(){
var self=this;var 自分=self;
var t;
t=this;
return this['element']['keypress'](dtlbind(this,function(key){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return ((key['which'])===(13));
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return t['action']((t['readString']()));
}));
}));
});
this['Field']['setAction']=dtlbind(this,function(a){
var self=this;var 自分=self;
this['action']=a;
return this;
});
this['Field']['initialize']=dtlbind(this,function(label){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (label===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return label=this['read']();
}));
this['element']=this['$']['create']("<input>")['val']((this['num2str']((label))))['css']("vertical-align","top")['css']("white-space","nowrap");
return this['autoLayout']();
});
this['Field']['write']=dtlbind(this,function(m){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']((this['num2str']((m))));
}));
return this;
});
this['Field']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "";
}));
});
this['TextArea']=this['UI']['create']();
this['ListBox']=this['TextArea']['create']();
this['TextArea']['initialize']=dtlbind(this,function(){
var self=this;var 自分=self;
var label;
label=this['read']();
this['manualRow']=this['false'];
this['manualCol']=this['false'];
this['element']=this['$']['create']("<textarea>")['val']((label))['css']("vertical-align","top");
this['element']['attr']("readonly",(this['isReadOnly']));
this['autoResize']();
this['autoLayout']();
return this['writeLn']['apply']((this),(arguments));
});
this['TextArea']['autoNewLine']=dtlbind(this,function(f){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (f===this['undef']);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return f=this['true'];
}));
this['isAutoBR']=f;
return this;
});
this['TextArea']['addAlias']("autoNewLine","autoBR");
this['TextArea']['setReadOnly']=dtlbind(this,function(f){
var self=this;var 自分=self;
this['isReadOnly']=f;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['attr']("readonly",(f));
}));
return this;
});
this['TextArea']['readOnly']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['setReadOnly']((this['true']));
});
this['TextArea']['writable']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['setReadOnly']((this['false']));
});
this['TextArea']['addAlias']("writable","readWrite");
this['ListBox']['readOnly']()['autoBR']();
this['TextArea']['mblen']=dtlbind(this,function(s){
var self=this;var 自分=self;
var i;
var c;
var r;
i=(0);
r=(0);
dtlbind(this,function(){
var self=this;var 自分=self;
return (i<(s['length']));
})['while']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
c=s['charCodeAt']((i));
r=(r+(dtlbind(this,function(){
var self=this;var 自分=self;
return (c>=(128));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return (2);
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (1);
}))));
return i=(i+(1));
}));
return r;
});
this['TextArea']['autoResize']=dtlbind(this,function(){
var self=this;var 自分=self;
var r;
var c;
r=(1);
c=(1);
this['readString']()['split']("\n")['each'](dtlbind(this,function(s){
var self=this;var 自分=self;
var l;
l=this['mblen']((s));
dtlbind(this,function(){
var self=this;var 自分=self;
return (l>c);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return c=l;
}));
return r=(r+(1));
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['manualRow'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['attr']("rows",(r));
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return this['manualCol'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return }))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['attr']("cols",(c));
}));
return this;
});
this['TextArea']['setRow']=dtlbind(this,function(r){
var self=this;var 自分=self;
this['element']['attr']("rows",(r));
this['manualRow']=this['true'];
return this;
});
this['TextArea']['setCol']=dtlbind(this,function(c){
var self=this;var 自分=self;
this['element']['attr']("cols",(c));
this['manualCol']=this['true'];
return this;
});
this['TextArea']['overwrite']=dtlbind(this,function(){
var self=this;var 自分=self;
var a;
var buf;
this['clear']();
return this['writeLn']['apply']((this),(arguments));
});
this['TextArea']['readString']=dtlbind(this,function(){
var self=this;var 自分=self;
return dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']();
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return "";
}));
});
this['TextArea']['read']=this['TextArea']['readString'];
this['TextArea']['write']=dtlbind(this,function(){
var self=this;var 自分=self;
(this['Array']['prototype']['slice'])['call']((arguments))['each'](dtlbind(this,function(cont){
var self=this;var 自分=self;
return this['_write1']((cont),(this['isAutoBR']));
}));
return this['autoResize']();
});
this['TextArea']['rawOverwrite']=dtlbind(this,function(c){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['element'];
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['element']['val']((c));
}));
return this;
});
this['TextArea']['rawAppend']=dtlbind(this,function(cont){
var self=this;var 自分=self;
return this['rawOverwrite']((((this['readString']())+(this['num2str']((cont))))));
});
this['TextArea']['writeLn']=dtlbind(this,function(){
var self=this;var 自分=self;
(this['Array']['prototype']['slice'])['call']((arguments))['each'](dtlbind(this,function(cont){
var self=this;var 自分=self;
return this['_write1']((cont),(this['true']));
}));
return this['autoResize']();
});
this['TextArea']['_write1']=dtlbind(this,function(cont,br){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return this['instanceof']((cont),(this['Array']));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return cont['each'](dtlbind(this,function(e){
var self=this;var 自分=self;
return this['_write1']((e),(br));
}));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
this['rawAppend']((cont));
return dtlbind(this,function(){
var self=this;var 自分=self;
return br;
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['rawAppend']("\n");
}));
}));
return this;
});
this['TextArea']['newLine']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['rawAppend'](("\n"));
});
this['TextArea']['clear']=dtlbind(this,function(){
var self=this;var 自分=self;
this['rawOverwrite']("");
return this['autoResize']();
});
this['TextArea']['readAsArray']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['read']()['split']("\n")['select'](dtlbind(this,function(e){
var self=this;var 自分=self;
return (e!=="");
}))['map']((dtlbind(this,function(e){
var self=this;var 自分=self;
return this['str2num']((e));
})['bind']((this))));
});
return this['TextArea']['changeLine']=dtlbind(this,function(no,line){
var self=this;var 自分=self;
return this['overwrite']((this['readAsArray']()['set']((no),(line))));
});
}).checkerror().apply(root,[]);
//# sourceMappingURL=UI.js.map
