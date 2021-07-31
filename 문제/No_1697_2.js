const fs = require('fs');
const [N,K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);
// const [N,K]= [5,17];
let visited = Array(100,001).fill(false);
let time = bfs(N);
console.log(time);
function bfs(N){
    let time = 0;
    
    let queue = [[N,time]];

    while(queue.length){
          const [curPos,time] =queue.shift();
          if(curPos === K) return time;

          for(next of [curPos+1,curPos-1,curPos*2]){
              if(!visited[next] && next >=0 && next <=100000){
                  visited[next] =true;
                  queue.push([next,time+1])
              }
          }
        
    }
}
