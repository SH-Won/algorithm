const input = ['7','6','1 2','2 3','1 5','5 2','5 6','4 7']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    const N = +input[0];
    const M = +input[1];
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=2; i<=M+1; i++){
        const [from,to] = input[i].split(' ').map(Number);
        edge[from].push(to);
        edge[to].push(from);
    }
    let answer = -1;
    let visited = Array(N+1).fill(false);
    visited[1] = true;
    const dfs = (node) =>{
       answer++;
       for(let i=0; i<edge[node].length; i++){
           const nextNode = edge[node][i];
           if(visited[nextNode]) continue;
           visited[nextNode] = true;
           dfs(nextNode);
       }
    }
    dfs(1);
    console.log(answer);
}
solution(input);