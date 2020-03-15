define(function (require,exports,module) {
    const UI=require("UI");
    const ctrl=require("ctrl");
    const popups=[];
    function up() {
        for (let p of popups) p.drop();

        /*if (up.cnt<=0) return;
        up.cnt--;
        if (up.cnt<=0) {
            if(up.queue.length) up.queue.shift()();
        }
        for (let p of popups) p.moveBy();
        if (popups.length>5) popups[0].hide();*/
    }
    up.cnt=0;
    up.queue=[];
    up.reserve=f=>up.queue.push(f);
    setInterval(up,20);
    class RectShape {
        constructor(left,top,width,height) {
            this.left=left;
            this.top=top;
            this.width=width;
            this.height=height;
        }
        moveBy(x,y) {
            return new RectShape(this.left+x,this.top+y,this.width,this.height);
        }
        intersects(s) {
            if (!s) return false;
            const x=this.left+this.width/2;
            const y=this.top+this.height/2;
            const sx=s.left+s.width/2;
            const sy=s.top+s.height/2;
            return Math.abs(x-sx)*2<this.width+s.width &&
            Math.abs(y-sy)*2<this.height+s.height;
        }
        right() {return this.left+this.width;}
        bottom() {return this.top+this.height;}
    }
    function NotePopup(note) {
        note.favsHaving=note.favsHaving||0;
        const favButton=UI("span",{on:{click:toggleFav}},"❤");
        if (note.favByMyself) favButton.addClass("faved");
        const favCount=UI("span",note.favsHaving||"0");
        const closeButton=UI("span",{on:{click:hide}},"x");

        const like=UI("span",favButton, favCount, closeButton).css({float:"right"});
        const elem=UI("div",{class:"socializePopup"},note.content,like).
        appendTo("body");
        let at,bottomMax;
        function show(_at) {
            at=at||_at;
            /*if (up.cnt>0) {
                return up.reserve(show);
            }*/
            popups.push(self);
            //console.log("POP!",note);
            //up.cnt=10;
            bottomMax=at.top;
            console.log("BMAX", dimension().bottom(),bottomMax);
            console.log("POP!", note, bottomMax);
            elem.show();
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function moveBy(left,top=-5) {
            at.top+=top;
            at.left+=left;
            elem.css({left:`${at.left}px`, top:`${at.top}px`});
        }
        function hide() {
            elem.remove();
            const i=popups.indexOf(self);
            popups.splice(i,1);
        }
        function refresh() {
            favCount.text(note.favsHaving);
        }
        function drop() {
            const d=dimension();
            if (!d) return;
            const d1=d.moveBy(0,5);
            let dodrop=true;
            for (let p of popups) {
                if (p===self) continue;
                const pd=p.dimension();
                if (!pd) continue;
                if (d.intersects(pd)) {
                    //console.log("INTER", self.note, p.node);
                    if (d.top<pd.top ) {
                        moveBy(0,-5);
                        dodrop=false;
                    } else {
                        p.moveBy(0,-5);
                    }
                }
                if (d1.intersects(pd)) dodrop=false;
            }
            if (dodrop && d.bottom()<bottomMax-5) moveBy(0,1);
            if (d.bottom()>=bottomMax) {
                //console.log(d.bottom(),bottomMax);
                moveBy(0,-5);
            }
        }
        function dimension() {
            const p=position();
            if (!p) return;
            return new RectShape(p.left,p.top, elem.outerWidth(), elem.outerHeight());
        }
        async function toggleFav() {
            if (note.favByMyself) {
                await ctrl.get("Note/rmFav",{id:note.favByMyself});
                note.favsHaving--;
                favCount.text(note.favsHaving);
                favButton.removeClass("faved");
                note.favByMyself=false;
            } else {
                const id=await ctrl.get("Note/addFav",{id:note.id});
                //note.favsHaving++;
                favCount.text(note.favsHaving-0+1);
                favButton.addClass("faved");
                note.favByMyself=id;

            }
        }
        function position(){return at;}
        const self={note,show,hide,moveBy,refresh,position,drop,dimension};

        return self;
    }
    NotePopup.clear=()=>{
        while (popups.length) popups[0].hide();
        up.queue=[];
    };
    const notesByFiles={};// filepath->NotesByFile
    class NotesByFile{
        //filepath:string
        //last:time;
        //entries:{id->note} ;
        constructor (filepath) {
            this.filepath=filepath;
            this.entries={};
            this.last=0;
            this.lastRefresh=0;
        }
        addEntry(note) {
            this.entries[note.id]=this.entries[note.id]||{};
            let newFav;
            if (note.favsHaving) {
                newFav=(this.entries[note.id].favsHaving||0)+note.favsHaving;
                console.log("newFav",newFav);
            }
            Object.assign(this.entries[note.id], note);
            if (newFav!==null) {
                this.entries[note.id].favsHaving=newFav;
            }
            if (note.time>this.last) this.last=note.time;
            if (note.c_time>this.last) this.last=note.c_time;
            return this.entries[note.id];
        }
        async refresh(duration=0) {
            const now=new Date().getTime();
            if (now<this.lastRefresh+duration) return false;
            this.lastRefresh=now;
            const notes=await ctrl.get("Note/get",{file:this.filepath,since:this.last});
            console.log(notes);
            for (let note of notes) {
                this.addEntry(note);
            }
            return true;
        }
        pick(except) {
            except=except||{};
            const cand=[];
            for (let id in this.entries) {
                if (!except[id]) cand.push(this.entries[id]);
            }
            if (cand.length==0) return null;
            const a=cand[Math.floor(Math.random()*cand.length)];
            const b=cand[Math.floor(Math.random()*cand.length)];
            if (a.favsHaving>b.favsHaving) return a;
            return b;
        }
        static instance(filepath) {
            notesByFiles[filepath]=notesByFiles[filepath]|| new NotesByFile(filepath);
            return notesByFiles[filepath];
        }
    }
    module.exports=(ide)=>{
        const elem=UI("div",{title:"についてのノート"},
            ["input", {$var:"cont", size:60,on:{enterkey:send}}],
            ["button", {$var:"OKButton", on:{click: send}},"送信"]
        );
        const vars=elem.$vars;
        let file;
        async function send() {
            const cont=vars.cont.val();
            vars.cont.val("");
            const o=elem.offset();
            console.log(o);
            o.top-=50;
            const noteSrc={content:cont};
            if (file) {
                const prjTop=ide.prj.getDir().up();
                const filePath=file.relPath(prjTop);
                noteSrc.id=await ctrl.post("Note/put",{
                    file:filePath,
                    content:cont,
                });
                const n=NotesByFile.instance(filePath);
                const note=n.addEntry(noteSrc);
                NotePopup(note).show(o);
                console.log("New note ",note.id);
            }
        }
        let timer;
        async function changeFile(f) {
            if (file && f && file.path()===f.path()) return;
            NotePopup.clear();
            if (timer) clearTimeout(timer);
            file=f;
            const prjTop=ide.prj.getDir().up();
            const filePath=file.relPath(prjTop);

            elem.dialog("option","title",f.name()+"についてのノート");
            const n=NotesByFile.instance(filePath);
            await n.refresh();
            async function loop() {
                if (await n.refresh(10*1000)) {
                    for (let c of popups) c.refresh();
                }
                //console.log("EX",except);
                if (popups.length<5) {
                    const except={};
                    for (let c of popups) except[c.note.id]=c;
                    const com=n.pick(except);
                    if (com) {
                        const o=elem.offset();
                        o.top-=50;
                        NotePopup(com).show(o);
                    }
                }
                timer=setTimeout(loop,1000);
            }
            loop();

            /*const coms=await ctrl.get("Note/get",{file:filePath});
            console.log("coms",coms);
            for (let com of coms) {
                const o=elem.offset();
                o.top-=50;
                CommentPopup(com).show(o);
            }*/
        }
        function show(f) {
            elem.dialog({width:800,height:100,position: { my: "center bottom", at: "center bottom"},});
            if (f) changeFile(f);
        }
        return {changeFile,show};
    };
});
