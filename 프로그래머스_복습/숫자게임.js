const solution = (A,B) =>{
    let left = 0;
    let score = 0;
    A.sort((a,b) => a-b);
    B.sort((a,b) => a-b);
    for(let i=0; i<A.length; i++){
        if(A[left] < B[i]){
            left++;
            score++;
        }
    }
    return score;
}