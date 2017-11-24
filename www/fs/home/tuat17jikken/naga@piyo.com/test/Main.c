// C
#include<stdio.h>
int main(){
    int i,num;
    printf("何回繰り返す");
    scanf("%d",&num);
    for(i=0;i<num;i++){
        printf("hello world%d\n",i);
    }
}