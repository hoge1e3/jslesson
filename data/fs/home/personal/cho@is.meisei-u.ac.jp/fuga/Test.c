// C
#include<stdio.h>
#include<stdlib.h>
int main(void) {
    int i,j;
    for(j=0;j<3;j++)
    for(i=0;i<3;i++)
    printf("hoge %d %d %d\n",i,j,rand());
} 