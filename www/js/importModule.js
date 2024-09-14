globalThis.importModule=(path)=>{
    if (globalThis.reqConf) {
        const rp=globalThis.reqConf.paths[path];
        if (rp) path=`./${rp}.js`;
    }
    return import(path);
};