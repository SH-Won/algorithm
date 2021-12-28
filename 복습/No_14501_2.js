//const input =['10','5 50','4 40','3 30','2 20','1 10','1 10','2 20','3 30','4 40','5 50']
//const input =['10','5 10','5 9','5 8','5 7','5 6','5 10','5 9','5 8','5 7','5 6']
//const input =['7','3 10','5 20','1 10','1 20','2 15','4 40','2 200']
//const input =['10','1 1','1 2','1 3','1 4','1 5','1 6','1 7','1 8','1 9','1 10']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMaxEarn = (N,dp,schedule,day) =>{
    if(day >=N) return 0;
    if(dp[day]) return dp[day];
    const [t,p] = schedule[day];
    dp[day] = Math.max(getMaxEarn(N,dp,schedule,day+1),
                       day+t <=N ? p+getMaxEarn(N,dp,schedule,day+t) : 0);
    return dp[day];
}

const solution = (input) =>{
    const N = input[0];
    const schedule = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let dp = Array(N).fill(0);
    const answer = getMaxEarn(N,dp,schedule,0);
    console.log(answer);
}
solution(input);