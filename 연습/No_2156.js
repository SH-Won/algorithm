const fs = require('fs');
const [n,...arr]=fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);
// const [n,...arr] = [6,6,10,13,9,8,1];
const dp=Array(n+3).fill(0);
const wine = [0,0,0,...arr];

for(let i=3; i<n+3; i++){
    dp[i] = Math.max(dp[i-3]+wine[i-1]+wine[i],dp[i-2]+wine[i])
    dp[i] = Math.max(dp[i-1],dp[i]);
}

console.log(dp[n+3-1]);