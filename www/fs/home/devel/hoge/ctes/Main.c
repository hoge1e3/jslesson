// C
#include<stdio.h>
int a(int f);
int b(int x);
main() {
    int x=3;
    a(x);
}
a(int f) {
    int i;
    for (i=0;i<10;i++) b(i*f);
    
}
b(int x) {
    printf("b=%d\n",x);
    sleep(100);
}