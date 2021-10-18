const solution = (n)=>{
    let dp = Array(n+1);
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;
    // dp [3] = [1 1 1],[1 2],[2 1];
    // dp[4] = [1 1 1 1],[1 2 1],[1 1 2],[2 1 1],[2 2];
    // dp[5] = [1 1 1 1 1],[1 2 1 1],[1 1 2 1],[2 1 1 1] [2 2 1],[]
    for(let i=3; i<=n; i++){
        dp[i] = dp[i-2] + dp[i-1];
    }
    return dp[n];
}
console.log(solution(5));