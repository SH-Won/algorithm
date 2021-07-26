// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const input ='2';
const N = +input;

// 몇 계단 수가 i 인것
// 끝 자리 수가 j 인것
let dp =Array.from({length:N+1},()=> Array(11).fill(0));
console.log(dp);
let result ;
for(let i=1; i<=9; i++){
    dp[1][i] =1;
}

for(let i=2; i<=N; i++){
    dp[i][0] =dp[i-1][1];
    for(let j=1; j<=9; j++){
        dp[i][j] = (dp[i-1][j-1] +dp[i-1][j+1]) % 10**9
    }
}
result = dp[N].reduce((acc,cur)=> acc+=cur);

console.log(result);