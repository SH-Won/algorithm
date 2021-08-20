function solution(N){
    let k = 0;
    //1 2 4 5

    while(N){

        if(N % 2 !==0) {
            k++;
            N = N-1
        }
        else{
            N = Math.floor(N/2);
        }
    }
    return k;
}