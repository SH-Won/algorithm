const fs = require('fs');
const [string1,string2] =fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// let string1 = 'ACAYKP';
// let string2 = 'CAPCAK';
let dp = Array.from({length: string1.length +1 }, v =>Array(string2.length+1).fill(0));

for(let i=1; i<=string1.length; i++){
    for(let j=1; j<=string2.length; j++){
        if(string1[i-1] === string2[j-1]){
         dp[i][j] = dp[i-1][j-1] + 1;
        }
        else{
          dp[i][j] =Math.max(dp[i-1][j], dp[i][j-1])

        }
    }
}
console.log(dp[string1.length][string2.length]);
// ACAYKP  
// CAPCAK 
//   A C A Y K P
// 0 0 0 0 0 0 0
// 0 0 1 1 1 1 1
// 0 1 1 1 2 2 2 
// 0 1 2 2 2 3 3
// 0 0 2 2 2 3 3
// 0 0 2 2 2 3 4
// 0 0 2 3 3 3 4 
