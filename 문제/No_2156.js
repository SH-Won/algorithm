const fs = require('fs');
const [N,...numbers] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);
// const a = [6,10,13,9,8,1];
// const [N,...arr]=[6,0,0,0,...a];
// N= 1 2 3 일때를 생각해야함
// const [N,...numbers] = [6,6,10,13,9,8,1];
const arr = [0,0,0,...numbers];
let dp=Array(N+3).fill(0);

for(let i=3; i<N+3; i++){
    dp[i] = Math.max(dp[i-2]+arr[i],dp[i-3]+arr[i-1]+arr[i]);
    dp[i] = Math.max(dp[i-1],dp[i]);

}
console.log(dp[N+3-1]);




// let dp=Array(N);

// dp[0] = arr[0];
// dp[1] = Math.max(arr[0]+arr[1],arr[1]);
// dp[2] = Math.max(arr[0]+arr[2],arr[1]+arr[2]);

// for(let i=3; i<N; i++){
//     dp[i] = Math.max(dp[i-2]+arr[i],dp[i-3]+arr[i-1]+arr[i]);
//     dp[i] = Math.max(dp[i-1],dp[i]);
// }

// console.log(dp[N-1]);
