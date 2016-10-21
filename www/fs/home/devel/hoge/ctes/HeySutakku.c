// C
#include<stdio.h>
#include<string.h>
int main(void) {
    char nidoru[5]="ni";
    char he_suta[30]="meniaobayama hototogisu hatsugatsuo";
    if (strstr(he_suta, nidoru)!=NULL) {
        printf("arimasu");
    } else {
        printf("arimasen");
    }
}