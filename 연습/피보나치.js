const fs = require('fs');
const [N,...arr] =fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num =>+num);

let string ='';
let dp=[];
dp[0] = [1,0];
dp[1] = [0,1];
for(let idx=2; idx<41; idx++){
    dp[idx] = [(dp[idx -1][0] + dp[idx-2][0]),(dp[idx-1][1] + dp[idx-2][1])]
}

for(let i=0; i<N; i++){
   string += `${dp[arr[i]].join(' ')}\n`
}
console.log(string.trim());