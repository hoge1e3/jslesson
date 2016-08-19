(function(){this['Color']=this['root']['create']();
this['Color']['r']=(0);
this['Color']['g']=(0);
this['Color']['b']=(0);
this['Color']['initialize']=dtlbind(this,function(arg1,arg2,arg3){
var self=this;var 自分=self;
var args;
var r;
var g;
var b;
args=arguments;
dtlbind(this,function(){
var self=this;var 自分=self;
return (arg1['toString']())['match']((root['window']['RegExp']("^#[0-9A-F]{6}$")));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
var s;
s=arg1['toString']()['split']("");
s['shift']();
r=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
g=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
return b=root['window']['parseInt']((((s['shift']())+(s['shift']()))),(16));
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['and']['true'](((args['length']===(1))),(((this['typeof']((arg1)))==="number")));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
b=(arg1%(256));
arg1=root['window']['parseInt'](((arg1/(256))));
g=(arg1%(256));
arg1=root['window']['parseInt'](((arg1/(256))));
r=(arg1%(256));
return arg1=root['window']['parseInt'](((arg1/(256))));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
arg1=root['window']['Math']['floor']((arg1));
arg2=root['window']['Math']['floor']((arg2));
arg3=root['window']['Math']['floor']((arg3));
dtlbind(this,function(){
var self=this;var 自分=self;
return (arg1>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return r=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (arg1<(0));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return r=(0);
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return r=arg1;
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (arg2>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return g=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (arg2<(0));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return g=(0);
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return g=arg2;
}));
return dtlbind(this,function(){
var self=this;var 自分=self;
return (arg3>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return b=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (arg3<(0));
}))['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return b=(0);
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return b=arg3;
}));
}));
this['r']=r;
this['g']=g;
return this['b']=b;
});
this['Color']['randomCreate']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create']((((255)).random()),(((255)).random()),(((255)).random()));
});
this['Color']['darken']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create'](((this['r']-(50))),((this['g']-(50))),((this['b']-(50))));
});
this['Color']['brighten']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create'](((this['r']+(50))),((this['g']+(50))),((this['b']+(50))));
});
this['Color']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;
return (((((("rgb("+this['r'])+",")+this['g'])+",")+this['b'])+")");
});
this['Color']['setCMYK']=dtlbind(this,function(){
var self=this;var 自分=self;
this['black']=(this['window']['Math'])['min']((((1)-(this['r']/(255)))),(((1)-(this['g']/(255)))),(((1)-(this['b']/(255)))));
this['cyan']=(((((1)-((this['r']/(255))))-this['black']))/(((1)-this['black'])));
this['magenta']=(((((1)-((this['g']/(255))))-this['black']))/(((1)-this['black'])));
this['yellow']=(((((1)-((this['b']/(255))))-this['black']))/(((1)-this['black'])));
return this;
});
this['Color']['fromCMYK']=dtlbind(this,function(cyan,magenta,yellow,black){
var self=this;var 自分=self;
return this['Color']['create']((((((1)-((this['window']['Math'])['min']((1),(((cyan*(((1)-black)))+black))))))*(255))),(((((1)-((this['window']['Math'])['min']((1),(((magenta*(((1)-black)))+black))))))*(255))),(((((1)-((this['window']['Math'])['min']((1),(((yellow*(((1)-black)))+black))))))*(255))));
});
this['Color']['mixParam']=(1.1);
this['Light']=this['create']();
this['Light']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;
var r;
var g;
var b;
var l;
r=(0);
g=(0);
b=(0);
(this['Array']['prototype']['slice'])['call']((arguments))['each'](dtlbind(this,function(e){
var self=this;var 自分=self;
r=(r+(e['r']));
g=(g+(e['g']));
return b=(b+(e['b']));
}));
l=arguments['length'];
return this['Color']['create']((this['window']['Math']['min']((((r/l)*this['Color']['mixParam'])),(255))),(this['window']['Math']['min']((((g/l)*this['Color']['mixParam'])),(255))),(this['window']['Math']['min']((((b/l)*this['Color']['mixParam'])),(255))));
});
this['Ink']=this['create']();
this['Ink']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;
var c;
var m;
var y;
var k;
var l;
c=(0);
m=(0);
y=(0);
k=(0);
(this['Array']['prototype']['slice'])['call']((arguments))['each'](dtlbind(this,function(e){
var self=this;var 自分=self;
e['setCMYK']();
c=(c+(e['cyan']));
m=(m+(e['magenta']));
y=(y+(e['yellow']));
return k=(k+(e['black']));
}));
l=arguments['length'];
return this['Color']['fromCMYK']((this['window']['Math']['min']((((c/l)*this['Color']['mixParam'])),(1))),(this['window']['Math']['min']((((m/l)*this['Color']['mixParam'])),(1))),(this['window']['Math']['min']((((y/l)*this['Color']['mixParam'])),(1))),(this['window']['Math']['min']((((k/l)*this['Color']['mixParam'])),(1))));
});
this['black']=this['Color']['create']((0),(0),(0));
this['white']=this['Color']['create']((255),(255),(255));
this['blue']=this['Color']['create']((8),(8),(255));
this['red']=this['Color']['create']((255),(8),(8));
this['green']=this['Color']['create']((8),(255),(8));
this['pink']=this['Color']['create']((255),(0),(255));
this['magenta']=this['Color']['create']((255),(0),(255));
this['cyan']=this['Color']['create']((0),(255),(255));
return this['yellow']=this['Color']['create']((255),(255),(0));
}).checkerror().apply(root,[]);
//# sourceMappingURL=Color.js.map
