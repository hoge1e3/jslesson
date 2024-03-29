define(function (require, exports, module) {
    module.exports={
        "js":{en:"JavaScript",ja:"JavaScript",builder:"TJSBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?javascript",mode:"ace/mode/tonyu"},
        "dtl":{en:"Dolittle", ja:"ドリトル",builder:"DtlBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?dolittle_use"},
        "c":{en:"C", ja:"C",builder:"CBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?c_use", mode:"ace/mode/c_cpp"},
        "dncl":{en:"DNCL", ja:"DNCL(どんくり)",builder:"DnclBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?dncl_use"},
        "dncl2":{en:"DNCL2", ja:"DNCL2(どんくり2)",builder:"Dncl2Builder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?dncl2_use"},
        "py": {en:"Python", ja:"Python",builder:"PythonBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},
        "tonyu":{en:"Tonyu", ja:"Tonyu",builder:"TonyuBuilder",
            helpURL:"http://bitarrow.eplang.jp/index.php?tonyu",mode:"ace/mode/tonyu"},
        //"php":{en:"PHP", ja:"PHP",builder:"PHPBuilder",
        //    helpURL:"http://bitarrow.eplang.jp/index.php?php",mode:"ace/mode/php"},
        "p5.js":{en:"p5.js", ja:"p5.js",builder:"P5Builder",
            helpURL:"http://bitarrow.eplang.jp/index.php?p5",mode:"ace/mode/javascript"},
            // lang <= 10
        "p5.py":{en:"p5Python", ja:"p5 Python mode",builder:"p5pyBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?p5",mode:"ace/mode/python"},
        "bry":{//ext:"py",// not working now
            en:"brython(Beta)", ja:"Brython(試験運用中)",builder:"BrythonBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},
        /*"ras.py": {//ext:"py",// not working now
            en: "Raspi-Pico(Beta)", ja:"Raspi-Pico(試験運用中)",builder:"raspiBuilder",manualIndent:true,
            helpURL:"http://bitarrow.eplang.jp/index.php?python",mode:"ace/mode/python"},*/
    };
});
