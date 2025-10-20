root.serverDriver = {};
root.serverDriver.read = function (token, table, key) {
  return new Promise(function (resolve, reject) {
    $.get(
      "https://api2.eplang.jp/store/read",
      {
        token: token,
        table: table,
        key: key,
      },
      function (response) {
        resolve(response);
      },
    );
  });
};
root.serverDriver.write = function (token, table, key, value) {
  return new Promise(function (resolve, reject) {
    $.post(
      "https://api2.eplang.jp/store/write",
      {
        token: token,
        table: table,
        key: key,
        value: value,
      },
      function () {
        resolve();
      },
    );
  });
};
root.system.run(function () {
  return AsyncByGenerator.toVal(
    function* () {
      this["server"] = yield* AsyncByGenerator.toGen(this["create"]());
      this["server"]["_token"] = "";
      this["server"]["_table"] = "dolittle";
      this["server"]["token"] = dtlbind(this, function (token) {
        var self = this;
        var 自分 = self;
        var _args = Array.prototype.slice.call(arguments);
        var _rest = Array.prototype.slice.call(arguments, 1);
        return AsyncByGenerator.toVal(
          function* () {
            return (this["_token"] = token);
          }.apply(this),
        );
      });
      this["server"]["connect"] = this["server"]["token"];
      this["server"]["table"] = dtlbind(this, function (table) {
        var self = this;
        var 自分 = self;
        var _args = Array.prototype.slice.call(arguments);
        var _rest = Array.prototype.slice.call(arguments, 1);
        return AsyncByGenerator.toVal(
          function* () {
            return (this["_table"] = table);
          }.apply(this),
        );
      });
      this["server"]["read"] = dtlbind(this, function (key) {
        var self = this;
        var 自分 = self;
        var _args = Array.prototype.slice.call(arguments);
        var _rest = Array.prototype.slice.call(arguments, 1);
        return AsyncByGenerator.toVal(
          function* () {
            return yield* AsyncByGenerator.toGen(
              (yield* AsyncByGenerator.toGen(
                (yield* AsyncByGenerator.toGen(
                  dtlbind(this, function () {
                    var self = this;
                    var 自分 = self;
                    var _args = Array.prototype.slice.call(arguments);
                    var _rest = Array.prototype.slice.call(arguments, 0);
                    return AsyncByGenerator.toVal(
                      function* () {
                        return yield* AsyncByGenerator.toGen(
                          this["and"]["true"](
                            this["_token"],
                            this["_table"],
                            key,
                          ),
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
                        return yield* AsyncByGenerator.toGen(
                          this["serverDriver"]["read"](
                            this["_token"],
                            this["_table"],
                            key,
                          ),
                        );
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
                      return "";
                    }.apply(this),
                  );
                }),
              ),
            );
          }.apply(this),
        );
      });
      this["server"]["write"] = dtlbind(this, function (key, value) {
        var self = this;
        var 自分 = self;
        var _args = Array.prototype.slice.call(arguments);
        var _rest = Array.prototype.slice.call(arguments, 2);
        return AsyncByGenerator.toVal(
          function* () {
            yield* AsyncByGenerator.toGen(
              (yield* AsyncByGenerator.toGen(
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _args = Array.prototype.slice.call(arguments);
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return AsyncByGenerator.toVal(
                    function* () {
                      return yield* AsyncByGenerator.toGen(
                        this["and"]["true"](
                          this["_token"],
                          this["_table"],
                          key,
                          value,
                        ),
                      );
                    }.apply(this),
                  );
                })["then"](),
              ))["execute"](
                dtlbind(this, function () {
                  var self = this;
                  var 自分 = self;
                  var _args = Array.prototype.slice.call(arguments);
                  var _rest = Array.prototype.slice.call(arguments, 0);
                  return AsyncByGenerator.toVal(
                    function* () {
                      return yield* AsyncByGenerator.toGen(
                        this["serverDriver"]["write"](
                          this["_token"],
                          this["_table"],
                          key,
                          value,
                        ),
                      );
                    }.apply(this),
                  );
                }),
              ),
            );
            return "";
          }.apply(this),
        );
      });
      yield* AsyncByGenerator.toGen(this["addAlias"]("server", "サーバー"));
      yield* AsyncByGenerator.toGen(this["addAlias"]("server", "サーバ"));
      yield* AsyncByGenerator.toGen(
        this["server"]["addAlias"]("connect", "接続"),
      );
      yield* AsyncByGenerator.toGen(
        this["server"]["addAlias"]("token", "トークン"),
      );
      yield* AsyncByGenerator.toGen(
        this["server"]["addAlias"]("table", "テーブル"),
      );
      yield* AsyncByGenerator.toGen(this["server"]["addAlias"]("read", "読む"));
      return yield* AsyncByGenerator.toGen(
        this["server"]["addAlias"]("write", "書く"),
      );
    }.apply(this),
  );
});

/*
/*
root.serverDriver={};
root.serverDriver.read=function(token,table,key){
    return new Promise(function(resolve,reject){
        $.get('https://api.eplang.jp/store/read',{
            token:token,
            table:table,
            key:key
        },function(response){
            resolve(response); 
        });
    });
};
root.serverDriver.write=function(token,table,key,value){
    return new Promise(function(resolve,reject){
        $.post('https://api.eplang.jp/store/write',{
            token:token,
            table:table,
            key:key,
            value:value
        },function(){resolve();});
    });
};
* /

server=!create.
server:_token="".
server:_table="dolittle".
server:token=[|token| self:_token=token ].
server:connect=server:token.
server:table=[|table| self:_table=table ].
server:read=[|key|
    [and!(_token)(_table)(key)true]!then[
        serverDriver!(_token)(_table)(key)read.
    ]else[""]execute.
].
server:write=[|key value|
    [and!(_token)(_table)(key)(value)true]!then[
        serverDriver!(_token)(_table)(key)(value)write.
    ]execute.
    "".
].
!"server" "サーバー" addAlias.
!"server" "サーバ" addAlias.
server!"connect" "接続" addAlias.
server!"token" "トークン" addAlias.
server!"table" "テーブル" addAlias.
server!"read" "読む" addAlias.
server!"write" "書く" addAlias.
*/
