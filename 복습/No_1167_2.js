const input =['5','1 3 2 -1','2 4 4 -1','3 1 2 4 3 -1','4 2 4 3 3 5 6 -1','5 4 6 -1'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const V = +input[0];
const edge = Array.from({length:V+1},()=>[]);
for(let i=1; i<=V; i++){
    const info = input[i].split(' ').map(Number);
    let j = 1;
    while(info[j] !== -1){
        const [from,to,distance] = [info[0],info[j],info[j+1]];
        edge[from].push({to,distance});
        j+=2;
    }
}

const solution = () =>{
    
    const bfs = (node) =>{
        let visited = Array(V+1).fill(false);
        visited[node] = true;
        let queue = [[node,0]];
        let max = {
            node:null,
            distance:null,
        }
        while(queue.length){
            const [cNode,dist] = queue.shift();
            if(dist > max.distance){
                max.node = cNode;
                max.distance = dist;
            }
            
            for(let i=0; i<edge[cNode].length; i++){
                const {to,distance} = edge[cNode][i];
                if(visited[to]) continue;
                visited[to] = true;
                queue.push([to,dist+distance]);
            }
        }
        return max;
    }
    const max = bfs(bfs(1).node).distance;
    return console.log(max);
}
solution();