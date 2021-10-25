const input =[
    '4 5',
'50 45 37 32 30',
'35 50 40 20 25',
'30 30 25 17 28',
'27 24 22 15 10',
]
// const input =[
//     '4 4',
//     '16 9 8 1',
//     '15 10 7 2',
//     '14 11 6 3',
//     '13 12 5 4'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,N] = input[0].split(' ').map(Number);
const map = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(Number));
let dp = Array.from({length:M},()=>Array(N).fill(0));
let visited = Array.from({length:M},()=>Array(N).fill(false));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<M && x<N);
const dfs = (y,x) =>{
    if(y===M-1 && x===N-1) return 1;
    if(visited[y][x]) return dp[y][x];
   
    for(let i=0; i<4; i++){
        const [ny,nx]=[y+dy[i],x+dx[i]];
        if(!isValidPos(ny,nx) || map[y][x] <= map[ny][nx]) continue;
        dp[y][x] += dfs(ny,nx);
    }
    visited[y][x] = true;
    return dp[y][x];
}
const answer = dfs(0,0);
console.log(answer);