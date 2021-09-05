const input = ['5','2 1 1 1 2','1 5']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const bridge = input[1].split(' ').map(num =>+num);
const [start,end] = input[2].split(' ').map(num => +num - 1);

const bfs = (start) =>{
    let visited = Array(N).fill(false);
    let queue = [[start,0]];
    visited[start] = true;
    while(queue.length){
        const [cPos,jump] = queue.shift();
        if(cPos === end){
            return jump;
        }
        if(bridge[cPos] === 1) return jump+1;
        for(let i=cPos-bridge[cPos]; i>=0; i-=bridge[cPos]){
            
            if(i===end) return jump+1
            if(!visited[i]){
                visited[i] = true;
                queue.push([i,jump+1]);
            }
            
        }
        for(let i=cPos+bridge[cPos]; i<=bridge.length; i+=bridge[cPos]){
            
            if(i===end) return jump+1
            if(!visited[i]){
                visited[i] = true;
                queue.push([i,jump+1]);
            }
            
        }
        console.log(queue);
    }
    return -1
}
const answer = bfs(start);
console.log(answer);