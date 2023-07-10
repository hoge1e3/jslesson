define(function (require,exports,module){
    const p5props=["P2D","WEBGL","ARROW","CROSS","HAND","MOVE","TEXT","WAIT","HALF_PI","PI","QUARTER_PI","TAU","TWO_PI","DEGREES","RADIANS","DEG_TO_RAD","RAD_TO_DEG","CORNER","CORNERS","RADIUS","RIGHT","LEFT","CENTER","TOP","BOTTOM","BASELINE","POINTS","LINES","LINE_STRIP","LINE_LOOP","TRIANGLES","TRIANGLE_FAN","TRIANGLE_STRIP","QUADS","QUAD_STRIP","TESS","CLOSE","OPEN","CHORD","PIE","PROJECT","SQUARE","ROUND","BEVEL","MITER","RGB","HSB","HSL","AUTO","ALT",
    "BACKSPACE","CONTROL","DELETE","DOWN_ARROW","ENTER","ESCAPE","LEFT_ARROW","OPTION","RETURN",
    "RIGHT_ARROW","SHIFT","TAB","UP_ARROW","BLEND","REMOVE","ADD","DARKEST","LIGHTEST","DIFFERENCE","SUBTRACT","EXCLUSION","MULTIPLY","SCREEN","REPLACE","OVERLAY","HARD_LIGHT","SOFT_LIGHT","DODGE","BURN","THRESHOLD","GRAY","OPAQUE","INVERT","POSTERIZE","DILATE","ERODE","BLUR","NORMAL","ITALIC","BOLD","BOLDITALIC","_DEFAULT_TEXT_FILL","_DEFAULT_LEADMULT","_CTX_MIDDLE","LINEAR","QUADRATIC","BEZIER","CURVE","STROKE","FILL","TEXTURE","IMMEDIATE","IMAGE","NEAREST","REPEAT","CLAMP","MIRROR","LANDSCAPE","PORTRAIT","_DEFAULT_STROKE","_DEFAULT_FILL","GRID","AXES","LABEL","FALLBACK","_preloadMethods","_registeredMethods","_registeredPreloadMethods","_frameRate","_lastFrameTime","_targetFrameRate","print","frameCount","deltaTime","focused","cursor","frameRate","getFrameRate","setFrameRate","noCursor","displayWidth","displayHeight","windowWidth","windowHeight","_onresize","width","height","fullscreen","pixelDensity","displayDensity","getURL","getURLPath","getURLParams","_validateParameters","_helpForMisusedAtTopLevelCode",
    "pushStyle","popStyle","popMatrix","pushMatrix","_promisePreloads","registerPromisePreload","_setupPromisePreloads","_wrapPromisePreload","_legacyPreloadGenerator","camera","perspective","ortho","frustum","createCamera","setCamera","setAttributes","_assert3d","createCanvas","resizeCanvas","noCanvas","createGraphics","blendMode","noLoop","loop","isLooping","push","pop","redraw","applyMatrix","resetMatrix","rotate","rotateX","rotateY","rotateZ","scale","shearX","shearY","translate","_normalizeArcAngles","arc","ellipse","circle","_renderEllipse",
    "line","point","quad","rect","square","_renderRect","triangle","ellipseMode","noSmooth","rectMode","smooth","strokeCap","strokeJoin","strokeWeight","bezier","bezierDetail","bezierPoint","bezierTangent","curve","curveDetail","curveTightness","curvePoint","curveTangent","beginContour","beginShape","bezierVertex","curveVertex","endContour","endShape","quadraticVertex","vertex","textOutput","gridOutput","_addAccsOutput","_createOutput","_updateAccsOutput","_accsBackground","_accsCanvasColors","_accsOutput","_updateTextOutput","_updateGridOutput","_rgbColorName","alpha","blue","brightness","color","green","hue","lerpColor","lightness","red","saturation","background","clear","colorMode","fill","noFill","noStroke","stroke","erase","noErase","createStringDict","createNumberDict","storeItem","getItem","clearStorage","removeItem","select","selectAll","_getContainer","_wrapElement","removeElements","createDiv","createP","createSpan","createImg","createA","createSlider","createButton",
    "createCheckbox","createSelect","createRadio","createColorPicker","createInput","createFileInput","createVideo","createAudio","VIDEO","AUDIO","createCapture","createElement","describe","describeElement","_describeHTML","_describeElementHTML","deviceOrientation","accelerationX","accelerationY","accelerationZ","pAccelerationX","pAccelerationY","pAccelerationZ","_updatePAccelerations","rotationX","rotationY","rotationZ","pRotationX","pRotationY","pRotationZ","pRotateDirectionX","pRotateDirectionY","pRotateDirectionZ","_updatePRotations","turnAxis","setMoveThreshold",
    "setShakeThreshold","_ondeviceorientation","_ondevicemotion","_handleMotion","isKeyPressed","keyIsPressed","key","keyCode","_onkeydown","_onkeyup","_onkeypress","_onblur","keyIsDown","_areDownKeys","movedX","movedY","_hasMouseInteracted","mouseX","mouseY","pmouseX","pmouseY","winMouseX","winMouseY","pwinMouseX","pwinMouseY","mouseButton","mouseIsPressed","_updateNextMouseCoords","_updateMouseCoords","_setMouseButton","_onmousemove","_onmousedown","_onmouseup","_ondragend","_ondragover",
    "_onclick","_ondblclick","_mouseWheelDeltaY","_pmouseWheelDeltaY","_onwheel","requestPointerLock","exitPointerLock","touches","_updateTouchCoords","_ontouchstart","_ontouchmove","_ontouchend","createImage","saveCanvas","saveGif","saveFrames","_makeFrame","loadImage","image","tint","noTint","_getTintedImageCanvas","imageMode","pixels","blend","copy","_copyHelper","filter","get","loadPixels","set","updatePixels","loadJSON","loadStrings","loadTable","loadXML","loadBytes","httpGet","httpPost","httpDo","_pWriters","createWriter","save","saveJSON","saveJSONObject","saveJSONArray","saveStrings","saveTable","writeFile","downloadFile","_checkFileExtension","_isSafari","abs","ceil","constrain","dist","exp","floor","lerp","log","mag","map","max","min","norm","pow","round","sq","sqrt","fract","createVector","noise","noiseDetail","noiseSeed","_lcg","_lcgSetSeed","randomSeed","random","randomGaussian","_angleMode","acos","asin","atan","atan2","cos","sin","tan","degrees","radians","angleMode","_toRadians","_toDegrees","_fromRadians","textAlign","textLeading","textSize","textStyle",
    "textWidth","textAscent","textDescent","_updateTextMetrics","loadFont","text","textFont","append","arrayCopy","concat","reverse","shorten","shuffle","sort","splice","subset","float","int","str","boolean","byte","char","unchar","hex","unhex","join","match","matchAll","nf","nfc","nfp","nfs","split","splitTokens","trim","day","hour","minute","millis","month","second","year","plane","box","sphere","cylinder","cone","ellipsoid","torus","orbitControl","debugMode","noDebugMode","_grid","_axesIcon","ambientLight","specularColor","directionalLight","pointLight","lights","lightFalloff","spotLight","noLights","loadModel","model","loadShader","createShader","shader","resetShader","normalMaterial","texture","textureMode","textureWrap","ambientMaterial","emissiveMaterial","specularMaterial","shininess"];
    const p5jsURL="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js";
    const root=require("root");
    const WebSite=require("WebSite");
    const FS=require("FS");
    const SplashScreen=require("SplashScreen");
    const PP=require("PythonParser");
    const S=require("PythonSemantics");
    const J=require("Python2JS");
    const DelayedCompileError=require("DelayedCompileError");
    const IndentBuffer=require("IndentBuffer");
    const Sync=require("Sync");
    var PythonBuilder=function (prj, dst,ide) {//<-Dtl
        this.prj=prj;// TPRC
        this.dst=dst;// SFile in ramdisk
        this.ide=ide;
    };
    var libs=["jquery-1.12.1","require"].map(function (n) {
        return "lib/"+n+".js";
    });
    libs=libs.concat(["lib/python/runOnServer.js"]);
    var p=PythonBuilder.prototype;//<-dtl
    p.progress=function (m) {
        if (window.SplashScreen) window.SplashScreen.progress(m);
    };
    p.genHTML=function (f) {
        this.progress("generate "+f.src.html.name());
        var dp=new DOMParser();
        var dom=dp.parseFromString(f.src.html.text()||"<html></html>","text/html");
        var html=dom.getElementsByTagName("html")[0];
        var head=dom.getElementsByTagName("head")[0];
        var body=dom.getElementsByTagName("body")[0];
        $(body).append($("<pre>").attr("id",'output'));
        $(head).append($("<meta>").attr("charset","UTF-8"));
        if (root.BitArrow) {
            var BitArrow=root.BitArrow;
            var ba={
                version:BitArrow.version,
                urlArgs:BitArrow.urlArgs,
                publishedURL:BitArrow.publishedURL,
                runtimePath:WebSite.runtime};
            $(head).append($("<script>").text("window.BitArrow="+JSON.stringify(ba)+";"));
        }
        $(head).append($("<script>").text("window.runtimePath='"+WebSite.runtime+"';"));
        $(head).append($("<script>").text("window.controllerPath='"+WebSite.controller+"';"));
        $(head).append($("<script>").text("window.onerror=window.onerror||"+
        function (a,b,c,d,e) {console.log(arguments);alert(e);}+";"));
        $(head).append($("<link>").attr({"rel":"stylesheet","href":WebSite.runtime+"css/run_style.css"}));

        libs.map(function (r) {
            return WebSite.runtime+r;
        }).concat([f.name+".js"]).forEach(function (src) {
            var nn=document.createElement("script");
            nn.setAttribute("charset","utf-8");
            var src2;
            var requirejs=root.requirejs;
            if (FS.PathUtil.isURL(src) && requirejs.version!=="2.1.9" && typeof requirejs.s.contexts._.config.urlArgs==="function") {
                src2=src+requirejs.s.contexts._.config.urlArgs("",src);
            } else {
                src2=src+(src.indexOf("?")<0?"?":"&")+Math.random();
            }
            nn.setAttribute("src",src2);
            body.appendChild(nn);
        });
        return f.dst.html.text("<!DOCTYPE HTML>\n<html>"+html.innerHTML+"</html>");
    };
    function isNewer(a,b) {
        if (!a.exists()) return false;
        return a.lastUpdate()>b.lastUpdate();
    }
    p.build=async function (options) {
        options=options||{};
        var mainFilePath=options.mainFile && options.mainFile.path();
        var curPrj=this.prj;
        var dst=this.dst;
        var t=this;
        var files=[];
        for (let n of curPrj.dir.ls()) {
            if (FS.PathUtil.ext(n)!=".html")  continue;
            var f=curPrj.dir.rel(n);
            var name=f.truncExt();
            var html=f;
            var py=f.up().rel(name+".p5.py");// <-dtl
            if (!py.exists()) continue;
            files.push({name:name,
                src:{html:html,py:py}, //<-dtl
                dst:{
                    html:dst.rel(name+".html"),
                    js:dst.rel(name+".js"),
                    //py:dst.rel(name+".py"),
                    map: dst.rel(name+".js.map")
                }
            });
            await SplashScreen.waitIfBusy();
        }
        for (let f of files) {
            t.progress("Transpile "+f.src.py.name());//<-dtl
            var isMainFile=(f.src.py.path()==mainFilePath);//<-dtl
            if (!isMainFile && isNewer(f.dst.js, f.src.py) && isNewer(f.dst.html, f.src.html)) {
                continue;
            }
            t.compile(f,{isMainFile});
            t.genHTML(f);
            await SplashScreen.waitIfBusy();
        }
    };
    p.compile=function (f,{isMainFile}) {
        var pysrcF=f.src.py;
        var js;
        var anon,node,errSrc,needInput=false;
        try {
            node=PP.parse(pysrcF);
            var vres=S.check(node,{srcFile:pysrcF, runAt: "browser",});

            needInput=!!vres.useInput;
            anon=vres.anon;
        } catch(e) {
            if (!isMainFile && (e.node || typeof e.pos==="number")) {
                var pos=e.node?e.node.pos:e.pos;
                e.pos=pos;
                errSrc=DelayedCompileError(e);

            } else {
                console.log(e.stack);
                throw e;
            }
        }
        //console.log("PPToken",PP.Tokenizer(pysrc).tokenize());
        var buf=IndentBuffer({dstFile:f.dst.js,mapFile:f.dst.map});
        buf.setSrcFile(pysrcF);//<-dtl
        if (errSrc) {
            buf.printf("%s",errSrc);
        } else {
            J(node,anon,{buf:buf,genReqJS:true, pyLibPath:WebSite.runtime+"lib/python",
            useJSRoot:true,
            injectAfter: `
            let inst=window;
            function _wrap(f) {
                return function (...args) {
                    try {
                        PYLIB.LoopChecker.reset();
                        return f(...args);
                    } catch(e) {
                        console.log(e,onerror);
                        if (typeof onerror==="function") onerror(null,null,null,null,e);
                        else {
                            alert(e);
                        }
                        throw e;
                    }
                };
            }
            ["draw", "setup","keyPressed","keyReleased","keyTyped","mouseMoved","mouseDragged","mousePressed","mouseClicked"].map((k)=>{
                if (typeof __top.globals()[k]==="function") inst[k]=(k==="setup"? _wrap(__top[k]) : __top[k]);
            });
             ${"req"+"uire"}("${p5jsURL}");
             `,
             injectBefore_old: `var p5=${"req"+"uire"}("${p5jsURL}");\n`,
             injectAfter_old: `var p5main;new p5(function (inst) {
                p5main=inst;
                ${["setup","keyPressed","keyReleased","keyTyped","mouseMoved","mouseDragged","mousePressed","mouseClicked"].map((k)=>
                `if (typeof ${k}==="function") inst.${k}=${k};`).join("\n")}
                inst.draw=()=>{
                    PYLIB.LoopChecker.reset();
                    if (typeof draw==="function") draw();

                };
             }, document.querySelector("body"));`});
        }
        buf.close();
    };
    p.upload=function (pub) {
        return Sync.sync(this.dst,pub);
    };
    p.Semantics=S;
    return PythonBuilder;//<-Dtl
});
