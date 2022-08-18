define(function (require, exports) {
    let FS=require("FS");
    exports.doCleanup=(items)=> {
        let c=FS.LSFS.getCapacity();
        console.log(c);
        if (c.using<c.max/2) return;
        items=items.map(it=>it.dir);
        items=items.filter(dir=>dir.exists());
        console.log(items);
        //f.dir.rm({r:1});
        let lastItem=items[items.length-1];
        if (lastItem) {
            lastItem.rm({r:1});
            console.log(lastItem.path(), " is removed");
        }
    };

});