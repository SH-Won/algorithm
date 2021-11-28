// const input = [
// '6 6',
// '0 0 0 1 0 0',
// '0 0 0 2 1 0',
// '0 0 2 0 0 0',
// '0 1 0 0 0 0',
// '2 0 0 0 0 0',
// '0 0 0 0 0 0',
// ]
const input = [
    '2 1',
    '1',
    '1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,N] = input[0].split(' ').map(Number);
const map = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(Number));
let dp = Array.from({length:M},()=>Array(N).fill(1));

for(let y=0; y<M; y++){
    for(let x=0; x<N; x++){
        if(map[y][x]) dp[y][x] = 0;
    }
}
let max = Math.max(...dp[0],...dp.map(row => row[0]));
for(let y=1; y<M; y++){
    for(let x=1; x<N; x++){
        if(!dp[y][x]) continue;
        const min = Math.min(dp[y-1][x-1],dp[y-1][x],dp[y][x-1]);
        
        dp[y][x] +=min;
        max = Math.max(dp[y][x],max);
    }
}

console.log(max);
