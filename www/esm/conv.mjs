import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import FS from "@hoge1e3/fs-nw";
function convertAMDtoESM(file) {
  const ast = esprima.parseModule(file.text());

  let imports = [];
  let exports = null;
  let requireCalls = new Set();
  const importStmt = ({ moduleName, variableName }) => ({
    type: 'ImportDeclaration',
    specifiers: [{
      type: 'ImportDefaultSpecifier',
      local: {
        type: 'Identifier',
        name: variableName
      }
    }],
    source: {
      type: 'Literal',
      value: reqConf.paths[moduleName],
    }
  });

  estraverse.replace(ast, {
    enter: function (node) {
      if (node.type === 'CallExpression' && node.callee.name === 'define') {
        const args = node.arguments;
        let dependencies;
        let factory;
        if (args.length == 2) {
          dependencies = args[0];
          factory = args[1];
        } else if (args.length == 1) {
          factory = args[0];
        } else {
          console.log(node);
          throw new Error("Arg length not match " + args.length);
        }
        if (dependencies && dependencies.type === 'ArrayExpression') {
          imports = dependencies.elements.map((dep, index) => ({
            type: 'ImportDeclaration',
            specifiers: [{
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: `dep${index}`
              }
            }],
            source: dep
          }));
        }

        if (factory.type === 'FunctionExpression') {
          exports = factory.body.body.find(node =>
            node.type === 'ReturnStatement'
          );
        }
        return {
          type: 'Program',
          body: [...imports, ...factory.body.body.filter(node => node !== exports)]
        };


      } else if (node.type === "VariableDeclaration") {
        //console.log("var", node);
        const decls = node.declarations;
        if (decls.length !== 1) return;
        const decl = decls[0];
        //console.log("decl", decl);
        if (decl.type !== "VariableDeclarator") return;
        if (!decl.init) return;
        const init = decl.init;
        //console.log("init", init);
        if (init.type === 'CallExpression' && init.callee.name === 'require') {
          const moduleName = init.arguments[0].value;
          const variableName = decl.id.name;
          //requireCalls.add({ moduleName, variableName });
          return importStmt({ moduleName, variableName });
        }
      }
    }
  });

  // Add imports for require calls
  const requireImports = Array.from(requireCalls).map(importStmt);

  ast.body = [...requireImports, ...ast.body];

  if (exports) {
    ast.body.push({
      type: 'ExportDefaultDeclaration',
      declaration: exports.argument
    });
  }

  return escodegen.generate(ast);
}

// Example usage
const amdCode = `
define(['dep1', 'dep2'], function(dep1, dep2) {
  var localDep = require('local-dep');
  function myFunction() {
    return dep1.doSomething() + dep2.doSomethingElse() + localDep.someMethod();
  }
  return {
    myFunction: myFunction
  };
});
`;
const esm = FS.get(import.meta.url.replace(/^file:\/\/\//, "")).up();
const www = esm.up();
const js = www.rel("js/");
const reqConff = js.rel("reqConf.js");
const reqConf = new Function(`
${reqConff.text()}
return reqConf;
`)();
//console.log(reqConf);
//const edtf = js.rel("jsl/editor.js");
for (let k in reqConf.paths) {
  const v=reqConf.paths[k];
  const file=js.rel(v+".js");
  if (!file.exists()) continue;
  if (file.name().match(/_concat/)||
      file.name().match(/\.min\.js/)||
      file.name().match(/source-map/)||
      file.name().match(/TonyuRuntime/)||
      file.path().match(/ace-nocon/)||
      file.path().match(/FS\.js/)||
      file.path().match(/BuilderClient/)||
      file.path().match(/stacktrace/)||
      false
    ){
        console.log("skip", file.path(), reqConf.shim[k]);
        continue;
  }
  console.log(file.path());
  const esModule = convertAMDtoESM(file);
  const dst=esm.rel(v+".js");
  console.log(dst.path());
}
//console.log(esModule);