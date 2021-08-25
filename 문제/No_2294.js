const input =['3 15','2','4','12']
//const input =['3 3','2','2','2']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n,k] = input[0].split(' ').map(num=>+num);
const coinQuality = Array.from({length:n}, (_,i)=>+input[i+1])
let dp = Array(k+1).fill(Infinity);
dp[0]=0;
for(let i=0; i<coinQuality.length; i++){
    for(let j=coinQuality[i]; j<=k; j++){
       dp[j] = Math.min(dp[j],dp[j-coinQuality[i]]+1)
    }
}
console.log(dp[k] === Infinity ? -1 : dp[k])

// let count = Infinity;
// dfs(0,0,0);
// console.log(count === Infinity ? -1 : count);
// function dfs(cnt,index,curQuality){
//     if(curQuality > k){
//         return;
//     }

//     for(let i=index; i<coinQuality.length; i++){
//         const nextQuality = coinQuality[i]+ curQuality;
        
//         nextQuality === k ? count = Math.min(count,cnt+1) :
//         dfs(cnt+1,i,nextQuality);

//     }

// }