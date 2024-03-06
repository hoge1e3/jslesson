/* global self, global */
define([],function () {
    function pad(n, len) {
        let r="000000000"+n;
        return r.substring(r.length-len);
    }
    function install(PL) {
        const lib=PL.import.libs.time={
            sleep(sec) {
                return new Promise((s)=>{
                    setTimeout(s,sec*1000);
                });
            },
            //time.strftime("%Y/%m/%d %H:%M:%S", time.localtime(time.time()+600))
            time() {
                return new Date().getTime()/1000;
            },
            localtime(t=null) {
                if (!t) t=this.time();
                let d=new Date(t*1000);
                //time.struct_time(tm_year=2023, tm_mon=9, tm_mday=7, tm_hour=21, tm_min=48, tm_sec=46, tm_wday=3, tm_yday=250, tm_isdst=0)
                let res={
                    tm_year: d.getFullYear(),
                    tm_mon: d.getMonth()+1,
                    tm_mday: d.getDate(),
                    tm_hour: d.getHours(),
                    tm_min: d.getMinutes(),
                    tm_sec: d.getSeconds(),
                    tm_wday: (d.getDay()+6)%7,
                };
                return res;
            },
            strftime(format, t=null) {
                if (!t) t=this.localtime();
                const fields={
                    Y: "tm_year", m:"tm_mon", d:"tm_mday", H:"tm_hour", M:"tm_min", S: "tm_sec",
                };
                return format.replace(/%(\w)/g, (_,f)=>pad( t[fields[f]], f=="Y"?4:2 ));
            },
        };
        console.log("py_time", Object.keys(lib));
        return lib;
    }
    return {install};
});
