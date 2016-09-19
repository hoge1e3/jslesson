(function(){this['Color']=this['root']['create']();
this['Color']['r']=(0);
this['Color']['g']=(0);
this['Color']['b']=(0);
this['Color']['a']=(1);
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
this['b']=b;
return this['a']=(1);
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
return (((((((("rgba("+this['r'])+",")+this['g'])+",")+this['b'])+",")+this['a'])+")");
});
this['Color']['toHalfOpacity']=dtlbind(this,function(){
var self=this;var 自分=self;
this['a']=(0.5);
return this;
});
this['Color']['toFullOpacity']=dtlbind(this,function(){
var self=this;var 自分=self;
this['a']=(1);
return this;
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
this['Color']['getRed']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['r'];
});
this['Color']['getGreen']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['g'];
});
this['Color']['getBlue']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['b'];
});
this['Color']['mixParam']=(1.1);
this['Light']=this['create']();
this['Light']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;
var c;
this['args']=(this['Array']['prototype']['slice'])['call']((arguments));
this['args']=this['args']['select'](dtlbind(this,function(e){
var self=this;var 自分=self;
return (root['is'])['call']((e),(this['Color']));
}));
c=this['args']['shift']();
return dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['args']['length'])===(0));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (c['mixColor'])['apply']((c),(this['args']));
}));
});
this['Ink']=this['create']();
this['Ink']['mix']=dtlbind(this,function(){
var self=this;var 自分=self;
var c;
this['args']=(this['Array']['prototype']['slice'])['call']((arguments));
this['args']=this['args']['select'](dtlbind(this,function(e){
var self=this;var 自分=self;
return (root['is'])['call']((e),(this['Color']));
}));
c=this['args']['shift']();
return dtlbind(this,function(){
var self=this;var 自分=self;
return ((this['args']['length'])===(0));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return c;
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return (c['mixColor2'])['apply']((c),(this['args']));
}));
});
this['Color']['mixColor']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var red;
var green;
var blue;
var yyy;
var m;
args=(this['Array']['prototype']['slice'])['call']((arguments));
args=args['select'](dtlbind(this,function(e){
var self=this;var 自分=self;
return (root['is'])['call']((e),(this['Color']));
}));
red=this['getRed']();
green=this['getGreen']();
blue=this['getBlue']();
yyy=this['max']((red),(green),(blue));
args['each'](dtlbind(this,function(arg){
var self=this;var 自分=self;
var r;
var g;
var b;
var y;
r=arg['getRed']();
g=arg['getGreen']();
b=arg['getBlue']();
y=this['max']((r),(g),(b));
red=(red+r);
green=(green+g);
blue=(blue+b);
return yyy=(yyy+y);
}));
m=((yyy/(this['max']((red),(green),(blue))))/(((args['length'])+(1))));
return this['Color']['create'](((red*m)),((green*m)),((blue*m)));
});
this['Color']['max']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
var m;
m=r;
dtlbind(this,function(){
var self=this;var 自分=self;
return (m<g);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return m=g;
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (m<b);
})['then']()['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return m=b;
}));
return m;
});
this['Color']['mixColor2']=dtlbind(this,function(){
var self=this;var 自分=self;
var args;
var red;
var green;
var blue;
var yyy;
var m;
args=(this['Array']['prototype']['slice'])['call']((arguments));
args=args['select'](dtlbind(this,function(e){
var self=this;var 自分=self;
return (root['is'])['call']((e),(this['Color']));
}));
red=((255)-(this['getRed']()));
green=((255)-(this['getGreen']()));
blue=((255)-(this['getBlue']()));
yyy=this['max']((red),(green),(blue));
args['each'](dtlbind(this,function(arg){
var self=this;var 自分=self;
var r;
var g;
var b;
var y;
r=((255)-(arg['getRed']()));
g=((255)-(arg['getGreen']()));
b=((255)-(arg['getBlue']()));
y=this['max']((r),(g),(b));
red=(red+r);
green=(green+g);
blue=(blue+b);
return yyy=(yyy+y);
}));
m=((yyy/(this['max']((red),(green),(blue))))/(((args['length'])+(1))));
return this['Color']['create']((((255)-(red*m))),(((255)-(green*m))),(((255)-(blue*m))));
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
