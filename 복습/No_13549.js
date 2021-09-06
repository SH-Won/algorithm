const [subin,sister] = [5,17];
//const fs = require('fs');
//const [subin,sister] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);
let visited = Array(100001).fill(false);
const bfs = (subin) =>{
    
    visited[subin] =true;
    let queue = [[subin,0]];
    while(queue.length){
        const [cPos,time] = queue.shift();
        if(cPos ===sister){
            return console.log(time);
        }
        [cPos+1,cPos-1,cPos*2]
        .forEach(nPos =>{
            if(nPos <0 || nPos >100000 || visited[nPos]) return;
            
            if(nPos === cPos*2){
                visited[nPos] =true;
                queue.unshift([nPos,time]);
            }
            else{
                visited[nPos] =true;
                queue.push([nPos,time+1]);
            }
        })
    }
}
// const answer = bfs(subin);
// console.log(answer);
bfs(subin);