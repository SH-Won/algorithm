//const input = ['3 4 5','3 2','2 2','3 1','2 3','1 1']
const input =['3 4 6','1 1','1 4','2 2','2 3','3 2','3 3']


const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K]= input[0].split(' ').map(num => +num);
const gPos = Array.from({length:K}, (_,i)=>input[i+1].split(' ').map(num => +num));
let garbage = Array.from({length:N},()=>Array(M).fill(0));

for(let i=0; i<gPos.length; i++){  
    garbage[gPos[i][0]-1][gPos[i][1]-1] = 1;
}
//console.log(garbage.join('\n'));
let answer = 0;
let cnt ;
for(let i=0; i<gPos.length; i++){
    cnt = bfs([gPos[i][0]-1,gPos[i][1]-1])
    cnt > answer ? answer=cnt : answer;
}


console.log(answer);
function bfs(start){
    let queue = [start];
    let count =1;
    garbage[start[0]][start[1]] = 0;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]]
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    while(queue.length){
       
        const [cy,cx] = queue.shift();
        
        distance.forEach(([y,x])=>{
            const [ny,nx] = [cy+y,cx+x];
            if(!isValidPos(ny,nx) || !garbage[ny][nx]) return;
            queue.push([ny,nx]);
            garbage[ny][nx] =0;
            count++;
        })
     }
      

    

    return count;
}