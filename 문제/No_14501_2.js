//const input = ['7','3 10','5 20','1 10','1 20','2 15','4 40','2 200']
//const input =['10','1 1','1 2','1 3','1 4','1 5','1 6','1 7','1 8','1 9','1 10']
//const input =['10','5 10','5 9','5 8','5 7','5 6','5 10','5 9','5 8','5 7','5 6']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const schedule = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));

let dp =Array(N)

// 백준이가 일을 할수 있는경우는 첫째날을 일하고 다음 상담을계속 하거나,
// 첫째날은 일을하지않고 둘째날 일하고 둘째날 다음 상담을 계속하는 경우 두가지가있다.

console.log(maxEarn(0));
function maxEarn(days){
    if(days >= N) return 0;

    if(dp[days] !== undefined){
        return dp[days];
    }
    const [time,pay] = schedule[days];
    dp[days] = Math.max( maxEarn(days+1),
    days+time <= N ? pay+maxEarn(days+time) : maxEarn(days+time))

    return dp[days];
    
}
