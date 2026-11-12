(function () {
  this.Group = this.Actor.group.create();
  return (this.Group.initialize = dtlbind(this, function (_members) {
    if (_members) {
      this.members = this.Array.create();
          _members = this.Array.prototype.slice.call(_members);
          this.pos = this.Vec2.O;
          _members.each(
            dtlbind(this, function (m) {
              return (this.pos = this.pos.add(m.getCrashShape().center()));
            }),
          );
          if (_members.length) {
            this.pos = this.pos.div(_members.length);
          }
          this.element = this.createSVGElem("g");
          _members.each(
            dtlbind(this, function (m) {
              m.pos = m.pos.sub(this.pos);
              m.group.remove(m);
              this.add(m);
              return m.setTrans();
            }),
          );
          return this.appear();
    } else {
      this.element = this.createSVGElem("g");
          _members = this.members;
          this.members = this.Array.create();
          _members.each(
            dtlbind(this, function (m) {
              var mc;
              mc = m.create();
              mc.group.remove(mc);
              this.add(mc);
              return mc.setTrans();
            }),
          );
          return this.appear();
    }
  }));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Group.js.map
