import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import FS from "@hoge1e3/fs-nw";
import {Buffer} from "dynamic-text-range";
function convertUMDtoESM(file) {
  const src=file.text();
 
  return `
const exports={};
const module={exports};
function define(...args) {
  const require=()=>{throw new Error("require not supported.");};
  const factory=args[args.length-1];
  module.exports=factory(require, exports, module) || module.exports;
}
define.amd=true;
${src}
export default module.exports;
`;
}
function convertGlobalToESM(file, varName, deps) {
  const src=file.text();
  return `${deps.map((dep)=>`import "${path(dep, file)}";`).join("\n")}
${src}
export default ${varName};
`;
}
function nc(v,name) {
  if (!v) throw new Error("Null :"+name);
  return v;
}
function convertFSJS(file) {
  const src=file.text();
  return `
let FS;
function define(d,factory) {
  FS=factory();
}
${src}
export default FS;
`;
}
function path(moduleName, base) {
  return "./"+js.rel(nc(reqConf.paths[moduleName], moduleName)+".js").relPath(base.up());
}
function convertAMDtoESM(file) {
  const ast = esprima.parseModule(file.text(),{comment:false,range:true});
  const buf = new Buffer(file.text());
  const trans = buf.transaction();
  let factoryRange;
  let importsStr=[];
  let exports = null;
  let hasRuntime = false;
  let hasExports = file.text().match(/\bexports\b/);
  
  const importStmtStr = ({ moduleName, variableName }) => {
    if (reqConf.paths[moduleName].match(/\.\.\/runtime/)) {
      hasRuntime=true;
      return `const ${variableName}=await _require("${moduleName}");`;
    }
    return `import ${variableName} from "${path(moduleName, file)}";`;
  };
  
  estraverse.replace(ast, {
    enter: function (node) {
      if (node.type === 'CallExpression' && 
        (node.callee.name === 'define'||node.callee.name==="requirejs") ) {
          if (factoryRange) {
            throw new Error(node.callee.name+" already defined ");
          }
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
        let argNames;
        if (factory.type === 'FunctionExpression') {
          exports = factory.body.body.find(node =>
            node.type === 'ReturnStatement'
          );
          if (exports) {
            const r=buf.addRange(exports.range[0], exports.range[0]+"return".length );
            trans.replace(r, `export default`);
          }
          argNames=factory.params.map(e=>e.name);
        } else {
          throw new Error("factory function not found");
        }
        if (dependencies && dependencies.type === 'ArrayExpression') {
          if (argNames.length!==dependencies.elements.length){
            console.log(node);
            throw new Error("Not match deps and factory arity");
          }
          
          importsStr = dependencies.elements.map((dep, index) => 
            importStmtStr({
              moduleName: nc(dep.value,"dep"), 
              variableName: nc(argNames[index],"arg "+index)})
          ).join("\n");

        }
       
        factoryRange=buf.addRange(factory.body.range[0]+1, factory.body.range[1]-1 );
        
      } else if (node.type === 'CallExpression' && node.callee.name === 'require') {
        if (node.arguments.length==1 && 
          node.arguments[0].value=="nw.gui"
        ){
          return;
        }
        console.log(node);
        throw new Error("Invalid require usage");
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
          
          const rg=buf.addRange(...node.range);
          trans.replace(rg, importStmtStr({ moduleName, variableName }));
          return estraverse.VisitorOption.Skip;
        }
      }
    }
  });


  let post="";
  let pre=(hasRuntime&&`const _require=(mod)=>new Promise((s)=>requirejs([mod],s));
` ||"")+(hasExports&&`const exports={};
const module={exports};
`||"");
  if (!factoryRange) {
    throw new Error("No define found");
  }
  
  if (!exports && hasExports) {
    post=`\nexport default module.exports;`;
  }

  trans.commit();
  const newsrc=pre+importsStr+factoryRange+post;
  return newsrc;
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
const www = FS.get(import.meta.url.replace(/^file:\/\/\//, "")).up();
const esm = www.rel("esm/");
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
  if (file.name()==="reqConf.js") continue;
  if (file.path().match(/www\/runtime/)) continue;
  let esModule;
  console.log("src", file.path());
  if (file.name()=="FS.js") {
    esModule = convertFSJS(file);
  } else if (reqConf.shim[k]) {
    if (!reqConf.shim[k].exports) {
      throw new Error("Does not export "+ k );
    }
    esModule=convertGlobalToESM(file, reqConf.shim[k].exports, reqConf.shim[k].deps||[] );
  } else if (file.name().match(/_concat/)||
      file.name()==="md5.js"||
      file.name().match(/\.min\.js/)||
      file.name().match(/source-map/)||
      file.name().match(/beautify/)||
      file.name().match(/TonyuRuntime/)||
      file.path().match(/ace-nocon/)||
      file.path().match(/BuilderClient/)||
      file.path().match(/stacktrace/)||
      file.path().match(/lib\/jquery/)||
      false
    ){
        /*if (reqConf.shim[k]) {
          if (!reqConf.shim[k].exports) {
            throw new Error("Does not export "+ k );
          }
          esModule=convertGlobalToESM(file, reqConf.shim[k].exports);
        } else {*/
          esModule=convertUMDtoESM(file);
        //}
  } else{
    esModule = convertAMDtoESM(file);
  }
  if (esModule.length<file.text().length/2) {
    throw new Error(file+" is too small");
  }
  //console.log(file.path());
  const dst=esm.rel(v+".js");
  if (!esm.contains(dst)) continue;
  dst.text(esModule);
}
//console.log(esModule);