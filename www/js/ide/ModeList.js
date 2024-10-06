define(function (require, exports, module) {
    const ModeList={
        list:{
            ".tonyu":"ace/mode/tonyu",
            ".py": "ace/mode/python",
            ".c": "ace/mode/c_cpp",
            ".p5.js":"ace/mode/javascript",
            ".p5.py": "ace/mode/python",
            ".html": "ace/mode/html",
        },
        getMode(f){
            for (let k in ModeList.list) {
                if (f.endsWith(k)) {
                    return ModeList.list[k];
                }
            }
            return "ace/mode/tonyu";
        },
    };
    return ModeList;
});