const input = ['3','3 2','1 3','2 3','4 4','1 2','2 3','3 4','4 2','4 4','1 2','2 3','3 4','4 1']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bfs = (start,edge,visited) =>{
    visited[start] = 1;
    let queue = [start];
    while(queue.length){
        const cur = queue.shift();
        for(let i=0; i<edge[cur].length; i++){
            const next = edge[cur][i];
            if(!visited[next]){
                visited[next] = visited[cur] === 1 ? 2 : 1;
                queue.push(next);
            }
            else if(visited[cur] === visited[next]) return false;
        }
    }
    return true;
}
const solution = input =>{
    let idx = 0;
    let answer = '';
    let K = +input[idx++];
    while(K--){
        let [V,E] = input[idx++].split(' ').map(Number);
        const visited = Array(V+1).fill(0);
        const edge = Array.from({length:V+1},()=>[]);
        while(E--){
            const [v1,v2] = input[idx++].split(' ').map(Number);
            edge[v1].push(v2);
            edge[v2].push(v1);
        }
        let isBipartite = false;
        for(let i=1; i<=V; i++){
            if(!visited[i]){
               isBipartite = bfs(i,edge,visited);
               if(!isBipartite) break;
            } 
        }
        if(isBipartite) answer +='YES\n';
        else answer +='NO\n';
    }
    console.log(answer.trim());
}
solution(input);