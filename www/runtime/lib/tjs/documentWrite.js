document.getLastScript=function getLastScript() {
    var ss=document.getElementsByTagName("script");
    return ss[ss.length-1];
};
document.writeDestination=function writeDestination() {
    var s=document.getLastScript();
    return s && s.parentNode  || document.body;
};
document.write = function() {
    var dst=document.writeDestination();
    Array.prototype.slice.call(arguments).forEach(function (e) {
        document.baWriteTo(dst,e);
    });
};
document.baWriteTo = function(dst,content) {
    var e=content;
    if (e=="\n") {
        dst.appendChild(document.createTextNode(e));
    } else {
        var dp = new DOMParser();
        var r = dp.parseFromString(e, "text/html");
        appendTo(r.body, dst);
    }

    function appendTo(src, dst) {
        var c = src.childNodes;
        for (var i = 0; i < c.length; i++) {
            var n = c[i];
            switch (n.nodeType) {
                case Node.ELEMENT_NODE:
                    var nn = document.createElement(n.tagName);
                    var at = n.attributes;
                    var names = [];
                    for (var j = 0; j < at.length; j++) {
                        names.push(at[j].name);
                    }
                    names.forEach(function(name) {
                        var value = n.getAttribute(name);
                        if (n.tagName.toLowerCase() =="img" && name == "src") {
                            if (!("" + value).match(/^http/)) {
                                value = window.runtimePath + value;
                            }
                        }
                        nn.setAttribute(name, value);
                    });
                    dst.appendChild(nn);
                    appendTo(n, nn);
                    break;
                case Node.TEXT_NODE:
                    dst.appendChild(document.createTextNode(n.textContent));
                    break;
            }
        }
    }
};
document.writeln = function() {
    document.write.apply(document, arguments);
    document.write("\n");
};
