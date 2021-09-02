// const input =[
//     '4',
//     '14 9 12 10',
//     '1 11 5 4',
//     '7 15 2 13',
//     '6 3 16 8'
// ]
const input =[
    '2',
    '2 2',
    '2 2'

]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input[0];
const bamboo = Array.from({length:n},(_,i)=>input[i+1].split(' ').map(num=>+num));
let dp =Array.from({length:n},()=>Array(n).fill(0));
let visited = Array.from({length:n},()=>Array(n).fill(false));

const isValidPos =(y,x) =>(y>=0 && x>=0 && y<n && x<n);

for(let i=0; i<n; i++){
    for(let j=0; j<n; j++){
        visited[i][j] = true;
        dfs(i,j);
        visited[i][j] = false;
    }
}
let answer = 0;
for(let i=0; i<dp.length; i++){
    let max = Math.max(...dp[i]);
    max > answer ? answer=max : answer;
}
console.log(answer);
function dfs(y,x){
    
    if(dp[y][x]){
        return dp[y][x];
    }
     [[1,0],[-1,0],[0,1],[0,-1]]
     .forEach(([my,mx])=>{
         const [ny,nx] = [y+my,x+mx];
         if(!isValidPos(ny,nx) || visited[ny][nx] || bamboo[ny][nx] <= bamboo[y][x] ) return;
         visited[ny][nx] =true;
         dp[y][x] = Math.max(dp[y][x],dfs(ny,nx));
         visited[ny][nx] =false;
     })
     dp[y][x]++;

     return dp[y][x];
}