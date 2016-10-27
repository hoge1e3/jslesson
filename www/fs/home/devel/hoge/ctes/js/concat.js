scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.a = cast("double", 1);
    scopes_1.i = 0;
    var start1 = loop_start();
    while ((scopes_1.a !== scopes_0.cos(scopes_1.a))) {
        try {
            {
                var scopes_2 = {};
                var start0 = loop_start();
                for (scopes_1.i = cast("int", 0);
                    (scopes_1.i < (scopes_1.a * 30)); scopes_1.i++) {
                    loop_chk2(start0); {
                        var scopes_3 = {};
                        scopes_0.printf(str_to_ch_arr("*"));
                    }
                }
                scopes_0.printf(str_to_ch_arr("%f\n"), scopes_1.a = cast("double", scopes_0.cos(scopes_1.a)));
            }
        } finally {
            loop_chk2(start1);
        }
    }
};
loop_start2();
main();