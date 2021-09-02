//const input =['5','1 3 2 -1','2 4 4 -1','3 1 2 4 3 -1','4 2 4 3 3 5 6 -1','5 4 6 -1']
// 어느 한 정점을 정해서 거기서 더이상 갈수 없는 정점까지의
// 최대 거리를 구한다. 그리고 그 정점에서 다시 최대로 갈수 있는 거리를 구한다.
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const V = +input[0];
let tree = Array.from({length:V+1},()=>[]);

for(let i=1; i<=V; i++){
    const info = input[i].split(' ').map(num =>+num);
    const current = info[0];
    let j=1;
    while(info[j] !==-1){
        const [next,distance] = [info[j],info[j+1]];
        tree[current].push({next,distance});
        
        j+=2;
    }
}

const bfs = (start) =>{
    let visited = Array(V+1).fill(false);
    let queue = [[start,0]];
    let max = {node:0 , distance:0};

    while(queue.length){
        const [cNode,cDist]= queue.shift();
        visited[cNode]= true;

        if(cDist > max.distance){
            max.node = cNode;
            max.distance=cDist;
        }

        for(let i=0; i<tree[cNode].length; i++){
            const {next,distance} = tree[cNode][i];
            if(visited[next]) continue;

            queue.push([next,cDist+distance]);
        }
    }
    return max;
}
console.log(bfs(bfs(1).node).distance);