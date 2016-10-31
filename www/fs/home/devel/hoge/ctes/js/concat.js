scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.a = 0;
    scopes_0.scanf(str_to_ch_arr("%d"), pointer(scopes_1, "a", "int"));
    scopes_0.printf(str_to_ch_arr("Hoge %d"), (scopes_1.a * 2));
};
loop_start2();
main();