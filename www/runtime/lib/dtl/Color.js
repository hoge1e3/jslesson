(function(){this['Color']=this['root']['create']();
this['Color']['r']=(0);
this['Color']['g']=(0);
this['Color']['b']=(0);
this['Color']['initialize']=dtlbind(this,function(r,g,b){
var self=this;var 自分=self;
dtlbind(this,function(){
var self=this;var 自分=self;
return (r>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return r=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (r<(0));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return r=(0);
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (g>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return g=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (g<(0));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return g=(0);
}));
dtlbind(this,function(){
var self=this;var 自分=self;
return (b>(255));
})['then']()['else'](dtlbind(this,function(){
var self=this;var 自分=self;
return b=(255);
}))['then'](dtlbind(this,function(){
var self=this;var 自分=self;
return (b<(0));
}))['execute'](dtlbind(this,function(){
var self=this;var 自分=self;
return b=(0);
}));
self['r']=r;
self['g']=g;
return self['b']=b;
});
this['Color']['randomCreate']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create']((((255)).random()),(((255)).random()),(((255)).random()));
});
this['Color']['darken']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create'](((self['r']-(50))),((self['g']-(50))),((self['b']-(50))));
});
this['Color']['brighten']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['Color']['create'](((self['r']+(50))),((self['g']+(50))),((self['b']+(50))));
});
this['Color']['toString']=dtlbind(this,function(){
var self=this;var 自分=self;
return (((((("rgb("+self['r'])+",")+self['g'])+",")+self['b'])+")");
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
