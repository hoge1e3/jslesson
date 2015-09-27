Tonyu.klass.define({
  fullName: 'jslker.Parent',
  shortName: 'Parent',
  namespace: 'jslker',
  includes: [],
  methods: {
    main :function _trc_Parent_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Parent_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__Math :function _trc_Parent___getter__Math() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.Math;
    },
    __getter__document :function _trc_Parent___getter__document() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return window.document;
    },
    addText :function _trc_Parent_addText(elem,val) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000228;//jslker.Parent:228
      $("[name="+elem+"]").append(val);
    },
    fiber$addText :function _trc_Parent_f_addText(_thread,elem,val) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000228;//jslker.Parent:228
      $("[name="+elem+"]").append(val);
      
      _thread.retVal=_this;return;
    },
    setText :function _trc_Parent_setText(elem,val) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000343;//jslker.Parent:343
      $("[name="+elem+"]").text(val);
    },
    fiber$setText :function _trc_Parent_f_setText(_thread,elem,val) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000343;//jslker.Parent:343
      $("[name="+elem+"]").text(val);
      
      _thread.retVal=_this;return;
    },
    onClick :function _trc_Parent_onClick(elem,func) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000462;//jslker.Parent:462
      $("[name="+elem+"]").click(func);
    },
    fiber$onClick :function _trc_Parent_f_onClick(_thread,elem,func) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000462;//jslker.Parent:462
      $("[name="+elem+"]").click(func);
      
      _thread.retVal=_this;return;
    },
    onTouch :function _trc_Parent_onTouch(elem,func) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$onTouch :function _trc_Parent_f_onTouch(_thread,elem,func) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setCanvas :function _trc_Parent_setCanvas(canv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000706;//jslker.Parent:706
      _this.canvas=$("[name="+canv+"]")[0];
    },
    fiber$setCanvas :function _trc_Parent_f_setCanvas(_thread,canv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000706;//jslker.Parent:706
      _this.canvas=$("[name="+canv+"]")[0];
      
      _thread.retVal=_this;return;
    },
    setColor :function _trc_Parent_setColor(r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000765;//jslker.Parent:765
      if (_this.canvas) {
        $LASTPOS=1000786;//jslker.Parent:786
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1000824;//jslker.Parent:824
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1000873;//jslker.Parent:873
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
    },
    fiber$setColor :function _trc_Parent_f_setColor(_thread,r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000765;//jslker.Parent:765
      if (_this.canvas) {
        $LASTPOS=1000786;//jslker.Parent:786
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1000824;//jslker.Parent:824
        _this.ctx.fillStyle="rgb("+r+","+g+","+b+")";
        $LASTPOS=1000873;//jslker.Parent:873
        _this.ctx.strokeStyle="rgb("+r+","+g+","+b+")";
        
      }
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Parent_fillRect(x,y,w,h) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1000951;//jslker.Parent:951
      if (_this.canvas) {
        $LASTPOS=1000972;//jslker.Parent:972
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001010;//jslker.Parent:1010
        _this.ctx.fillRect(x,y,w,h);
        
      }
    },
    fiber$fillRect :function _trc_Parent_f_fillRect(_thread,x,y,w,h) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1000951;//jslker.Parent:951
      if (_this.canvas) {
        $LASTPOS=1000972;//jslker.Parent:972
        _this.ctx=_this.canvas.getContext("2d");
        $LASTPOS=1001010;//jslker.Parent:1010
        _this.ctx.fillRect(x,y,w,h);
        
      }
      
      _thread.retVal=_this;return;
    },
    getNumber :function _trc_Parent_getNumber(elem) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001121;//jslker.Parent:1121
      _this.val=$("[name="+elem+"]").val();
      return _this.val-0;
    },
    fiber$getNumber :function _trc_Parent_f_getNumber(_thread,elem) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001121;//jslker.Parent:1121
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val-0;return;
      
      
      _thread.retVal=_this;return;
    },
    getText :function _trc_Parent_getText(elem) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001251;//jslker.Parent:1251
      _this.val=$("[name="+elem+"]").val();
      return _this.val;
    },
    fiber$getText :function _trc_Parent_f_getText(_thread,elem) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001251;//jslker.Parent:1251
      _this.val=$("[name="+elem+"]").val();
      _thread.retVal=_this.val;return;
      
      
      _thread.retVal=_this;return;
    },
    setNumber :function _trc_Parent_setNumber(elem,num) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001389;//jslker.Parent:1389
      $("[name="+elem+"]").text(num);
    },
    fiber$setNumber :function _trc_Parent_f_setNumber(_thread,elem,num) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001389;//jslker.Parent:1389
      $("[name="+elem+"]").text(num);
      
      _thread.retVal=_this;return;
    },
    move :function _trc_Parent_move(elem,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001449;//jslker.Parent:1449
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
    },
    fiber$move :function _trc_Parent_f_move(_thread,elem,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001449;//jslker.Parent:1449
      $("[name="+elem+"]").css({position: "absolute",left: x,top: y});
      
      _thread.retVal=_this;return;
    },
    transform :function _trc_Parent_transform(elem,angle,scaleX,scaleY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001574;//jslker.Parent:1574
      console.log(scaleX,scaleY);
      $LASTPOS=1001607;//jslker.Parent:1607
      if (! scaleX) {
        $LASTPOS=1001629;//jslker.Parent:1629
        scaleX=1;
        $LASTPOS=1001648;//jslker.Parent:1648
        scaleY=1;
        
      } else {
        $LASTPOS=1001669;//jslker.Parent:1669
        if (! scaleY) {
          $LASTPOS=1001691;//jslker.Parent:1691
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1001718;//jslker.Parent:1718
      console.log(scaleX,scaleY);
      $LASTPOS=1001751;//jslker.Parent:1751
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
    },
    fiber$transform :function _trc_Parent_f_transform(_thread,elem,angle,scaleX,scaleY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001574;//jslker.Parent:1574
      console.log(scaleX,scaleY);
      $LASTPOS=1001607;//jslker.Parent:1607
      if (! scaleX) {
        $LASTPOS=1001629;//jslker.Parent:1629
        scaleX=1;
        $LASTPOS=1001648;//jslker.Parent:1648
        scaleY=1;
        
      } else {
        $LASTPOS=1001669;//jslker.Parent:1669
        if (! scaleY) {
          $LASTPOS=1001691;//jslker.Parent:1691
          scaleY=scaleX;
          
        }
      }
      $LASTPOS=1001718;//jslker.Parent:1718
      console.log(scaleX,scaleY);
      $LASTPOS=1001751;//jslker.Parent:1751
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg) scale("+scaleX+","+scaleY+")"});
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Parent_rotate(elem,angle) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1001908;//jslker.Parent:1908
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
    },
    fiber$rotate :function _trc_Parent_f_rotate(_thread,elem,angle) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1001908;//jslker.Parent:1908
      $("[name="+elem+"]").css({position: "absolute",transform: "rotate("+angle+"deg)"});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Parent_resize(elem,w,h) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      $LASTPOS=1002034;//jslker.Parent:2034
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
    },
    fiber$resize :function _trc_Parent_f_resize(_thread,elem,w,h) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      $LASTPOS=1002034;//jslker.Parent:2034
      $("[name="+elem+"]").css({position: "absolute",transform: "scale("+w+","+h+")"});
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_Parent_wait(time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      $LASTPOS=1002155;//jslker.Parent:2155
      time=time||100;
      $LASTPOS=1002176;//jslker.Parent:2176
      t = null;
      $LASTPOS=1002196;//jslker.Parent:2196
      t.suspend();
      $LASTPOS=1002214;//jslker.Parent:2214
      setTimeout((function anonymous_2225() {
        
        $LASTPOS=1002239;//jslker.Parent:2239
        t.steps();
      }),time);
    },
    fiber$wait :function _trc_Parent_f_wait(_thread,time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      $LASTPOS=1002155;//jslker.Parent:2155
      time=time||100;
      $LASTPOS=1002176;//jslker.Parent:2176
      t = _thread;
      $LASTPOS=1002196;//jslker.Parent:2196
      t.suspend();
      $LASTPOS=1002214;//jslker.Parent:2214
      setTimeout((function anonymous_2225() {
        
        $LASTPOS=1002239;//jslker.Parent:2239
        t.steps();
      }),time);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__Math":{"nowait":true},"__getter__document":{"nowait":true},"addText":{"nowait":false},"setText":{"nowait":false},"onClick":{"nowait":false},"onTouch":{"nowait":false},"setCanvas":{"nowait":false},"setColor":{"nowait":false},"fillRect":{"nowait":false},"getNumber":{"nowait":false},"getText":{"nowait":false},"setNumber":{"nowait":false},"move":{"nowait":false},"transform":{"nowait":false},"rotate":{"nowait":false},"resize":{"nowait":false},"wait":{"nowait":false}}}
});
