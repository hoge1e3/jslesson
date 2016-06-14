(function() {
    this.$ = this.create();
    this.$.create = dtlbind(this, function(tag) {
        var self = this;
        var 自分 = self;
        return (this.window.$).call((this.root), (tag));
    });
    this.turtle = this.create();
    this.turtle.createSVGElem = dtlbind(this, function(tag) {
        var self = this;
        var 自分 = self;
        return this.$.create((this.document.createElementNS(
            "http://www.w3.org/2000/svg", (
                tag))));
    });
    this.turtle.initSVG = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        this.svg = this.$.create("svg");
        dtlbind(this, function() {
            var self = this;
            var 自分 = self;
            return (this.svg.length == (0));
        }).then().execute(dtlbind(this, function() {
            var self = this;
            var 自分 = self;
            return this.svg = this.createSVGElem(
                "svg").attr("width",
                "400").attr("height",
                "400").appendTo("body");
        }));
        this.svg_g = this.svg.find("g");
        return dtlbind(this, function() {
            var self = this;
            var 自分 = self;
            return (this.svg_g.length == (0));
        }).then().execute(dtlbind(this, function() {
            var self = this;
            var 自分 = self;
            return this.svg_g = this.createSVGElem(
                "g").attr("transform",
                "translate(200,200) scale(1,-1)"
            ).appendTo((this.svg));
        }));
    });
    this.turtle.initSVG();
    this.turtle.initialize = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        this.im = this.createSVGElem("image");
        this.im.get((0)).setAttributeNS(
            "http://www.w3.org/1999/xlink", "href",
            "runtime/images/ayumi.gif");
        this.im.attr("width", "32px").attr("height",
            "32px").attr("x", (-(16))).attr("y", (-(
            16))).attr("transform", "scale(1 -1)").appendTo(
            (this.svg_g));
        this.x = (0);
        this.y = (0);
        this.dir = (0);
        return this.newLineG();
    });
    this.turtle.newLineG = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        this.lineG = this.createSVGElem("g").appendTo((
            this.svg_g));
        this.lineG.attr("transform", ((((("translate(" +
                this.x) + " ") + this.y) +
            ")")));
        this.lX = this.x;
        return this.lY = this.y;
    });
    this.turtle.forward = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        var line;
        this.nx = (this.x + ((this.dir.radian().cos()) *
            by));
        this.ny = (this.y + ((this.dir.radian().sin()) *
            by));
        line = this.createSVGElem("line").attr("x1", ((
                this.x - this.lX))).attr("y1", ((this.y -
                this.lY))).attr("x2", ((this.nx - this.lX)))
            .attr("y2", ((this.ny - this.lY))).attr(
                "style",
                "stroke:rgb(0,0,0);stroke-width:3").appendTo(
                (this.lineG));
        this.x = this.nx;
        this.y = this.ny;
        this.setTrans();
        return this;
    });
    this.turtle.setTrans = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        var str;
        str = (((("translate(" + this.x) + " ") + this.y) +
            ") ");
        str = (((str + "rotate(") + this.dir) + ") ");
        str = (str + "scale(1 -1)");
        return this.im.attr("transform", (str));
    });
    this.turtle.turnLeft = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        this.dir = (this.dir + by);
        this.setTrans();
        return this;
    });
    this.turtle.turnRight = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        return this.turnLeft((-by));
    });
    this.turtle.makeFigure = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        this.r = this.figure.create((this));
        this.newLineG();
        return this.r;
    });
    this.figure = this.create();
    this.figure.initialize = dtlbind(this, function(parent) {
        var self = this;
        var 自分 = self;
        this.grp = parent.lineG;
        this.x = parent.lX;
        this.y = parent.lY;
        this.dir = (0);
        return this.setTrans();
    });
    this.figure.forward = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        var line;
        this.x = (this.x + ((this.dir.radian().cos()) *
            by));
        this.y = (this.y + ((this.dir.radian().sin()) *
            by));
        this.setTrans();
        return this;
    });
    this.figure.turnLeft = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        this.dir = (this.dir + by);
        this.setTrans();
        return this;
    });
    this.figure.turnRight = dtlbind(this, function(by) {
        var self = this;
        var 自分 = self;
        return this.turnLeft((-by));
    });
    return this.figure.setTrans = dtlbind(this, function() {
        var self = this;
        var 自分 = self;
        var str;
        str = (((("translate(" + this.x) + " ") + this.y) +
            ") ");
        str = (((str + "rotate(") + this.dir) + ") ");
        return this.grp.attr("transform", (str));
    });
});//.apply(root, []);