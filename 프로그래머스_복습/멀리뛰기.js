

const solution = (n) =>{
    let dp = Array(n+1);
    dp[1] = 1;
    dp[2] = 2;
    for(let i=3; i<=n ; i++){
        dp[i] = (dp[i-2] + dp[i-1])  % 1234567; 
    }
    return dp[n];
}