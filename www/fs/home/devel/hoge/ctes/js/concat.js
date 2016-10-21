scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.nidoru = str_to_ch_arr("ni");
    scopes_1.he_suta = str_to_ch_arr("meniaobayama hototogisu hatsugatsuo");
    if ((scopes_0.strstr(scopes_1.he_suta, scopes_1.nidoru) !== 0)) {
        var scopes_2 = {};
        scopes_0.printf(str_to_ch_arr("arimasu"));
    } else {
        var scopes_2 = {};
        scopes_0.printf(str_to_ch_arr("arimasen"));
    }
};
loop_start2();
main();