// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '10',
    '10 -4 3 1 5 6 -35 12 21 -1'
]
const n = +input[0];
const numbers = input[1].split(' ').map(num => +num);
let dp= Array(n);
dp[0] =numbers[0];
for(let i=1; i<n; i++){
    dp[i] = numbers[i];
    if(dp[i] < dp[i-1] + numbers[i] ){
        dp[i] = dp[i-1]+numbers[i]
    }
}
console.log(Math.max(...dp));