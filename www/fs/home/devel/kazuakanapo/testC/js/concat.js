scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.x = cast("int", 666);
    scopes_0.printf(str_to_ch_arr("hello\n"));
    scopes_0.printf(str_to_ch_arr("x= %d\n"), scopes_1.x);
};
loop_start2();
main();