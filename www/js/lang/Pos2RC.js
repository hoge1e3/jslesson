define([],function (){
class Pos2RC {
    constructor(src,origin) {
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
    }
    getRC(pos) {
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
	}
}
//export default Pos2RC;
return Pos2RC;
});
