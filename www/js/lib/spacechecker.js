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
});
