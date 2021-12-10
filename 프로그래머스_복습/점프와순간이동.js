// dp[1] = 1;
// dp[2] = dp[i-1] + 1 , dp[i/2];
// dp[3] = dp[i-1] + 1 
const solution = (N) =>{
    let answer = 0;
    while(N){
        if(N % 2 === 0){
            N /= 2;
        }
        else{
            N--;
            answer++;
        }
    }
    return answer;
}
console.log(solution(5000))