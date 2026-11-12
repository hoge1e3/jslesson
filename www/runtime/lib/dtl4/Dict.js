(function () {
  this.Dict = this.create();
  this.Dict.initialize = dtlbind(this, function () {
    var args;
    var k;
    var v;
    this.myDict = this.root.create();
    args = root.window.Array.prototype.slice.call(arguments);
    while (true) {
      k = args.shift();
      if (!k) {
        k = this.undefined;
      }
      v = args.shift();
      if (!v) {
        v = this.undefined;
      }
      if (!k || !v) {
        break;
      }
      this.write(k, v);
    }
  });
  this.Dict.write = dtlbind(this, function (k, v) {
    this.system.write(this.myDict, k, v);
    return this;
  });
  this.Dict.read = dtlbind(this, function (k) {
    return this.system.read(this.myDict, k);
  });
  this.Dict["delete"] = dtlbind(this, function (k) {
    return this.system["delete"](this.myDict, k);
  });
  this.Dict["has?"] = dtlbind(this, function (k) {
    return this.system.read(this.myDict, k) !== this.undefined;
  });
  // 要素数?・名前リスト・選ぶ（V4 dolittle.ini の辞書と同じ意味）
  this.Dict["size?"] = dtlbind(this, function () {
    return root.window.Object.keys(this.myDict).length;
  });
  this.Dict.keys = dtlbind(this, function () {
    return root.window.Object.keys(this.myDict);
  });
  this.Dict.grep = dtlbind(this, function (f) {
    var res = root.Dict.create();
    var keys = root.window.Object.keys(this.myDict);
    for (var i = 0; i < keys.length; i++) {
      var v = this.read(keys[i]);
      if (f.execute(keys[i], v) === true) res.write(keys[i], v);
    }
    return res;
  });
  this.Dict.each = dtlbind(this, function (f) {
    var keys;
    keys = root.window.Object.keys(this.myDict);
    return keys.each(
      dtlbind(this, function (k) {
        return f.execute(k, this.read(k));
      }),
    );
  });
  return (this.Dict.toString = dtlbind(this, function () {
    var res;
    var keys;
    var kvs;
    res = this.Array.create("[");
    keys = root.window.Object.keys(this.myDict);
    kvs = this.Array.create();
    keys.each(
      dtlbind(this, function (k) {
        return kvs.add(this.Array.create(k, "=>", this.read(k)).join(" "));
      }),
    );
    res.add(kvs.join(" , "));
    res.add("]");
    return res.join(" ");
  }));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Dict.js.map
