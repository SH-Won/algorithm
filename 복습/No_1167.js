const input =['5','1 3 2 -1','2 4 4 -1','3 1 2 4 3 -1','4 2 4 3 3 5 6 -1','5 4 6 -1'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const V = +input[0];
let tree = Array.from({length:V+1},()=>[]);
for(let i=1; i<=V; i++){
    const info = input[i].split(' ').map(num =>+num); 
    const from = info[0];
    let j = 1;
    while(info[j] !==-1){
        const [to,distance] =[info[j],info[j+1]];
        tree[from].push({to,distance});
        
        j+=2;
    }
}

const bfs = (start) =>{
    let visited = Array(V+1).fill(false);
    visited[start] = true;
    let queue=[{from:start,dist:0}];
    let max ={ node:null,distance:null};
    while(queue.length){
        const {from,dist} = queue.shift();
        if(max.distance < dist){
            max.node = from;
            max.distance = dist;
        }

        for(let i=0; i<tree[from].length; i++){
            const {to,distance} = tree[from][i];
            if(visited[to]) continue;
            visited[to] = true;
            queue.push({from:to,dist:dist+distance})
        }
    }
    return max;
}
const answer = bfs(bfs(1).node).distance;
console.log(answer);