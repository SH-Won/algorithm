const input = ['7','6','1 2','2 3','1 5','5 2','5 6','4 7'];

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const K = +input[1];
const computer = Array.from({length:K},(_,i)=>input[i+2].split(' ').map(num => +num));
let visited = Array(N+1).fill(false);
let network = Array.from({length:N+1},()=>[])
for(let i=0; i<computer.length; i++){
    network[computer[i][0]].push(computer[i][1])
    network[computer[i][1]].push(computer[i][0])
}

let count =0;
dfs(1);
console.log(count);
function dfs(start){
    visited[start]=true;

    for(let i=0; i<network[start].length; i++){
        if(!visited[network[start][i]]){
            dfs(network[start][i])
            count++;
        }
    }
}
