requirejs(["UI"],function (UI) {
    var d=UI("div",    
		 ["select",{$edit:"lang"},
		 ["option",{value:"JS"},"JS"],
		 ["option",{value:"Tn"},"Tn"],
		 ["option",{value:"C"},"C"]]
    );
    /*UI("select",{$edit:"lang"},
    ["option",{value:"C"},"C"],
    ["option",{selected:true,value:"JS"},"JS"]
    ).appendTo("body");
    */
    d.$edits.load({lang:"Tn"});
    d.dialog();//appendTo("body");
});