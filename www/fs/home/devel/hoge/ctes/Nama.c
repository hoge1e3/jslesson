// C
#include<stdio.h>
int main(void) {
    int i=2;
    while(i>=0) {
        printf("なま");
        switch(i) {
            case 0:
            i=1;
            printf("ごめ?");
            break;
            case 1:
            i=-1;
            printf("たまご");
            break;
            case 2:
            printf("むぎ");
            i=0;
            break;
        }
    }
}
