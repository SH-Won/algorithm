// 콜스택 초과
//const input = ['5 4','3 1','3 2','4 3','5 3']
//const input =['12 11','2 1','3 2','4 2','5 1','2 5','6 7','7 8','8 9','9 10','10 11','11 12'];
//const input =['6 5','1 2','2 3','3 1','4 5','5 6'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const network = Array.from({length:N+1},()=>[]);
let visited = Array(N+1).fill(false);
for(let i=0; i<M; i++){
    const [com1,com2] = input[i+1].split(' ').map(num =>+num);
    
    network[com2].push(com1);
}

let dp = Array(N+1).fill(0);
let max = 0;
let result=[0];
let answer =[];
for(let i=1; i<=N; i++){
    visited.fill(false);
    let temp = dfs(i);
    result.push(temp);
    temp > max ? max=temp : max
    
}

for(let i=1; i<result.length; i++){
     if(result[i] === max) answer.push(i);
}
console.log(answer.join(' '));


function dfs(computer){

    // if(dp[computer]) return dp[computer];
    if(visited[computer]) return 0;
    
    visited[computer] = true;
    dp[computer] = 1;
    for(let i=0; i<network[computer].length; i++){
        const nextComputer = network[computer][i];
        dp[computer] += dfs(nextComputer);
    }
    // dp[1] = 1+1+1+0;
    // dp[3] = 1+1+0
    // dp[2] = dfs(1);

    return dp[computer];
}