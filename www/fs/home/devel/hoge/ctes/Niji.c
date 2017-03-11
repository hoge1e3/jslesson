// C
#include<stdio.h>
#include<x.h>
int a[10][10];//縦10、横10の配列
int main(void) {
    int i,j,v=1,c=0;
    //初期化（全部0で埋める）
    for (i=0; i<10 ; i++) {//縦方向の繰り返し
        for (j=0; j<10 ; j++) {//横方向の繰り返し
            a[i][j]=v/32;
            v=((v+1)*5)%256;
        }
    }
    while(1) {
        for (i=0; i<10 ; i++) {//縦方向の繰り返し
            for (j=0; j<10 ; j++) {//横方向の繰り返し
                a[i][j]+=1;
                a[i][j]&=7;
                c=a[i][j];
                setColor(c/4*255,(c/2)%2*255,c%2*255);
                fillRect(j*10,i*10,10,10);
                v=((v+1)*5)%256;
            }
            update();
        }
    }
    a[5][3]=1;//縦5 横3
    a[7][4]=1;//縦7 横4
    printf("%d\n",a[5][3]);
    printf("%d\n",a[3][5]);
}
