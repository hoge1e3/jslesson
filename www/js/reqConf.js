//"var reqConf="+JSON.stringify( getReq.genConf({base:"http://localhost:3002/js/", baseUrl:"js"})+";"
var reqConf={
        waitSeconds:0,
        "shim": {
            TextEditor: {
                exports: "TextEditor"
            },
            difflib: {
                exports: "difflib"
            },
            diffview: {
                exports: "diffview"
            },
            timbre: {
                exports: "T"
            },
            "disp": {
                "deps": ["IndentBuffer"],
                "exports": "disp"
            },
            "Util": {
                "exports": "Util"
            },
            "Profiler": {
                "exports": "Profiler"
            },
            "TextUtil": {
                "exports": "TextUtil"
            },
            "Arrow": {
                "exports": "Arrow"
            },
            "fixIndent": {
                "deps": ["TonyuLang", "Visitor", "Grammar"],
                "exports": "fixIndent"
            },
            "Key": {
                "exports": "Key"
            },
            "TError": {
                "exports": "TError"
            },
            "fs/ROMk": {
                "deps": ["FS","WebSite"]
            },
            "fs/ROMd": {
                "deps": ["FS","WebSite"]
            },
            "fs/ROMs": {
                "deps": ["FS","WebSite"]
            },
            "FileList": {
                "deps": ["FS"],
                "exports": "FileList"
            },
            "HttpHelper": {
                "exports": "HttpHelper"
            },
            "ace": {
                "exports": "ace"
            },
            "fs/import": {
                deps: ["FS"]
            },
            "fs/export": {
                deps: ["Shell","FS"]
            },
            T2MediaLib: {
                exports: "T2MediaLib"
            },
            JSZip: {
                exports:"JSZip"
            },
            Encoding: {
                exports:"Encoding"
            },
            Base64: {
                exports:"Base64"
            },
            SplashScreen: {
                exports: "SplashScreen"
            },
            /*"ctrans/ctrans": {
                deps:["Parser"],
                exports:"MinimalParser"
            },*/
            "dolittle/minimal": {
                deps:["Parser"],
                exports:"MinimalParser"
            },
            "dncl/minimal": {
                deps:["Parser"],
                exports:"MinimalParser"
            },
            AsyncByGenerator: {
                exports: "AsyncByGenerator"
            },
            cCompiler: {
                deps: [
                    "ctrans/beautify",
                    //"ctrans/compiler",
                    //"ctrans/context",
                    "ctrans/ctrans",
                    "ctrans/jsgen",
                    "ctrans/lib"
                ],
                exports:"compile"
            }
        },
        "paths": {
            jsl_selProject: "jsl/selProject",
            jsl_selUser: "jsl/selUser",
            jsl_selProject_concat: 'gen/selPrj_concat',
            jsl_edit: "jsl/editor",
            jsl_edit_concat: 'gen/edit_concat',
            Sync: "fs2/sync2",
            SplashScreen: "lib/SplashScreen",
            TT: "lang/tonyu2_token",
            Auth: "jsl/auth",
            Encoding:"lib/encoding.min",
            Base64:"lib/base64.min",
            T1Map:"tonyu1/t1map",
            runtime: "runtime/runtime",
            difflib: "lib/difflib",
            diffview: "lib/diffview",
            timbre: "lib/timbre",
            SoundDiag: "runtime/soundDiag",
            T2MediaLib: "lib/T2MediaLib",
            AssignmentDialog:"ide/",
            SubmitDialog:"ide/",
            TestsuiteDialog:"ide/TestsuiteDialogHori",
            KernelDiffDialog: "ide/KernelDiffDialog",
            NotificationDialog: "ide/NotificationDialog",
            searchDialog: "ide/searchDialog",
            DiffDialog: "ide/DiffDialog",
            ScriptTagFS:"fs/ScriptTagFS",
            KeyEventChecker: "lib/KeyEventChecker",
            NewProjectDialog: "ide/NewProjectDialog",
            RenameProjectDialog: "ide/RenameProjectDialog",
            NewSampleDialog: "ide/NewSampleDialog",
            CommentDialog2: "ide/",
            CommentDialog: "ide/CommentDialog",
            DistributeDialog: "ide/DistributeDialog",
            RunDialog: "ide/RunDialog",
            RunDialog2: "ide/RunDialog2",
            IframeDialog: "ide/IframeDialog",
            RemoteProject: "ide/RemoteProject",
            WebSite: "runtime/WebSite",
            UI:"ui/UI",
            UIDiag:"ui/UIDiag",
            DiagAdjuster:"ui/DiagAdjuster",
            ImageResEditor: "ide/ImageResEditor",
            ResEditor: "ide/ResEditor",
            reqConf: "reqConf",
            dumpScript: "build/dumpScript",
            buildAll: "build/buildAll",
            runScript: "runtime/runScript",
            copySample: "ide/copySample",
            //"Shell": "fs2/Shell2",
            "Shell": "fs2/Shell",
            "ide/wikiEditor": "ide/wikiEditor",
            TextEditor: "ide/TextEditor",
            FileMenu: "fsui/FileMenu",
            "disp": "lib/disp",
            "Util": "lib/util",
            "Profiler": "lib/profiler",
            "TextUtil": "lib/TextUtil",
            "Klass": "lib/Klass",
            "Cons":"lib/Cons",
            "ObjectMatcher": "lang/ObjectMatcher",
            "Arrow": "help/Arrow",
            "context": "lang/context",
            "source-map": "lang/source-map",
            "CodeBuffer": "lang/IndentBuffer",
            "IndentBuffer": "lang/IndentBuffer",
            "ExpressionParser": "lang/ExpressionParser2",
            "Grammar": "lang/Grammar",
            "Parser": "lang/parser",
            "ProjectCompiler": "lang/projectCompiler",
            "TonyuLang": "lang/parse_tonyu2",
            "Visitor": "lang/Visitor",
            "XMLBuffer": "lang/XMLBuffer",
            "Tonyu": "runtime/TonyuLib",
            "Tonyu.Thread":"runtime/TonyuThread",
            "Tonyu.Iterator": "runtime/TonyuIterator",
            //"Tonyu.Iterator": "runtime/Iterator",
            "Tonyu.Compiler": "lang/compiler",
            "Tonyu.Compiler.JSGenerator": "lang/JSGenerator",
            "Tonyu.Compiler.Semantics": "lang/Semantics",
            "fixIndent": "lang/indent",
            "Tonyu.TraceTbl": "runtime/TraceTbl",
            "Key": "runtime/Key",
            "TextRect": "graphics/TextRect",
            "fukidashi": "graphics/fukidashi",
            "SFileNW": "fs/SFileNW",
            "Tonyu.Project": "ide/TonyuProject",
            "thumbnail": "ide/thumbnail",
            "showErrorPos": "ide/ErrorPos",
            "TError": "runtime/TError",
            "fs/ROMk": "gen/ROM_k",
            "fs/ROMd": "gen/ROM_d",
            "fs/ROMs": "gen/ROM_s",
            "ProjectOptionsEditor": "ide/ProjectOptionsEditor",
            "FileList": "fsui/FileList",
            "FileUploadDialog": "fsui/FileUploadDialog",
            "HttpHelper": "help/HttpHelper",
            "Wiki": "help/wiki",
            "WikiDialog": "help/wikiDialog",
            "wikiFullScreen": "help/wikiFullScreen",
            "wikiExporter": "help/wikiExporter",
            "ace": "lib/ace-noconflict/ace",
            copyToKernel: "fs/copyToKernel",
            JSONCol: "lib/JSONCol",
            genROM: "build/genROM",
            Log:"ide/log",
            StackTrace:"runtime/StackTrace",
            Shell2:"fsui/ShellUI",
            ShellUI:"fsui/ShellUI",
            //Shell2:"fsui/Shell2",
            LocalBrowser:"fsui/LocalBrowser",
            FileBrowser:"fsui/FileBrowser",
            LocalBrowserWindow:"fsui/LocalBrowserWindow",
            LocalBrowserInfoClass:"fsui/LocalBrowserInfoClass",
            ShellParser: "fsui/ShellParser",
            syncWithKernel:"fs/syncWithKernel",
            TypeChecker:"lang/TypeChecker",
            typeCheck:"lang/typeCheck",
            zip: "fs/zip",
            ctype: "ctrans/ctype",
            AsyncByGeneratorRaw: "ctrans/AsyncByGeneratorRaw",
            AsyncByGenerator: "ctrans/AsyncByGenerator",
            requestFragment: "fs/requestFragment",
            Blob: "fs/blob",
            exportToExe: "social/exportToExe",
            exportToJsdoit: "social/exportToJsdoit",
            exportAsScriptTags: "social/exportAsScriptTags",
            importFromJsdoit: "social/importFromJsdoit",
            importFromTonyu1:"tonyu1/importFromTonyu1",
            forkBlobs: "social/forkBlobs",
            JSZip:"lib/jszip.min",
            plugins:"plugins/plugins",
            exceptionCatcher:"lib/exceptionCatcher",
            "assert":"lib/assert",
            Message:"lib/Message",
            md5:"lib/md5",
            FS:"fs/fs2stub",
            FSLib:"fs2/FS",
            Columns:"ui/Columns",
            Menu:"ui/Menu",
            "jquery.binarytransport": "lib/jquery.binarytransport",
            DeferredUtil:"lib/DeferredUtil",
            "compiledProject":"lang/compiledProject",
            "selectbox":"jsl/selectbox",
            cCompiler:"ctrans/compiler",
            TJSBuilder:"build/tjs/TJSBuilder",
            DtlBuilder:"build/dolittle/DtlBuilder",
            DnclBuilder:"build/dncl/DnclBuilder",
            CBuilder:"build/c/CBuilder",
            TonyuBuilder:"build/tonyu/TonyuBuilder",
            wget:"fs2/wget",
            zgenerator:"ctrans/zgenerator",
            logToServer: "jsl/logToServer",
            logToServer2: "jsl/logToServer2",
            ctrl: "jsl/ctrl",
            compiledTonyuProject: "build/tonyu/compiledTonyuProject",
            TonyuProject: "build/tonyu/TonyuProject",
            PatternParser:"build/tonyu/graphics/PatternParser",
            Assets:"build/tonyu/Assets",
            ImageList: "build/tonyu/graphics/ImageList",
            ImageRect: "build/tonyu/graphics/ImageRect",
            ImageDetailEditor: "build/tonyu/ImageDetailEditor",
            DateUtil: "lib/",

            "foo":"bar"
        },
        "baseUrl": "js",
        urlArgs: (typeof BitArrow==="object") ? BitArrow.urlArgs : String.fromCharCode(
            Math.floor(Math.random()*26)+
            Math.floor(Math.random()*2)*32+65)+
            String.fromCharCode(
                Math.floor(Math.random()*26)+
                Math.floor(Math.random()*2)*32+65)
};
(function(){
    for (var k in reqConf.paths)
    if (reqConf.paths[k].match(/\/$/)) reqConf.paths[k]+=k;
})();
if (typeof exports!=="undefined") exports.conf=reqConf;
