// const fs = require('fs');
// const [N,...arr]=fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);

const [N,...arr]=[3,0,1,3];
let dp=[];
let solution ='';
dp[0]=[1,0];
dp[1]=[0,1];

for(let i=2; i<41; i++){

 dp[i]=[(dp[i-2][0] + dp[i-1][0]),(dp[i-2][0]+dp[i-1][1])]

}

for(let i=0; i<N; i++){
    solution +=`${dp[arr[i]].join(' ')}\n`
}
console.log(solution.trim());