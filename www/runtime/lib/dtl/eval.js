root.eval = function (program) {
  return new Promise(function (resolve, reject) {
    $.post(
      "https://api2.eplang.jp/dolittle/transpile",
      {
        program: program,
      },
      function (responce) {
        new Function(responce)();
        resolve(responce);
      },
    );
  });
};
