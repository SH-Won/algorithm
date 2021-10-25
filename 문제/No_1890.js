const input = ['4','2 3 3 1','1 2 1 3','1 2 3 1','3 1 1 0'];
//const input = ['3','1 1 1','1 1 1','1 1 1']
//const input = ['1','0']

// const N = 100;
// const map = Array.from({length:N},()=>Array(100).fill(1));

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i) =>input[i+1].split(' ').map(Number));
const dy = [1,0];
const dx = [0,1];
let dp = Array.from({length:N},()=>Array(N).fill(BigInt(0)));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);

// const dfs = (y,x) =>{
//     if(y === N-1 && x===N-1){
//         return 1;
//     }
//     if(visited[y][x]) return dp[y][x];
//     if(map[y][x] === 0){
//         visited[y][x] = true;
//         return;
//     }

//     const dist = map[y][x];
//     for(let i=0; i<2; i++){
//         const [ny,nx] = [y+dy[i]*dist,x+dx[i]*dist];
//         if(!isValidPos(ny,nx)) continue;
//         dp[y][x] += dfs(ny,nx);
//     }

//     visited[y][x] = true;
//     return dp[y][x];
// }
dp[N-1][N-1] = 1
for(let y=N-1; y>=0; y--){
    for(let x=N-1; x>=0; x--){
        if(y === N-1 && x===N-1) continue;
        const dist = map[y][x];
        for(let i=0; i<2; i++){
           const [ny,nx] = [y+dy[i]*dist,x+dx[i]*dist];
           if(!isValidPos(ny,nx)) continue;
           dp[y][x]+=BigInt(dp[ny][nx]);
        }
    }
}

console.log(dp[0][0].toString())


