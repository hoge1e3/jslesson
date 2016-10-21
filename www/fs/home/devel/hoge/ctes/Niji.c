// C
#include<stdio.h>
int a[10][10];//縦10、横10の配列
int main(void) {
    int i,j;
    //初期化（全部0で埋める）
    for (i=0; i<10 ; i++) {//縦方向の繰り返し
        for (j=0; j<10 ; j++) {//横方向の繰り返し
            a[i][j]=0;
        }
    }
    a[5][3]=1;//縦5 横3
    a[7][4]=1;//縦7 横4
    printf("%d\n",a[5][3]);
    printf("%d\n",a[3][5]);
}
