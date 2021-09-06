//const input =['7','1 6','6 3','3 5','4 1','2 4','4 7']
//const input =['12','1 2','1 3','2 4','3 5','3 6','4 7','4 8','5 9','5 10','6 11','6 12']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const N = +input[0]
let tree = Array.from({length:N+1},()=>[]);
let visited = Array(N+1).fill(false);
for(let i=1; i<N; i++){
    const [from,to] = input[i].split(' ').map(num =>+num);
    tree[from].push(to);
    tree[to].push(from);
}

let relationShip = Array(N+1).fill(0);
//console.log(tree);
// const dfs =(parentNode) =>{

//     visited[parentNode] = true;
//     for(let i=0; i<tree[parentNode].length; i++){

//         const childNode = tree[parentNode][i];
//         if(!visited[childNode]){
//             relationShip[childNode] = parentNode;
//             dfs(childNode);
//         }  
//     }

// }
// dfs(1);
const bfs = (parentNode) =>{
    let queue=[parentNode]
    
    while(queue.length){
        const parentNode = queue.shift();
        visited[parentNode] = true;
        for(let i=0; i<tree[parentNode].length; i++){
            const childNode = tree[parentNode][i];
            if(!visited[childNode]){
                relationShip[childNode] = parentNode;
                queue.push(childNode);
            }
        }
    }
}
bfs(1);

console.log(relationShip.slice(2).join('\n').trim());