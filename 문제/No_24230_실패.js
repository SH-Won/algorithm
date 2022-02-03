// const input = ['7','0 0 2 0 1 2 2','1 2','1 3','1 4','2 5','3 6','3 7']
const input = ['10','0 0 1 0 2 1 0 2 2 2','3 1','1 4','9 5','10 5','1 2','3 6','3 5','5 8','4 7']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const paint = (parent,color,nodeState,edge) =>{
     nodeState[parent] = color;
     let queue = [parent];
     while(queue.length){
         const node = queue.shift();
         for(let i=0; i<edge[node].length; i++){
             const child = edge[node][i];
             queue.push(child);
             nodeState[child] = color;
         }
     }
}
const solution = input =>{
    const N = +input[0];
    const colors = input[1].split(' ').map(Number);
    let nodeState = Array(N+1).fill(0);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=2; i<2+N-1; i++){
        const [parent,child] = input[i].split(' ').map(Number);
        if(parent < child) edge[parent].push(child);
        else edge[child].push(parent);
    }

    let answer = 0;
    for(let node=1; node<=N; node++){
        const color = colors[node-1];
        if(color === 0 || nodeState[node] === color){
            continue;
        }
        paint(node,color,nodeState,edge);
        answer++;
    }
    console.log(nodeState.slice(1));
    console.log(colors);
    console.log(answer);
}
solution(input);