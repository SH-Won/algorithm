//const input = ['3 7','3942178','1234567','9123532']
//const input =['1 10','2H3HH4HHH5']
//const input =['4 4','3994','9999','9999','2924']
//const input = ['4 6','123456','234567','345678','456789']
//const input =['1 1','9']
//const input = ['3 7','2H9HH11','HHHHH11','9HHHH11']
//const input =['4 4','3HH2','H1HH','H2H1','2219'] //ans 8

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const board = Array.from({length:N},(_,i)=>input[i+1].split(''));
let count = Array.from({length:N},()=>Array(M).fill(0));
let visited = Array.from({length:N},()=>Array(M).fill(false));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);

const solution = (y,x) =>{
    let maxCount = 0;
    visited[y][x] = true;
    const dfs = (y,x,curCount) =>{
         count[y][x] = curCount;
         if(curCount > maxCount) maxCount = curCount;
         const dist = +board[y][x];
         const distance = [[dist,0],[-dist,0],[0,dist],[0,-dist]];

         for(let i=0; i<distance.length; i++){
             const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
             if(!isValidPos(ny,nx) || board[ny][nx] ==='H' || count[ny][nx] > curCount) continue;
             if(visited[ny][nx]) process.exit(console.log(-1));
             if(!visited[ny][nx]){
                 visited[ny][nx] = true;
                 dfs(ny,nx,curCount+1);
                 visited[ny][nx] = false;
             }
         }
    
   }
   dfs(y,x,1);
   return console.log(maxCount);
}
solution(0,0);