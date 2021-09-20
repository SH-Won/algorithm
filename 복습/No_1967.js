const input =['12','1 2 3','1 3 2','2 4 5','3 5 11','3 6 9','4 7 1','4 8 7','5 9 15','5 10 4','6 11 6','6 12 10'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input[0];
let tree = Array.from({length:n+1},()=>[]);
for(let i=1; i<n; i++){
    const [from,to,distance] = input[i].split(' ').map(num =>+num);
    tree[from].push([to,distance])
    tree[to].push([from,distance]);
}
const bfs = (start) =>{
    let visited = Array(n+1).fill(false);
    let queue = [[start,0]];
    let max = {node:null,distance:null};
    while(queue.length){
        const [cNode,dist] = queue.shift();
        if(dist > max.distance){
            max.node = cNode;
            max.distance = dist;
        }
        visited[cNode] = true;
        
        for(let i=0; i<tree[cNode].length; i++){
            const [to,distance] = tree[cNode][i];
            if(visited[to]) continue;
            queue.push([to,dist+distance])
        }
    }
    return max;
}
const answer = bfs(bfs(1).node).distance;
console.log(answer);
