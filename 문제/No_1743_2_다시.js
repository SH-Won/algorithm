//const input = ['3 4 5','3 2','2 2','3 1','2 3','1 1'];
//const input =['3 4 6','1 1','1 4','2 2','2 3','3 2','3 3']


const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K]= input[0].split(' ').map(num => +num);

const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const distance = [[1,0],[-1,0],[0,1],[0,-1]];
let garbage = Array.from({length:N},()=>Array(M).fill(0));
//let visited = Array.from({length:N},()=>Array(M).fill(false));
const gPos = Array.from({length:K},(_,i)=>input[i+1].split(' ').map(num =>+num));
for(let i=0; i<gPos.length; i++){
    const [gy,gx] = gPos[i];
    garbage[gy-1][gx-1] = 1;
}
//console.log(garbage);
let answer = 0;
let cnt ;
for(let i=0; i<gPos.length; i++){
    cnt = 1;
    dfs(gPos[i][0]-1,gPos[i][1]-1)
    cnt > answer ?  answer=cnt : answer;
}
console.log(answer);
function dfs(y,x){
    //console.log(y,x);
    garbage[y][x] = 0;

    for(let i=0; i<distance.length; i++){     
        const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
        if(!isValidPos(ny,nx) || !garbage[ny][nx] ) continue;
        dfs(ny,nx)
        cnt++;
       
    }

}