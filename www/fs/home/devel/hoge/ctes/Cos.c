// C
#include<stdio.h>
#include<math.h>
main() {
    double a=1;
    int i;
    //scanf("%d",&a);
    while(a!=cos(a)) {
        for (i=0;i<a*30;i++) {
            printf("-");
        }
        printf("%f\n",a=cos(a));
    }
}