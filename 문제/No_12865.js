// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input =[
    '4 7',
    '6 13',
    '4 8',
    '3 6',
    '5 12'
]

const [N,K] = input[0].split(' ').map(num => +num);
const arr = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num => +num) );
let dp = Array.from({length:N+1},()=>Array(K+1).fill(0));

for(let i=1; i<N+1; i++){
    let weight = arr[i-1][0];
    let value = arr[i-1][1];

    for(let j=1; j<K+1; j++){

        if(j - weight < 0){
            dp[i][j] = dp[i-1][j];
        }
        else{
            dp[i][j]=Math.max(dp[i-1][j],dp[i-1][j-weight] + value)
        }
    }

}
console.log(Math.max(...dp[dp.length-1]));