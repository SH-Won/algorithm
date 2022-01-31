// const input = ['4 5 1','1 2','1 3','1 4','2 4','3 4'];
// const input = ['5 5 3','5 4','5 2','1 2','3 4','3 1'];
// const input = ['1000 1 1000','999 1000']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dfs = (edge,V) =>{
    let answer = "";
    let visited = Array(edge.length).fill(false);
    
    const visit = (node) =>{
        answer +=`${node} `;
        visited[node] = true;
        if(!edge[node].length) return;
        for(let i=0; i<edge[node].length; i++){
            const nextNode = edge[node][i];
            if(!visited[nextNode]){
                visit(nextNode);
            }
        }
    }
    visit(V);
    return answer.trim();
} 
const bfs = (edge,V) =>{
    let answer = '';
    let visited = Array(edge.length).fill(false);
    let queue = [V];
    visited[V] = true;
    while(queue.length){
        const node = queue.shift();
        answer+=`${node} `;
        for(let i=0; i<edge[node].length; i++){
            const nextNode = edge[node][i];
            if(visited[nextNode]) continue;
            visited[nextNode] = true;
            queue.push(nextNode);
        }
    }
    return answer.trim();
}
const solution = (input) =>{
    const [N,M,V] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<=M; i++){
        const [from,to] = input[i].split(' ').map(Number);
        edge[from].push(to);
        edge[to].push(from);
    }
    edge.forEach(node => node.sort((a,b) => a-b));
    console.log(`${dfs(edge,V)}\n${bfs(edge,V)}`)
}
solution(input);
