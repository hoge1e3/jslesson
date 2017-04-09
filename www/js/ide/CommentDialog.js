define(["UI"],function (UI) {
    var res={};
    res.show=function (file, options) {
        var d=res.embed(file, options);
        d.dialog({width:600});
    };
    res.embed=function (file, options) {
        if (!options) options={};
        if (!res.d) {
            res.tx=$("<textarea>").attr({rows:20,cols:60,readonly:true});
            res.d=UI("div",{title:"採点結果"},res.tx);
        }
        res.tx.val(file.text());
        var d=res.d;
        return d;
    };
    return res;
});