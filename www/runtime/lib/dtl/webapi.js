root.webapi_driver = {};
root.webapi_driver.read = function (url, opt) {
  return new Promise(function (resolve, reject) {
    $.get(url, opt, function (response) {
      try {
        result = JSON.parse(response);
      } catch (e) {
        console.log(e);
        try {
          result = eval("(function(){return " + response + ";})()");
        } catch (ee) {
          console.log(ee);
          result = "";
        }
      }
      resolve(result);
    });
  });
};
root.system.run(function () {
  return AsyncByGenerator.toVal(
    function* () {
      this["WebAPI"] = yield* AsyncByGenerator.toGen(this["create"]());
      this["WebAPI"]["read"] = dtlbind(this, function () {
        var self = this;
        var 自分 = self;
        var _args = Array.prototype.slice.call(arguments);
        var _rest = Array.prototype.slice.call(arguments, 0);
        var result;
        var keys;
        var params;
        var entries;
        return AsyncByGenerator.toVal(
          function* () {
            keys = yield* AsyncByGenerator.toGen(
              root["window"]["Object"]["keys"](this),
            );
            yield* AsyncByGenerator.toGen(
              (yield* AsyncByGenerator.toGen(
                (yield* AsyncByGenerator.toGen(
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _args = Array.prototype.slice.call(arguments);
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return AsyncByGenerator.toVal(
                      function* () {
                        return (
                          (yield* AsyncByGenerator.toGen(
                            keys["filter"](
                              dtlbind(this, function (key) {
                                var self = this;
                                var 自分 = self;
                                var _args =
                                  Array.prototype.slice.call(arguments);
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  1,
                                );
                                return AsyncByGenerator.toVal(
                                  function* () {
                                    return key === "url";
                                  }.apply(this),
                                );
                              }),
                            ),
                          ))["length"] > 0
                        );
                      }.apply(this),
                    );
                  })["then"](),
                ))["else"](
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _args = Array.prototype.slice.call(arguments);
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return AsyncByGenerator.toVal(
                      function* () {
                        params = yield* AsyncByGenerator.toGen(
                          keys["filter"](
                            dtlbind(this, function (key) {
                              var self = this;
                              var 自分 = self;
                              var _args = Array.prototype.slice.call(arguments);
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              return AsyncByGenerator.toVal(
                                function* () {
                                  return key !== "url";
                                }.apply(this),
                              );
                            }),
                          ),
                        );
                        params = yield* AsyncByGenerator.toGen(
                          params["filter"](
                            yield* AsyncByGenerator.toGen(
                              dtlbind(this, function (key) {
                                var self = this;
                                var 自分 = self;
                                var _args =
                                  Array.prototype.slice.call(arguments);
                                var _rest = Array.prototype.slice.call(
                                  arguments,
                                  1,
                                );
                                return AsyncByGenerator.toVal(
                                  function* () {
                                    return yield* AsyncByGenerator.toGen(
                                      this["system"]["read"](this, key),
                                    );
                                  }.apply(this),
                                );
                              })["bind"](this),
                            ),
                          ),
                        );
                        entries = yield* AsyncByGenerator.toGen(
                          root["window"]["eval"]("(function(){return {}})();"),
                        );
                        yield* AsyncByGenerator.toGen(
                          params["each"](
                            dtlbind(this, function (key) {
                              var self = this;
                              var 自分 = self;
                              var _args = Array.prototype.slice.call(arguments);
                              var _rest = Array.prototype.slice.call(
                                arguments,
                                1,
                              );
                              var _value;
                              return AsyncByGenerator.toVal(
                                function* () {
                                  _value = yield* AsyncByGenerator.toGen(
                                    this["system"]["read"](this, key),
                                  );
                                  return yield* AsyncByGenerator.toGen(
                                    this["system"]["write"](
                                      entries,
                                      key,
                                      _value,
                                    ),
                                  );
                                }.apply(this),
                              );
                            }),
                          ),
                        );
                        return (result = yield* AsyncByGenerator.toGen(
                          this["webapi_driver"]["read"](this["url"], entries),
                        ));
                      }.apply(this),
                    );
                  }),
                ),
              ))["execute"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _args = Array.prototype.slice.call(arguments);
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return AsyncByGenerator.toVal(
                    function* () {
                      return (result = "");
                    }.apply(this),
                  );
                }),
              ),
            );
            return result;
          }.apply(this),
        );
      });
      yield* AsyncByGenerator.toGen(
        this["root"]["addAlias"]("WebAPI", "webapi"),
      );
      return yield* AsyncByGenerator.toGen(
        this["WebAPI"]["addAlias"]("read", "読む"),
      );
    }.apply(this),
  );
});

/*
/*
root.webapi_driver={};
root.webapi_driver.read=function(url,opt){
    return new Promise(function(resolve,reject){
        $.get(url,opt,function(response){
            try{
                result=JSON.parse(response);
            }catch(e){
                console.log(e);
                try{
                    result=eval("(function(){return "+response+";})()");
                }catch(ee){
                    console.log(ee);
                    result="";
                }
            }
            resolve(result);
        });
    });
}
* /

WebAPI=!create.
WebAPI:read=[|;result keys params entries |
    keys=:window:Object!(self)keys.
    [(keys![|key| key=="url"]filter):length>0]!then[
        params=keys![|key| key!="url" ]filter.
        params=params!([|key| system!(self)(key)read]!(self)bind)filter.
        entries=:window!"(function(){return {}})();"eval.
        params![|key ;_value|
            _value=system!(self)(key)read.
            system!(entries)(key)(_value)write.
        ]each.
        result=webapi_driver!(url)(entries)read.
    ]else[result=""]execute.
    result.
].
root!"WebAPI" "webapi" addAlias.
WebAPI!"read" "読む" addAlias.

*/
