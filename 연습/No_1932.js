const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

// const input =[
//     '5',
//     '7',
//     '3 8',
//     '8 1 0',
//     '2 7 4 4',
//     '4 5 2 6 5'
// ]
const n = +input[0];
const triangle = Array.from({length:n},(_,i)=>input[i+1].split(' ').map(num =>+num));
let dp = Array.from({length:n},(_,i)=>Array(triangle[i].length));



dp[0][0] = triangle[0][0];


for(let i=1; i<n; i++){
    for(let j=0; j<dp[i].length; j++){
        if(j===0){
        dp[i][j] = dp[i-1][j] + triangle[i][j]
        continue
        
        }
        if(j === dp[i].length -1){
        dp[i][j] = dp[i-1][j-1] +triangle[i][j];
        }
        else{
        dp[i][j] = Math.max(dp[i-1][j-1] ,dp[i-1][j]) + triangle[i][j];
        
        }
        
    }
}
console.log(Math.max(...dp[n-1]));