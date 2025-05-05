#include<music.h>
#include<stdio.h>
int main(void) {
    int i;
    printf("test1");   
    play("cde","efg");
    printf("test2");   
    for (i=0;i<5;i++) {
        play("cde","@drum bbs");
    }
}