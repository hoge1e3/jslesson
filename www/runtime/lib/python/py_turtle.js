/* global self, global */
define([],function () {
    function install(PL) {
        // same with root.js
        function getRoot(){
            if (typeof window!=="undefined") return window;
            if (typeof self!=="undefined") return self;
            if (typeof global!=="undefined") return global;
            return (function (){return this;})();
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
                if (e.keyCode===32) {
                    e.preventDefault();
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
        const tdef=({
            __init__: function (self) {
                self._position=Vec(0,0);
                self._heading=0;
            },
            init: function(self) {
                if (self.inited) return;
                self.screen=initX();
                const ctx=self.ctx();
                ctx.strokeStlye="black";
                ctx.lineWidth=1;
                self.inited=true;
            },
            vec: function (self) {
                self.init();
                return r(self._heading);
            },
            ctx: function (self) {
                return self.screen[0].getContext("2d");
            },
            forward: function (self ,by ){
                self.init();
                const ctx=self.ctx();
                let cv=conv(self._position);
                console.log(cv,self._position);
                ctx.moveTo(cv.x,cv.y);
                self._position=self._position.__add__(
                    self.vec().__mul__(by)
                );
                cv=conv(self._position);
                console.log(cv,self._position);
                ctx.lineTo(cv.x,cv.y);
                ctx.stroke();
            },
            right: function (self,by) {
                self.init();
                self._heading-=by;
                return self;
            },
            left: function (self,by) {
                self.init();
                self.right(-by);
                return self;
            },
            clear: function (self) {
                self.init();
                clear();
                return self;
            },
            position: function (self) {
                return PL.Tuple([self._position.x, self._position.y]);
            }
        });
        const Turtle=PL.class(tdef);
        function r(dir) {
            return Vec(Math.cos(dir*Math.PI/180), Math.sin(dir*Math.PI/180));
        }
        const Vec=PL.class({
            __init__: function (self,x,y) {
                self.x=x;
                self.y=y;
            },
            __add__: function (self, other) {
                return Vec(self.x+other.x, self.y+other.y);
            },
            __mul__: function (self, k) {
                return Vec(self.x*k, self.y*k);
            }
        });
        function clear() {
            const cv=initX()[0];
            const ctx=cv.getContext("2d");
            ctx.clearRect(0,0,cv.width, cv.height);
        }
        function conv(pos) {
            var cv=initX()[0];
            return Vec(
                cv.width/2+pos.x,
                cv.height/2-pos.y,
            );
        }
        const lib=PL.import.libs.turtle={};
        const theTurtle=new Turtle();
        for (let k of Object.keys(tdef)) {
            lib[k]=theTurtle[k].bind(theTurtle);
        }
        lib.Vec=Vec;
        lib.Turtle=Turtle;
        console.log("py_turtle", Object.keys(lib));
        return lib;
    }
    return {install};
});
