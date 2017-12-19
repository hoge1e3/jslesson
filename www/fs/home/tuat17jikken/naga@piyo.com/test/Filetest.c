#include<stdio.h>
int main(void) {
    FILE *fp;
    int count=0;
    fp=fopen("count.txt","r");
    if (fp!=NULL)  {
        fscanf(fp,"%d",&count);
        fclose(fp);
    }
    printf("count=%d",count);
    
    count++;
    fp=fopen("count.txt","w");
    fprintf(fp,"%d",count);
    fclose(fp);
}