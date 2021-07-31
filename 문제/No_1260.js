const fs = require('fs');
const input =fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '4 5 1',
//     '1 2',
//     '1 3','1 4','2 4','3 4'
// ]

const [N,M,V] =input[0].split(' ').map(num=>+num);
const arr = Array.from({length:M},(_,i) => input[i+1].split(' ').map(num => +num));
let graph = Array.from({length:N+1},()=> []);
let result =[];
let visited = Array(N+1).fill(false);
for(let i=0; i<arr.length; i++){
    insertGrape(arr[i][0],arr[i][1]);
    insertGrape(arr[i][1],arr[i][0]);
}
//console.log(graph);
dfs(V);
console.log(result.join(' ').trim());
result=[];
visited.fill(false);
console.log(graph);
bfs(V);

console.log(result.join(' ').trim());

function bfs(V){
    let v;
    let willVisted = [V];
    while(willVisted.length > 0){
          v = willVisted.shift();
          
          
          if(visited[v]){
             continue; 
          }
          visited[v] =true;
          result.push(v);
          for(let i=0; i<graph[v].length; i++){
                if(!visited[graph[v][i]])
                willVisted.push(graph[v][i]);
        }
         
    }
}

function dfs(V){
    if(visited[V]) return;

    visited[V]=true;
    result.push(V);
    for(let i=0; i<graph[V].length; i++){
        dfs(graph[V][i])
    }
    
}



function insertGrape(num1,num2){
    let index;
    for(index=0; index<graph[num1].length; index++){
          if(num2 > graph[num1][index]){
              continue;
          }
          if(num2 === graph[num1][index]){
              index =null;
          }
          break;
        
    }
    if(index !==null){
        graph[num1].splice(index,0,num2)
    }

}