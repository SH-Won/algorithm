const fs = require('fs');
const [string1,string2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const [string1,string2] = ['ACAYKP','CAPCAK'];
// dp 의시점
// dp[i][j] 가 현재 라고 가정한다.

// 비교하는 string1 과 string2 가 맞지 않는다면
// dp[i-1][j] 은 string1 과 string2를 현재 까지 비교하고 string1 의 문자가 string2 의 문자가 일치하는 갯수
// dp[i][j-1] 은 string1 과 string2를 현재 바로전 까지 비교하고 string1의 문자가 string2의 문자가 일치하는 갯수
// 즉 둘중의 max 값을 dp[i][j] 에 넣어줘야한다. 
let dp= Array.from({length:string1.length +1},()=>Array(string2.length+1).fill(0));

for(let i=1; i<=string1.length; i++){

    for(let j=1; j<=string2.length; j++){
        if(string1[i-1] === string2[j-1]){
           dp[i][j] = dp[i-1][j-1] +1
        }
        else{
            dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j]);
        }
    }
}
console.log(dp[string1.length][string2.length]);