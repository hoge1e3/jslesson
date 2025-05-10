#include<music.h>
#include<x.h>
#include<stdio.h>
int main(void) {
    int i;
    printf("test1");   
    play("cdefedc","efg");
    printf("test2");   
    //for (i=0;i<60;i++) update();
    //play_stop();
    while(1) {
        update();
        clear();
        drawNumber(play_time(),30,30);
        //if (getkey("z")==1) play("@drum b");
        
    }
    /*for (i=0;i<5;i++) {
        play("cde","@drum bbs");
    }*/
    
}