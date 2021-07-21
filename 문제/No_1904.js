const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const N = input;

let dp =[];
dp[1] = 1;
dp[2] = 2;

for(let i=3; i<=N; i++){
    dp[i] = (dp[i-1] + dp[i-2]) % 15746;
}
console.log(dp[N]);