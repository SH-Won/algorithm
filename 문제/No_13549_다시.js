//const [N,K]=[5,17]
// 길이가 100000 이면 unshift shift 써도 2초 안에 해결가능함
const fs = require('fs');
const [N,K] = fs.readFileSync('/dev/stdin','utf-8').toString().trim().split(' ').map(num => +num);
let visited = Array(100001).fill(false);
const bfs = (start) =>{
    let queue = [[start,0,0]];
    visited[start]=true;
    while(queue.length){
        const [cPos,time] = queue.shift();
        
        if(cPos === K) return time;

        [cPos+1,cPos-1,cPos*2].forEach(nPos =>{
          if(nPos <0 || nPos >100000 || visited[nPos]) return;

          visited[nPos] =true;
          if(nPos === cPos*2){
            queue.unshift([nPos,time]);
          }
          else{
            queue.push([nPos,time+1]);
          }
        })

        
    }
  
    


}

let answer = bfs(N);
console.log(answer);