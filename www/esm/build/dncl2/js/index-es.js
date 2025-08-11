import {DNCL2PreProcessor} from './transpiler/DNCL2PreProcessor.js';
import {DNCL2Parser} from './transpiler/DNCL2Parser.js';
import {DNCL2Semantics} from './transpiler/DNCL2Semantics.js';
import {DNCL2Builder} from './transpiler/DNCL2Builder.js';
import {toPathList} from './transpiler/ast.js';
//]).then(([{DNCL2PreProcessor},{DNCL2Parser},{DNCL2Semantics},{DNCL2Builder},{toPathList}])=>{
export function transpile(src) {
    console.log(src);
    const isSync=str=>/isSync/.test((str.match(/.*\n/)||[''])[0]);
    const [program,ast]=(()=>{
        try{
            const processed = DNCL2PreProcessor(src);
            const tree=DNCL2Parser.parse(processed).result[0];
            if(tree===false)return [false,false];
            const ast=DNCL2Semantics.analyze(tree);
            console.log('ast',ast);
            const pathList = toPathList(ast);
            const program=(isSync(src)?DNCL2Builder.buildSync:DNCL2Builder.build)(ast);
            console.log(program);
            return [program,pathList];
        }catch(e){
            //document.querySelector('#exe_window').contentWindow.displayClear();
            //document.querySelector('#exe_window').contentWindow.write(e.message);
            console.error(e);
            throw e;
            // console.log(e);
            //return [false,false];
        }
    })();
    // return;
    if(program===false)return;
    console.log(program);
    return program;
    
    //processCreate({code:src,time:(new Date()).toISOString(),ast});

    //$("#exe_window").attr("src","");
    // const hex_string=string_to_utf8_hex_string(program);
    // $("#exe_window").attr("src",`./runtime/run.html?src=${hex_string}`);
    /*
    let url=`./runtime/run.html`;
    localStorage.setItem('run.js',program);
    $("#exe_window").attr("src",url);*/
}