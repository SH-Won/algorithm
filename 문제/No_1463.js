// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
// const N = +input;
const N = 12;
let dp=Array(N+3).fill(0);

dp[2] = 1; 
dp[3] = 1; 
// dp[4] = 2; // 2 2
// dp[5] = 3   // -1 /2 /2
// dp[6] = 2    // 3 3
// dp[7] =3 // -1 /3 /3 
// dp[8] = 4;
// dp[9] = 3;
// dp[10] = 4  //
// dp[11] = 5 //
// dp[12] = // /

for(let i=4; i<N+3; i++){
if(i % 2 ===0){
    dp[i] = dp[(i/2)] + 1;
    continue;
} 
if(i % 3 ===0){
    dp[i] = dp[(i/3)] +1;
    continue;
}

  dp[i] = dp[i-1]+1
}
console.log(dp[N]);

