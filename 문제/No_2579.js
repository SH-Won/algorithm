const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);

//const [N,...arr] = [6,10,20,15,25,10,20];
let dp= Array(N);
dp[0] = arr[0];
dp[1] = Math.max(arr[0]+arr[1],arr[1]);
dp[2] = Math.max(arr[0]+arr[2],arr[1]+arr[2]);

for(let i=3; i<N; i++){
    dp[i] = Math.max(dp[i-2] + arr[i], dp[i-3]+arr[i-1]+arr[i]);
}

console.log(dp[N-1]);
