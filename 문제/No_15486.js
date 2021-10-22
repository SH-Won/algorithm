// const input = ['7','3 10','5 20','1 10','1 20','2 15','4 40','2 200'];
// const input = ['10','1 1','1 2','1 3','1 4','1 5','1 6','1 7','1 8','1 9','1 10']
// const input = ['10','5 10','5 9','5 8','5 7','5 6','5 10','5 9','5 8','5 7','5 6']
const input = ['10','5 50','4 40','3 30','2 20','1 10','1 10','2 20','3 30','4 40','5 50'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const schedule = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

const solution = () =>{
    
    let dp = Array(N+1).fill(0);
    for(let days=N-1; days>=0; days--){
        const [day,pay] = schedule[days];
        dp[days] = Math.max(dp[days+1],day+days > N ? 0 : pay+dp[day+days]); 
    }
    console.log(dp[0]);
}
solution();