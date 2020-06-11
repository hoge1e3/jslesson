/* global self, global */
define([],function () {
    function install(PL) {
        var lib=PL.import.libs.turtle={};
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
        function conv(pos) {
            var cv=initX()[0];
            return lib.Vec(
                cv.width/2+pos.x,
                cv.height/2-pos.y,
            );
        }
        lib.Turtle=PL.class({
            __init__: function (self) {
                self.screen=initX();
                self.position=lib.Vec(0,0);
                self._heading=0;
                const ctx=self.ctx();
                ctx.strokeStlye="black";
                ctx.lineWidth=1;
            },
            vec: function (self) {
                return r(self._heading);
            },
            ctx: function (self) {
                return self.screen[0].getContext("2d");
            },
            forward: function (self ,by ){
                const ctx=self.ctx();
                let cv=conv(self.position);
                console.log(cv,self.position);
                ctx.moveTo(cv.x,cv.y);
                self.position=self.position.__add__(
                    self.vec().__mul__(by)
                );
                cv=conv(self.position);
                console.log(cv,self.position);
                ctx.lineTo(cv.x,cv.y);
                ctx.stroke();
            },
            right: function (self,by) {
                self._heading+=by;
            },
        });
        function r(dir) {
            return lib.Vec(Math.cos(dir*Math.PI/180), Math.sin(dir*Math.PI/180));
        }
        lib.Vec=PL.class({
            __init__: function (self,x,y) {
                self.x=x;
                self.y=y;
            },
            __add__: function (self, other) {
                return lib.Vec(self.x+other.x, self.y+other.y);
            },
            __mul__: function (self, k) {
                return lib.Vec(self.x*k, self.y*k);
            }
        });
        return lib;
    }
    return {install};
});
