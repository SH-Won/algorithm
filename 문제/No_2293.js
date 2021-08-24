const input =['3 10','1','2','5'];
//const input =['3 9','2','3','4']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n,k] = input[0].split(' ').map(num => +num);
const coinQuality = Array.from({length:n},(_,i)=> +input[i+1]);
let dp = Array(k+1).fill(0);

// dfs 는 메모리가 초과가 난다.
// let count = 0;
// dfs(0,0);
// console.log(count);
// function dfs(index,curQuality){
//     if(curQuality > k) return;

//     for(let i=index; i<coinQuality.length; i++){
//         const nextQuality = curQuality + coinQuality[i];  
//         nextQuality === k ? count++ : dfs(i,nextQuality)   
//     }

// }

dp[0] = 1;

for(let i=0; i<n; i++){
    for(let j=coinQuality[i]; j<=k; j++){
        dp[j] += dp[j-coinQuality[i]]
    }
}
console.log(dp[k])


