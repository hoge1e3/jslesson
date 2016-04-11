scopes = [];
scopes.push({});

function main() {
    try {
        scopes.push({});
        printf("hello world!!\n");
        printf("konnichiwa sekai\n");
        printf("%d", (3 + 2));
    } finally {
        scopes.pop();
    }
}
main();