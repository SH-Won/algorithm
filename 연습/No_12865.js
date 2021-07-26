// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = [
    '6 7',
    '6 13',
    '4 8',
    '3 6',
    '5 12',
    '7 100',
    '1 90'
]
const [N,K] =input[0].split(' ').map(num => +num);
const WV = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num => +num));
let dp = Array.from({length:N+1},()=>Array(K+1).fill(0));

for(let i=1; i<=N; i++){
    
    const weight = WV[i-1][0];
    const value = WV[i-1][1];

    for(let j=1; j<=K; j++ ){

        if( j - weight < 0){
            dp[i][j] = dp[i-1][j]
        }
        else{
            dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight]+value);
        }
    }
}

// 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 13 13
// 0 0 0 0 8 8 13 13
// 0 0 0 6 8 8 13 14
// 0 0 0 6 8 12 13 14
// console.log(dp);
console.log(Math.max(...dp[N]));