define(["UI"], function (UI) {
    var Menu={};
    Menu.makeOLD=function (title, hier) {
        if (title.sub) hier=title.sub;
        /*
           [{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
         */
        var ul1=UI("ul", {"class":"nav navbar-nav"});
        hier.forEach(function (mainMenuItem) {
            var li=UI("li",
                    ["a",{
                        href:(mainMenuItem.href||"#"),
                        id:mainMenuItem.id,
                        "class":(mainMenuItem.sub?"dropdown-toggle":null),
                        "data-toggle":(mainMenuItem.sub?"dropdown":null)
                    }, mainMenuItem.label]
            );
            ul1.append(li);
            if (mainMenuItem.sub) {
                var ul2=UI("ul",{"class":"dropdown-menu"});
                mainMenuItem.sub.forEach(function (subMenuItem) {
                    ul2.append(UI("li",
                        ["a", {
                             id:subMenuItem.id,
                             href:subMenuItem.href||"#",
                             on:{
                                 click:subMenuItem.action
                             }
                        },subMenuItem.label]
                    ));
                });
                li.append(ul2);
            }
        });
        var menu=UI("div",{"class":"collapse navbar-collapse"},ul1);
        $("body").append(UI(
          "div",{"class":"navbar navbar-inverse navbar-fixed-top",id:"navBar"},
                ["div",{"class":"container",id:"nav-A"},
                    ["div", {"class":"navbar-header",id:"nav-B"},
                        ["button",{type:"button", "class":"navbar-toggle",
                            "data-toggle":"collapse",
                            "data-target":".navbar-collapse"},
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}]
                        ],
                        ["a", {"class":"navbar-brand" ,href:"#",id:title.id},title.label]
                    ],
                    menu
                ]
        ));
    };
    Menu.make=function (title, hier) {
        if (title.sub) hier=title.sub;
        this.initMenuBar(title);
        /*
           [{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
         */
        hier.forEach(function (mainMenuItem) {
            Menu.appendMain(mainMenuItem);
        });
    };
    Menu.initMenuBar=function (title) {
        if (this.ul1)return;
        var ul1=UI("ul", {"class":"nav navbar-nav"});
        var menu=UI("div",{"class":"collapse navbar-collapse"},ul1);
        $("body").append(UI(
          "div",{"class":"navbar navbar-inverse navbar-fixed-top",id:"navBar"},
                ["div",{"class":"container",id:"nav-A"},
                    ["div", {"class":"navbar-header",id:"nav-B"},
                        ["button",{type:"button", "class":"navbar-toggle",
                            "data-toggle":"collapse",
                            "data-target":".navbar-collapse"},
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}]
                        ],
                        ["a", {"class":"navbar-brand" ,href:"#",id:title.id},title.label]
                    ],
                    menu
                ]
        ));
        this.ul1=ul1;
    };
    Menu.appendMain=function (mainMenuItem) {
        //[{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
        var ul1=this.ul1;
        var li=UI("li",
                ["a",{
                    href:(mainMenuItem.href||"#"),
                    id:mainMenuItem.id,
                    "class":(mainMenuItem.sub?"dropdown-toggle":null),
                    "data-toggle":(mainMenuItem.sub?"dropdown":null)
                }, mainMenuItem.label]
        );
        ul1.append(li);
        if (mainMenuItem.sub) {
            var ul2=UI("ul",{
                id:"submenu_"+mainMenuItem.id,
                "class":"dropdown-menu"
            });
            li.append(ul2);
            mainMenuItem.sub.forEach(function (subMenuItem) {
                Menu.appendSub(mainMenuItem,subMenuItem);
            });
        }
    };
    Menu.appendSub=function (mainObj,subMenuItem) {
        var mainID;
        switch (typeof mainObj) {
            case "object":
            mainID=mainObj.id;
            mainObj.sub=[subMenuItem];
            break;
            case "string":
            mainID=mainObj;
            mainObj={label:mainID,id:mainID};
            break;
        }
        var ul2=$("#submenu_"+mainID);
        if (ul2.length==0) {
            Menu.appendMain(mainObj);
            //ul2=$("#submenu_"+mainID);
            return;
        }
        ul2.append(UI("li",
            ["a", {
                 id:subMenuItem.id,
                 href:subMenuItem.href||"#",
                 on:{
                     click:subMenuItem.action
                 }
            },subMenuItem.label]
        ));
    };

    return Menu;
});
