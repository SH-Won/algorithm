// const fs = require('fs');
// const input = fs.readFileSync('dev/stdin').toString().trim();

const input='2';
const N = +input;

let dp = Array(N+1);

for(let i=0; i<=N; i++){
    dp[i]=Array(11).fill(0);
}
for(let j=1; j<=9; j++){
    dp[1][j] = 1;
}

for(let i=2; i<=N; i++){
    dp[i][0] = dp[i-1][1];
    
    for(let j=1; j<=9; j++){
        dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1];
    }
}
let result = dp[N].reduce((acc,pre)=> acc+=pre,0);
console.log(result % 10**9);