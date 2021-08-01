const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input=[
//     '2','3 2','1 3','2 3','4 4','1 2','2 3','3 4','4 2'
// ]
let inputIndex = 0;
let T = +input[inputIndex++];

while(T--){
    const [V,E] = input[inputIndex++].split(' ').map(num =>+num);
    const line = Array.from({length:E},()=> input[inputIndex++].split(' ').map(num =>+num));
    let visited = Array(V+1).fill(0);
    let graph = Array.from({length:V+1},()=>[]);
   
    for(let i=0; i<line.length; i++){
        makeGraph(line[i][0],line[i][1])
        makeGraph(line[i][1],line[i][0])
    }
    
    let isBipartite =true;
    for(let i=1; i<=V; i++){
        if(visited[i] === 0){
            bfs(i);
        }
        
    }
    
    loop1:for(let i=1; i<=V; i++){
        for(let j=0; j<graph[i].length; j++){
        if(visited[i] === visited[graph[i][j]]){
            console.log("NO");
            isBipartite =false;
            break loop1;
        }
        }
    }
    if(isBipartite) console.log("YES");
    
    

    function bfs(start){
        let queue = [start];
        visited[start] = 1;
        
        while(queue.length){
         const cur = queue.shift();
         
         

          for(let i=0; i<graph[cur].length; i++){
              const next = graph[cur][i];

              if(!visited[next]){
                 visited[next] = visited[cur] === 1 ? 2:1;  
                  queue.push(next);
              }
              else if(visited[cur] === visited[next]){
                  return;
              }
              
            
         }
    }
    
    }

    function makeGraph(num1,num2){
        let index;
        for(index=0; index<graph[num1].length; index++){

            if(graph[num1][index] < num2) continue;

            if(graph[num1][index] === num2){
                index=null;
                break;
            }
            break;
        }
        if(index !==null){
            graph[num1].splice(index,0,num2);
        }
    }
    
    
    
}