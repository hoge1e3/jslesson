(function () {
  this.$ = this.create();
  this.$.create = dtlbind(this, function (tag) {
    return this.window.$.call(this.root, tag);
  });
  this.Actor = this.create();
  this.Actor.pos = this.Vec2.O;
  this.Actor.dir = 0;
  this.Actor.num = dtlbind(this, function (x) {
    if (x) {
      return x;
    } else {
      return 0;
    }
  });
  this.Actor.createSVGElem = dtlbind(this, function (tag) {
    return this.$.create(
      this.document.createElementNS("http://www.w3.org/2000/svg", tag),
    );
  });
  this.Actor.copySVGElem = dtlbind(this, function (dst, src) {
    var t;
    var n;
    var a;
    var s;
    src = this.$.create(src);
    dst = this.$.create(dst);
    t = this;
    return src.children().each(
      dtlbind(this, function () {
        s = this;
        n = t.createSVGElem(s.tagName).get(0);
        a = t.Array.prototype.slice.call(s.attributes);
        a.each(
          dtlbind(this, function (an) {
            an = an.name;
            return n.setAttribute(an, s.getAttribute(an));
          }),
        );
        dst.append(n);
        return t.copySVGElem(n, s);
      }),
    );
  });
  this.Actor.show = dtlbind(this, function () {
    this.group.add(this);
    this.setTrans();
    this.isShowing = this.true;
    return this;
  });
  this.Actor.hide = dtlbind(this, function () {
    this.group.remove(this);
    this.isShowing = this.false;
    return this;
  });
  this.Actor.toFront = dtlbind(this, function () {
    // SVGでは要素の順序が描画順序を決定する
    // 要素を親要素の最後に移動することで最前面に表示
    if (this.element) {
      var parent = this.element.parent();
      if (parent.length > 0) {
        // 要素をいったん取り外してから最後に追加する
        this.element.detach();
        parent.append(this.element);
      }
    }
    return this;
  });
  this.Actor
    .addAlias("show", "appear")
    .addAlias("hide", "die")
    .addAlias("toFront", "bringToFront");
  this.Actor.group = this.Actor.create();
  this.Actor.group.members = this.Array.create();
  this.Actor.group.remove = dtlbind(this, function (m) {
    var i;
    i = this.members.indexOf(m);
    if (i >= 0) {
      this.members.splice(i, 1);
    }
    if (m.element) {
      m.element.remove();
    }
    return;
  });
  this.Actor.group.add = dtlbind(this, function (m) {
    var i;
    if (m.getCrashShape) {
      // 真の場合は何もしない
    } else {
      this.system.throw("NO" + m);
    }
    i = this.members.indexOf(m);
    if (i < 0) {
      this.members.push(m);
      this.element.append(m.element);
    }
    return;
  });
  this.Actor.initSVG = dtlbind(this, function () {
    var t;
    var wndj;
    var svgw;
    var svgh;
    this.svg = this.$.create("svg");
    this.console.log("SVG", this.svg);
    wndj = this.$.create(this.window);
    svgw = wndj.width();
    svgh = wndj.height();
    if (svgh <= 0) {
      svgh = (svgw / 16) * 9;
    }
    if (this.svg.length === 0) {
      this.svg = this.createSVGElem("svg")
        .attr("id", "turtle_svg")
        .attr("width", svgw)
        .attr("height", svgh)
        .css("position", "absolute")
        .appendTo("body");
    }
    this.svg_g = this.svg.find("g");
    if (this.svg_g.length === 0) {
      this.svg_g = this.createSVGElem("g")
        .attr("transform", "translate(" + svgw / 2 + "," + svgh / 2 + ") scale(1,-1)")
        .appendTo(this.svg);
    }
    t = this;
    wndj.resize(
      dtlbind(this, function () {
        svgw = wndj.width();
        svgh = wndj.height();
        if (svgh <= 0) {
          svgh = (svgw / 16) * 9;
        }
        t.svg.attr("width", svgw).attr("height", svgh);
        return t.svg_g.attr(
          "transform",
          "translate(" + svgw / 2 + "," + svgh / 2 + ") scale(1,-1)",
        );
      }),
    );
    return (this.group.element = this.svg_g);
  });
  this.Actor.initSVG();
  this.Actor.forward = dtlbind(this, function (by) {
    by = this.num(by);
    this._lastPos = this.pos;
    this._lastStep = by;
    this.pos = this.pos.add(this.Vec2.X.rotate(this.dir).mul(by));
    this.setTrans();
    return this;
  });
  this.Actor.backward = dtlbind(this, function (by) {
    by = this.num(by);
    return this.forward(-by);
  });
  this.Actor.turnLeft = dtlbind(this, function (by) {
    by = this.num(by);
    this.dir = this.dir + by;
    this.setTrans();
    return this;
  });
  this.Actor.turnRight = dtlbind(this, function (by) {
    by = this.num(by);
    return this.turnLeft(-by);
  });
  this.Actor.leftTurn = this.Actor.turnLeft;
  this.Actor.rightTurn = this.Actor.turnRight;
  this.Actor.getCrashShape = dtlbind(this, function () {
    return this.Polygon
      .create()
      .addVertex(-this.width / 2, -this.height / 2)
      .addVertex(this.width / 2, -this.height / 2)
      .addVertex(this.width / 2, this.height / 2)
      .addVertex(-this.width / 2, this.height / 2)
      .transform(this.dir, this.pos);
  });
  this.Actor.crashTo = dtlbind(this, function (o) {
    if (o.getCrashShape) {
      // 真の場合は何もしない
    } else {
      this.system.throw("NO" + o);
    }
    return this.getCrashShape().intersects(o.getCrashShape());
  });
  this.Actor._scale = 1;
  this.Actor._scalex = 1;
  this.Actor._scaley = 1;
  this.Actor.setTrans = dtlbind(this, function (str) {
    str = "translate(" + this.pos.x + " " + this.pos.y + ") ";
    str = str + "rotate(" + this.dir + ") ";
    str = str + "scale(" + this._scalex + " " + this._scaley + ") ";
    this.element
      .attr("transform", str)
      .attr("data-trans", this.pos.x + "," + this.pos.y + "," + this.dir);
    if (this.isShowing) {
      this.checkCrash();
    }
    return this;
  });
  this.Actor.scale = dtlbind(this, function (sx, sy) {
    // If only one argument, use it for both x and y (backward compatibility)
    if (arguments.length === 1 || sy === undefined) {
      sy = sx;
    }
    this._scalex = this._scalex * sx;
    this._scaley = this._scaley * sy;
    this._scale = Math.max(this._scalex, this._scaley); // Keep _scale for compatibility
    return this.setTrans();
  });
  this.Actor.moveTo = dtlbind(this, function (dx, dy) {
    dx = this.num(dx);
    dy = this.num(dy);
    this.pos = this.Vec2.create(dx, dy);
    return this.setTrans();
  });
  this.Actor.moveToCenter = dtlbind(this, function () {
    return this.moveTo(0, 0);
  });
  this.Actor.addAlias("moveToCenter", "moveCenter");
  this.Actor.moveBy = dtlbind(this, function (dx, dy) {
    dx = this.num(dx);
    dy = this.num(dy);
    return this.moveTo(this.pos.x + dx, this.pos.y + dy);
  });
  this.Actor.setDir = dtlbind(this, function (d) {
    this.dir = this.num(d);
    return this.setTrans();
  });
  this.Actor.addAlias("setDir", "direction");
  this.Actor.getDir = dtlbind(this, function () {
    return this.dir;
  });
  this.Actor.addAlias("getDir", "direction?");
  root.collision = dtlbind(this, function () {
    return;
  });
  root.collision.isEventHandler = this.true;
  this.Actor.hitTarget = this.undef;
  this.Actor.checkCrash = dtlbind(this, function () {
    if (this.Actor._doingCheckCrash) {
      return;
    } else {
      this.Actor._doingCheckCrash = 1;
      this.allCrash().each(
        dtlbind(this, function (a) {
          this.hitTarget = a;
          if (this["typeof"](this.collision) === "function") {
            this.collision(a);
          }
          a.hitTarget = this;
          if (this["typeof"](a.collision) === "function") {
            a.collision(this);
          }
          a.hitTarget = this.undef;
          return (this.hitTarget = this.undef);
        }),
      );
      this.Actor._doingCheckCrash = 0;
    }
    return;
  });
  this.Actor.allCrash = dtlbind(this, function () {
    var res;
    res = this.Array.create();
    this.group.members.each(
      dtlbind(this, function (a) {
        if (this !== a) {
          if (this.crashTo(a)) {
            res.push(a);
          }
        }
        return;
      }),
    );
    return res;
  });
  this.Actor.bounce = dtlbind(this, function (_hitTarget) {
    var lp;
    var ld;
    var stp;
    var a;
    lp = this._lastPos;
    ld = this.dir;
    stp = lp.sub(this.pos).len();
    this.pos = lp;
    a = 2 * (this.dir - _hitTarget.getDir());
    this.turnRight(a);
    this.forward(stp);
    if (this.allCrash().length) {
      this.pos = lp;
      this.dir = ld;
      this.turnLeft(180 - a);
      this.forward(stp);
      if (this.allCrash().length) {
        this.pos = lp;
        this.dir = ld;
        this.turnLeft(180);
      }
    }
    return this;
  });
  this.Actor["xpos?"] = dtlbind(this, function () {
    return this.pos.x;
  });
  return (this.Actor["ypos?"] = dtlbind(this, function () {
    return this.pos.y;
  }));
})
  .checkerror()
  .apply(root, []);

/*
$=!create.
$:create=[|tag| (window:$) ! (root) (tag) call. ].
Actor=!create.
Actor:pos=Vec2:O.
Actor:dir=0.
Actor:num=[|x| [x]!then[x]else[0]execute ].
//Actor:actorList=Array! create.
Actor:createSVGElem=[|tag|
    $! (document !
    "http://www.w3.org/2000/svg" (tag)
    createElementNS
    ) create.
].
Actor:copySVGElem=[|dst src;t n a s|
    src=$!(src)create.
    dst=$!(dst)create.
    t=this.
    src ! children [
        s=this.
        n=t ! (s:tagName) createSVGElem  0 get.
        a=(t:Array:prototype:slice)! (s:attributes) call.
        a ! [|an|
            an=an:name.
            n ! (an) (s!(an) getAttribute) setAttribute.
        ] each.
        dst ! (n) append.
        t ! (n) (s) copySVGElem.
    ] each.
].
Actor:show=[
    group ! (this) add.
    !setTrans.
    isShowing=true.
    this.
].
Actor:hide=[|;i|
    group ! (this) remove.
    isShowing=false.
    this.
].
Actor:toFront=[
    [element] ! then [
        parent=element ! parent.
        [parent:length>0] ! then [
            element ! detach.
            parent ! (element) append.
        ] execute.
        this.
    ] execute.
    this.
].
Actor!"show" "appear" addAlias "hide" "die" addAlias "toFront" "bringToFront" addAlias.
Actor:group=Actor !create.
Actor:group:members=Array!create.
Actor:group:remove=[|m;i|
    i=members ! (m) indexOf.
    [i>=0] ! then [
        members ! (i) (1) splice.
    ] execute.
    [m:element] ! then [m:element ! remove] execute.
].
Actor:group:add=[|m;i|
    [m:getCrashShape] ! then [] else [ system ! ("NO"+m) throw ]execute.
    i=members ! (m) indexOf.
    [i<0] ! then [
        members ! (m) push.
        element ! (m:element) append.
    ] execute.
].

Actor:initSVG=[|;t wndj svgw svgh|
    svg=$ ! "svg" create.
    console ! "SVG" (svg) log.
    wndj=$ ! (window) create.
    svgw=(wndj ! width).
    svgh=(wndj ! height).
    [svgh<=0] ! then [svgh=svgw/16*9] execute.
    [svg:length==0] ! then [
        //window ! (svgw+","+svgh) alert.
        svg= !"svg" createSVGElem 
        "id" "turtle_svg" attr
        "width" (svgw) attr
        "height" (svgh) attr
        "position" "absolute" css
        "body" appendTo.
    ] execute.
    svg_g = svg ! "g" find.
    [svg_g:length==0] ! then [
        svg_g= ! "g" createSVGElem 
        "transform" ("translate("+(svgw/2)+","+(svgh/2)+") scale(1,-1)") attr 
        (svg) appendTo.
    ] execute.
    t=self.
    wndj ! [
        svgw=(wndj ! width).
        svgh=(wndj ! height).
        [svgh<=0] ! then [svgh=svgw/16*9] execute.
        (t:svg) ! "width" (svgw) attr "height" (svgh) attr.
        (t:svg_g) !"transform" ("translate("+(svgw/2)+","+(svgh/2)+") scale(1,-1)") attr. 
    ] resize.
    group:element=svg_g.
].
Actor! initSVG.

// element pos dir
Actor:forward=[|by|
    by=!(by) num.
    _lastPos=pos.
    _lastStep=by.
    pos=pos ! ((Vec2:X) ! (dir) rotate (by) mul) add.
    !setTrans.
    this.
].
Actor:backward=[|by|
    by=!(by) num.
    ! (-by) forward.
].
Actor:turnLeft=[|by|
    by=!(by) num.
    dir=dir+by.
    !setTrans.
    this.
].
Actor:turnRight=[|by|
    by=!(by) num.
    ! (-by) turnLeft.
].
Actor:leftTurn=Actor:turnLeft.
Actor:rightTurn=Actor:turnRight.

Actor:getCrashShape=[
    Polygon ! create
    (-width/2) (-height/2) addVertex
    (width/2) (-height/2) addVertex
    (width/2) (height/2) addVertex
    (-width/2) (height/2) addVertex
    (dir) (pos) transform.
].
//Actor:getCrashPolygon=[
//    ! getWorldPolygon toPolyKArray.
//].
Actor:crashTo=[|o|
    [o:getCrashShape] ! then [] else [ system ! ("NO"+o) throw ]execute.

    (!getCrashShape) ! (o ! getCrashShape) intersects.
    //    (window:PolyK) ! (! getCrashPolygon) (o ! getCrashPolygon) Intersects.
].
Actor:_scale=1.
Actor:_scalex=1.
Actor:_scaley=1.
Actor:setTrans=[|str|
    str="translate("+(pos:x)+" "+(pos:y)+") ".
    str=str+"rotate("+dir+") ".
    str=str+"scale("+_scalex+" "+_scaley+") ".
    element ! "transform" (str) attr
    "data-trans" ((pos:x)+","+(pos:y)+","+dir) attr.
    [isShowing] !then [! checkCrash] execute.
    this.
].
Actor:scale=[|sx sy| 
    [sy] ! then [] else [sy=sx] execute.
    _scalex=_scalex*sx.
    _scaley=_scaley*sy.
    _scale=(_scalex max _scaley).
    !setTrans
].
Actor:moveTo=[|dx dy|
    dx=!(dx) num.dy=!(dy) num.
    pos=Vec2 !(dx)(dy) create.
    ! setTrans
].
Actor:moveToCenter=[
    !0 0 moveTo.
].
Actor!"moveToCenter" "moveCenter" addAlias.

Actor:moveBy=[|dx dy|
    dx=!(dx) num.dy=!(dy) num.
    ! (pos:x+dx) (pos:y+dy) moveTo
].
Actor:setDir=[|d|
    dir=!(d) num.
    !setTrans
].
Actor ! "setDir" "direction" addAlias.
Actor:getDir=[dir].
Actor ! "getDir" "direction?" addAlias.
//Actor ! "collision" addEventType.// ★
:collision=[].
:collision:isEventHandler=true.
Actor:hitTarget=undef.
Actor:checkCrash=[|;t|
    [Actor:_doingCheckCrash] ! then [] else [
        Actor:_doingCheckCrash=1.//TODO:true
        !allCrash [|a|
            self:hitTarget=a.
            ! (a) collision.
            a:hitTarget=self.
            a ! (this) collision.
            a:hitTarget=undef.
            self:hitTarget=undef.
        ] each. //TODO: localize
        Actor:_doingCheckCrash=0.
    ] execute.
].
Actor:allCrash=[|;t res|
    res=Array ! create.
    (group:members) ! [|a|
        [this!=a] ! then [
            [! (a) crashTo] ! then [
                res!(a) push.
            ] execute.
        ] execute.
    ] each.
    res.
].
Actor:bounce＝[| _hitTarget; lp ld stp a |
    lp=_lastPos.ld=dir.
    stp=lp ! (pos) sub len.
    pos=lp.
    a=2*( dir - ( _hitTarget ! getDir ) ).
    ! (a) turnRight.
    ! ( stp ) forward.
    [(! allCrash):length] ! then [
        pos=lp. dir=ld.
        ! ( 180- a ) turnLeft.
        ! ( stp ) forward.
        [(! allCrash):length] ! then [
            pos=lp. dir=ld.
            ! 180 turnLeft.
        ] execute.
    ] execute.
    self
].
Actor:xpos?=[pos:x].
Actor:ypos?=[pos:y].
*/
