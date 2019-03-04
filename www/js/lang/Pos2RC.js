define(["Klass"],function (Klass){
return Klass.define({
    $: function(src,origin) {
        if (origin==null) this.origin=1;// or 0
        else this.origin=origin;
        var t=this;
        t.src=src;
        t.map=[];
    	t.lastRow=0;
        var pos=0;
    	src.split("\n").forEach(function (line) {
    		t.map.push(pos);
    		pos+=line.length+1;
    	});
    	t.map.push(t.pos);
    },
    getRC:function(pos) {
        var t=this;
        var origin=t.origin;
		while(true) {
			if (t.lastRow<0) {
                t.lastRow=0;
				return {row:origin, col:origin};
			}
			if (t.lastRow+1>=t.map.length) {
                t.lastRow=t.map.length-2;
				return {row:t.map.length+origin, col:origin};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<t.map[t.lastRow]) {
				t.lastRow--;
			} else if (t.map[t.lastRow+1]<=pos) {
				t.lastRow++;
			} else {
				return {row:t.lastRow+origin, col:pos-t.map[t.lastRow]+origin};
			}
		}
	},
    getPos: function (row,col) {
        // Although the class name Pos2RC.
        var t=this;
        var pos=0;
        var lines=t.src.split("\n");
        for (var i=0 ; i<lines.length && i+t.origin<row ; i++) {
            pos+=lines[i].length+1;
        }
        pos+=col-t.origin;
        return pos;
    },
    getAll: function (p) {
        if (typeof p==="object") {
            var n=this.getPos(p.row,p.col);
            return {pos:n, row:p.row, col:p.col};
        } else if (typeof p==="number"){
            var r=this.getRC(p);
            r.pos=p;
            return r;
        } else {
            throw new Error("Invalid position type: "+p);
        }
    }
});
});
