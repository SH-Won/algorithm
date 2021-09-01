const input =['12','1 2 3','1 3 2','2 4 5','3 5 11','3 6 9','4 7 1','4 8 7','5 9 15','5 10 4','6 11 6','6 12 10'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n  = +input[0];
let visited = Array(n+1).fill(false);
let node = Array.from({length:n+1},()=>[]);
let lastChild = [];
for(let i=1; i<n; i++){
    const [from,to,distance] = input[i].split(' ').map(num => +num);
    node[from].push({to,distance});
    node[to].push({to:from,distance})
}

for(let i=2; i<node.length; i++){
    if(node[i].length === 1) lastChild.push(i);
}

let maxDistance = 0;

for(let i=0; i<lastChild.length; i++){
      visited[lastChild[i]] = true;
      dfs(lastChild[i],0);
      visited[lastChild[i]] = false;
}

console.log(maxDistance);

function dfs(curNode,curDistance){
    
    if(lastChild.includes(curNode) && curDistance !==0){
        return maxDistance = Math.max(maxDistance,curDistance);
    }
    
   
    for(let i=0; i<node[curNode].length; i++){
        
        const {to,distance}  = node[curNode][i];
        
        if(!visited[to]){
            
            visited[to] = true;
            dfs(to,curDistance+distance);
            visited[to] = false;
        }
    }
    
    
        
}