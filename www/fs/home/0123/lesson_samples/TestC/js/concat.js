scopes = [];
scopes.push({});

function main() {
    try {
        scopes.push({});
        printf("Main3");
    } finally {
        scopes.pop();
    }
}
main();