const input = ['4 7','6 13','4 8','3 6','5 12'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(num =>+num);
const WV = Array.from({length:N} , (_,i)=> input[i+1].split(' ').map(num =>+num));
let dp = Array.from({length:N+1}, ()=>Array(K+1).fill(0));

for(let i=1; i<=WV.length; i++){
    const [weight, value] = WV[i-1];
    for(let j=0; j<=K; j++){
         if(j - weight >= 0){
             dp[i][j] = Math.max(dp[i-1][j],value + dp[i-1][j-weight])
         }
         else{
             dp[i][j] = dp[i-1][j];
         }
    }
}
console.log(Math.max(...dp[N]));
