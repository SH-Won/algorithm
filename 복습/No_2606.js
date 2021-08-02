const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '7','6','1 2','2 3','1 5','5 2','5 6','4 7'
// ]
const comN = +input[0];
const line = +input[1];
const netWork = Array.from({length:line},(_,i) => input[i+2].split(' ').map(num => +num));
let graph = Array.from({length:comN+1},()=>[]);
let visited = Array(comN+1).fill(0);
for(let i=0; i<netWork.length; i++){
    makeGraph(netWork[i][0],netWork[i][1]);
    makeGraph(netWork[i][1],netWork[i][0]);
}



console.log(bfs(1));

function bfs(start){
    let queue = [start];
    visited[start] = 1;
    let count =-1;
    while(queue.length){
        const cur = queue.shift();
        for(let i=0; i<graph[cur].length; i++){
            const next = graph[cur][i];
            if(!visited[next]){
                queue.push(next);
                visited[next]=1;
            }
        }
        count++;
        
    }
    return count;
}

function dfs(start){

    if(visited[start]) return;
    visited[start] = 1;
    count++;
    
    for(let i=0; i<graph[start].length; i++){

        dfs(graph[start][i])
        
    }
}


function makeGraph(num1,num2){
    let index;
    for(index=0; index<graph[num1].length; index++){
        if(graph[num1][index] < num2 ) continue;
        if(graph[num1][index] ===num2){
            index = null;
            break;
        }
        break;

    }
    if(index !== null){
        graph[num1].splice(index,0,num2);
    }

}