
//const input =['4 2','2 1 2','4 3 2','1 4 3','1 2','3 2'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let inputIndex = 0;
const [N,M] = input[inputIndex++].split(' ').map(num =>+num);
const node = Array.from({length:N-1},()=>input[inputIndex++].split(' ').map(num =>+num));
const findDistance = Array.from({length:M},()=>input[inputIndex++].split(' ').map(num => +num));
let tree = Array.from({length:N+1},()=>[]);
let visited =Array(N+1);
for(let i=0; i<node.length; i++){
    tree[node[i][0]].push({to :node[i][1], dist:node[i][2]});
    tree[node[i][1]].push({to:node[i][0], dist:node[i][2]})
    
}

let answer ="";
for(let i=0; i<findDistance.length; i++){
    visited.fill(0);
    dfs(findDistance[i][0],findDistance[i][1],0);
}
console.log(answer.trim());

function dfs(start,end,curDist){
    
    if(end === start){
         answer+=`${curDist}\n`;
         
         return;
    }
    visited[start] = true;
    for(let i=0; i<tree[start].length; i++){
        const {to,dist} = tree[start][i];
        
        const nextDist = dist+ curDist
       
        if(!visited[to])
           
        dfs(to,end,nextDist)
        
       

    }
}
 