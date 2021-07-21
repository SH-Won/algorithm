const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '5',
//     '7',
//     '3 8',
//     '8 1 0',
//     '2 7 4 4',
//     '4 5 2 6 5'
// ]

const N = +input[0];
let arr = new Array(N);
let dp=new Array(N);

for(let i=0; i<N; i++){
    arr[i] = input[i+1].split(' ').map(num => +num);
}

dp[0] = [arr[0][0]];
for(let i=1; i<N; i++){
    dp[i]= new Array(arr[i].length)
    for(let j=0; j<dp[i].length; j++){
        if(j===0){
            dp[i][j] = arr[i][j] + dp[i-1][j]
            continue;
        }
        if(j===dp[i].length -1){
            dp[i][j] = arr[i][j] +dp[i-1][j-1]
            continue;
        }

        dp[i][j]=arr[i][j] + Math.max(dp[i-1][j],dp[i-1][j-1])
    }
}

console.log(Math.max(...dp[N-1]));
