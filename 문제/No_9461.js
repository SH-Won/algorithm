// const fs = require('fs');
// const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);
const [N,...arr]=[2,6,12];

let dp=[]
dp[1]=1;
dp[2]=1;
dp[3]=1;
dp[4]=2;
for(let i=5; i<=100; i++){
    dp[i] = dp[i-3] + dp[i-2];
}

for(let i=0; i<N; i++){
    console.log(dp[arr[i]]);
}
