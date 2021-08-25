const input = ['3 4 5','3 2','2 2','3 1','2 3','1 1']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K]= input[0].split(' ').map(num => +num);
let garbage = Array.from({length:N},()=>Array(M).fill(0));

for(let i=1; i<=K; i++){
    const [gy,gx] = input[i].split(' ').map(num => +num);
    garbage[gy-1][gx-1] = 1;
}

let answer = 1;

for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){
        if(garbage[i][j]){
            let count = bfs([i,j]);
            count > answer ? answer=count : answer;
        }
    }
}


console.log(answer);
function bfs(start){
    let queue = [start];
    let count =1;
    let startIndex = 0;
    let endIndex;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]]
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    while(startIndex !== queue.length){
        endIndex =queue.length;
        for(let i=startIndex; i<endIndex; i++){
        const [cy,cx] = queue[i]
        garbage[cy][cx] = 0;

        distance.forEach(([y,x])=>{
            const [ny,nx] = [cy+y,cx+x];
            if(!isValidPos(ny,nx) || !garbage[ny][nx]) return;
            queue.push([ny,nx]);
            
            count++;
        })
     }
        startIndex =endIndex;

    }

    return count;
}