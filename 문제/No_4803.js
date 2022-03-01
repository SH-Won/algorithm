const input = ['6 3','1 2','2 3','3 4','6 5','1 2','2 3','3 4','4 5','5 6','6 6','1 2','2 3','1 3','4 5','5 6','6 4','0 0']
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const isTree = (start,edge,visited) =>{
    visited[start] = 1;
    if(edge[start].length === 0) return true;
    let queue = [start];
    let isCycle = false;
    while(queue.length){
        const cur = queue.shift();
        for(let i=0; i<edge[cur].length; i++){
            const next = edge[cur][i];
            if(visited[next] === false){
                visited[next] = visited[cur] === 1 ? 2 : 1;
                queue.push(next);
            }
            else if(visited[next] === visited[cur]) isCycle = true;
        }
    }
    return isCycle ? false : true;
}
const solution = input =>{
    let idx = 0;
    let answer = '';
    let caseNumber = 1;
    while(true){
        let [n,m] = input[idx++].split(' ').map(Number);
        if(n === 0 && m === 0) return console.log(answer.trim());
        const visited = Array(n+1).fill(false);
        const edge = Array.from({length:n+1},()=>[]);
        while(m--){
            const [from,to] = input[idx++].split(' ').map(Number);
            edge[from].push(to);
            edge[to].push(from);
        }
        let tree = 0;
        for(let i=1; i<=n; i++){
            if(visited[i] === false){
               if(isTree(i,edge,visited)){
                   tree++;
               }
            }
        }
        if(tree === 0) answer+=`Case ${caseNumber++}: No trees.\n`;
        if(tree === 1) answer+=`Case ${caseNumber++}: There is one tree.\n`;
        if(tree >= 2) answer+=`Case ${caseNumber++}: A forest of ${tree} trees.\n`;
    }
}
solution(input);

