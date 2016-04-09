scopes = [];
scopes.push({});

function main() {
    try {
        scopes.push({});
        scopes[scopes.length - 1].a = cast("int", 0);
        scopes[1].a = cast("int", 3);
        printf("%d", (scopes[1].a + 5));
    } finally {
        scopes.pop();
    }
}
main();