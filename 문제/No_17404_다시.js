//const input = ['3','26 40 83','49 60 57','13 89 99'];
// const input = ['3','10 50 50','15 15 15','10 50 50']; //ans 75
//const input =['3','13 89 89','49 60 57','26 40 83']; //ans 110
// const input = ['2','1000 1000 1','1000 1000 1']; //ans 1001
const input = Array.from({length:1001},(_,i)=>{
       if(i===0) return '1000';
       return '1 1 1';
})// ans 1000;
//const fs = require('fs');
//const input= fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const rgb = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

const solution = (rgb)=>{
    let dp = Array.from({length:N},()=>Array(3));
    let min = Infinity;
    
    for(let firstHouse=0; firstHouse<=2; firstHouse++){
        for(let i=0; i<=2; i++){
            if(i === firstHouse) dp[0][firstHouse] = rgb[0][firstHouse];
            else dp[0][i] = Infinity;
        }
        for(let i=1; i<N; i++){
            dp[i][0] = Math.min(dp[i-1][1],dp[i-1][2]) + rgb[i][0];
            dp[i][1] = Math.min(dp[i-1][0],dp[i-1][2]) + rgb[i][1];
            dp[i][2] = Math.min(dp[i-1][0],dp[i-1][1]) + rgb[i][2];
        }
        for(let i=0; i<=2; i++){
            if(i === firstHouse) continue;
            min = Math.min(min,dp[N-1][i]);
        }
    }
    return console.log(min);
    
}
solution(rgb);