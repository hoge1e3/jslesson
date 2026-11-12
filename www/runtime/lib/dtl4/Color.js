(function () {
  this.Color = this.root.create();
  this.Color.r = 0;
  this.Color.g = 0;
  this.Color.b = 0;
  this.Color.a = 1;
  this.Color.initialize = dtlbind(this, function (arg1, arg2, arg3) {
    var args;
    var r;
    var g;
    var b;
    args = arguments;
    if (arg1.toString().match(root.window.RegExp("^#[0-9A-F]{6}$"))) {
      var s;
      s = arg1.toString().split("");
      s.shift();
      r = root.window.parseInt(s.shift() + s.shift(), 16);
      g = root.window.parseInt(s.shift() + s.shift(), 16);
      b = root.window.parseInt(s.shift() + s.shift(), 16);
    } else if (this.and.true(args.length === 1, this["typeof"](arg1) === "number")) {
      b = arg1 % 256;
      arg1 = root.window.parseInt(arg1 / 256);
      g = arg1 % 256;
      arg1 = root.window.parseInt(arg1 / 256);
      r = arg1 % 256;
      arg1 = root.window.parseInt(arg1 / 256);
    } else {
      arg1 = root.window.Math.floor(arg1);
      arg2 = root.window.Math.floor(arg2);
      arg3 = root.window.Math.floor(arg3);
      if (arg1 > 255) {
        r = 255;
      } else if (arg1 < 0) {
        r = 0;
      } else {
        r = arg1;
      }
      if (arg2 > 255) {
        g = 255;
      } else if (arg2 < 0) {
        g = 0;
      } else {
        g = arg2;
      }
      if (arg3 > 255) {
        b = 255;
      } else if (arg3 < 0) {
        b = 0;
      } else {
        b = arg3;
      }
    }
    this.r = r;
    this.g = g;
    this.b = b;
    return (this.a = 1);
  });
  this.Color.randomCreate = dtlbind(this, function () {
    return this.Color.create((255).random(), (255).random(), (255).random());
  });
  this.Color.addAlias("randomCreate", "random");
  this.Color.randomInt24Create = dtlbind(this, function () {
    var colorValue;
    colorValue = (16777216).random();
    return this.Color.create(colorValue);
  });
  this.Color.addAlias("randomInt24Create", "ランダムに作る", "randomColor", "createRandom");
  this.Color.darken = dtlbind(this, function () {
    return this.Color.create(this.r - 50, this.g - 50, this.b - 50);
  });
  this.Color.addAlias("darken", "darker");
  this.Color.brighten = dtlbind(this, function () {
    return this.Color.create(this.r + 50, this.g + 50, this.b + 50);
  });
  this.Color.addAlias("brighten", "brighter");
  this.Color.toString = dtlbind(this, function () {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  });
  this.Color.toHalfOpacity = dtlbind(this, function () {
    this.a = 0.5;
    return this;
  });
  this.Color.addAlias("toHalfOpacity", "setTransparency");
  this.Color.toFullOpacity = dtlbind(this, function () {
    this.a = 1;
    return this;
  });
  this.Color.setCMYK = dtlbind(this, function () {
    this.black = this.window.Math.min(
      1 - this.r / 255,
      1 - this.g / 255,
      1 - this.b / 255,
    );
    this.cyan = (1 - this.r / 255 - this.black) / (1 - this.black);
    this.magenta = (1 - this.g / 255 - this.black) / (1 - this.black);
    this.yellow = (1 - this.b / 255 - this.black) / (1 - this.black);
    return this;
  });
  this.Color.fromCMYK = dtlbind(this, function (cyan, magenta, yellow, black) {
    return this.Color.create(
      (1 - this.window.Math.min(1, cyan * (1 - black) + black)) * 255,
      (1 - this.window.Math.min(1, magenta * (1 - black) + black)) * 255,
      (1 - this.window.Math.min(1, yellow * (1 - black) + black)) * 255,
    );
  });
  this.Color.getRed = dtlbind(this, function () {
    return this.r;
  });
  this.Color.getGreen = dtlbind(this, function () {
    return this.g;
  });
  this.Color.getBlue = dtlbind(this, function () {
    return this.b;
  });
  this.Color.mixParam = 1.1;
  this.Light = this.create();
  this.Light.mix = dtlbind(this, function () {
    var c;
    this.args = this.Array.prototype.slice.call(arguments);
    this.args = this.args.select(
      dtlbind(this, function (e) {
        return root.is.call(e, this.Color);
      }),
    );
    c = this.args.shift();
    if (this.args.length === 0) {
      return c;
    } else {
      return c.mixColor.apply(c, this.args);
    }
  });
  this.Ink = this.create();
  this.Ink.mix = dtlbind(this, function () {
    var c;
    this.args = this.Array.prototype.slice.call(arguments);
    this.args = this.args.select(
      dtlbind(this, function (e) {
        return root.is.call(e, this.Color);
      }),
    );
    c = this.args.shift();
    if (this.args.length === 0) {
      return c;
    } else {
      return c.mixColor2.apply(c, this.args);
    }
  });
  this.Color.mixColor = dtlbind(this, function () {
    var args;
    var red;
    var green;
    var blue;
    var yyy;
    var m;
    args = this.Array.prototype.slice.call(arguments);
    args = args.select(
      dtlbind(this, function (e) {
        return root.is.call(e, this.Color);
      }),
    );
    red = this.getRed();
    green = this.getGreen();
    blue = this.getBlue();
    yyy = this.max(red, green, blue);
    args.each(
      dtlbind(this, function (arg) {
        var r;
        var g;
        var b;
        var y;
        r = arg.getRed();
        g = arg.getGreen();
        b = arg.getBlue();
        y = this.max(r, g, b);
        red = red + r;
        green = green + g;
        blue = blue + b;
        return (yyy = yyy + y);
      }),
    );
    m = yyy / this.max(red, green, blue) / (args.length + 1);
    return this.Color.create(red * m, green * m, blue * m);
  });
  this.Color.max = dtlbind(this, function (r, g, b) {
    var m;
    m = r;
    if (m < g) {
      m = g;
    }
    if (m < b) {
      m = b;
    }
    return m;
  });
  this.Color.mixColor2 = dtlbind(this, function () {
    var args;
    var red;
    var green;
    var blue;
    var yyy;
    var m;
    args = this.Array.prototype.slice.call(arguments);
    args = args.select(
      dtlbind(this, function (e) {
        return root.is.call(e, this.Color);
      }),
    );
    red = 255 - this.getRed();
    green = 255 - this.getGreen();
    blue = 255 - this.getBlue();
    yyy = this.max(red, green, blue);
    args.each(
      dtlbind(this, function (arg) {
        var r;
        var g;
        var b;
        var y;
        r = 255 - arg.getRed();
        g = 255 - arg.getGreen();
        b = 255 - arg.getBlue();
        y = this.max(r, g, b);
        red = red + r;
        green = green + g;
        blue = blue + b;
        return (yyy = yyy + y);
      }),
    );
    m = yyy / this.max(red, green, blue) / (args.length + 1);
    return this.Color.create(255 - red * m, 255 - green * m, 255 - blue * m);
  });
  this.Black = this.Color.create(0, 0, 0);
  this.White = this.Color.create(255, 255, 255);
  this.Blue = this.Color.create(8, 8, 255);
  this.Red = this.Color.create(255, 8, 8);
  this.Green = this.Color.create(8, 255, 8);
  this.Pink = this.Color.create(255, 0, 255);
  this.Magenta = this.Color.create(255, 0, 255);
  this.Cyan = this.Color.create(0, 255, 255);
  return (this.Yellow = this.Color.create(255, 255, 0));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Color.js.map
