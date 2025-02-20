window.addEventListener("load",function () {
    //alert(3);
    for (let ee of document.querySelectorAll("input.spacecheck")) {
        const e=ee;
        console.log(e);
        let warn=document.createElement("span");
        warn.style="color: red;";
        e.parentNode.insertBefore(warn, e.nextSibling);
        e.addEventListener("input", function () {
            if (e.value.match(/^\s+/)||e.value.match(/\s+$/)) {
                warn.innerHTML="先頭または末尾にスペースが入っています";
            } else {
                warn.innerHTML="";
            }
        });
    }
    for (let ee of document.querySelectorAll("input.zenkakucheck")) {
        const e=ee;
        console.log(e);
        let warn=document.createElement("span");
        warn.style="color: orange;";
        e.parentNode.insertBefore(warn, e.nextSibling);
        e.addEventListener("input", function () {
            if (e.value.match(/[^\x01-\x7E\uFF61-\uFF9F]/)) {
                warn.innerHTML="全角文字が入っています";
            } else {
                warn.innerHTML="";
            }
        });
    }
});
