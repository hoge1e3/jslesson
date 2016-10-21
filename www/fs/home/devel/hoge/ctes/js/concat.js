scopes_0 = window;
scopes_0.main = function main() {
    var scopes_1 = {};
    scopes_1.i = cast("int", 2);
    var start0 = loop_start();
    while ((scopes_1.i >= 0)) {
        try {
            {
                var scopes_2 = {};
                scopes_0.printf(str_to_ch_arr("なま"));
                switch (scopes_1.i) {
                    case 0:
                        scopes_1.i = cast("int", 1);
                        scopes_0.printf(str_to_ch_arr("ごめ"));
                        break;
                    case 1:
                        scopes_1.i = cast("int", -1);
                        scopes_0.printf(str_to_ch_arr("たまご"));
                        break;
                    case 2:
                        scopes_0.printf(str_to_ch_arr("むぎ"));
                        scopes_1.i = cast("int", 0);
                        break;
                }
            }
        } finally {
            loop_chk2(start0);
        }
    }
};
loop_start2();
main();