console.log(solution(1))
function solution(n){
    
    let dp = Array(n+2);
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for(let i=3; i<n+2; i++){
        dp[i] = (dp[i-2] +dp[i-1])% 1234567;
    }

    return dp[n]

}