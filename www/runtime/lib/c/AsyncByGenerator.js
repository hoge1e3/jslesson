define([],function () {
    AsyncByGenerator={
        doReady: function () {
           this.isReady=true; 
           if (this.onReady) {
               this.onReady();
           }
        },
        ready: function (f) {
            if (this.isReady) {
                f();
            } else {
                this.onReady=f;
            }    
        }
    };
    var text="return (function*(){});";
    try{
        (new Function(text))();
        requirejs(["AsyncByGeneratorRaw"],function (){
            console.log("ABG loaded");
            AsyncByGenerator.doReady();
        });
    }catch(e) {
        AsyncByGenerator.supportsGenerator=false;
        AsyncByGenerator.doReady();
    }
    return AsyncByGenerator;
});