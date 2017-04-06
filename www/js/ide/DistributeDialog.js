define(["UI"],function (UI) {
    var res={};
    res.show=function (file, options) {
        var d=res.embed(file, options);
        d.dialog({width:600});
    };
    res.embed=function (text, options) {
        if (!options) options={};
        if (!res.d) {
            res.d=UI("div",{title:"配布内容"},
                $("<textarea>").attr({rows:20,cols:60}).val(text),
                $("<input>").attr({type:"checkbox",name:"",value:""}),
                $("<button>").attr({on:{click: function(){
                    
                }}})
                
            );
        }
        var d=res.d;
        return d;
    };
    return res;
});