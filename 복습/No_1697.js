const fs = require('fs');
const [N,K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num =>+num);
// const [N,K] = [5,17];
let visited = Array(100001).fill(0);
console.log(bfs(N));
function bfs(start){    
    let time = 0;
    let queue = [[start,time]];
    visited[start] =1;
    
    while(queue.length){
        const [position,time] = queue.shift();
        
        if(position === K){ 
            return time;
            
        }
        
        [position+1,position-1,position*2]
        .forEach( pos =>{
           if(pos <0 || pos >=100001) return;
           if(!visited[pos]){
               queue.push([pos,time+1]);
               visited[pos]=1;
           } 
           
        })
        
    }
    
}