const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '10',
//     '10 -4 3 1 5 6 -35 12 21 -1'
// ]
const N =+input[0];
const arr = input[1].split(' ').map(num => +num);

let dp = Array(N);
dp[0] = arr[0];

for(let i=1; i<N; i++){

    dp[i] = arr[i];
    if(dp[i] < dp[i-1]+arr[i]){
        dp[i] = dp[i-1]+arr[i]
    }
        
}
console.log(Math.max(...dp));

