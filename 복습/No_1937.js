const input =[
    '4',
    '14 9 12 10',
    '1 11 5 4',
    '7 15 2 13',
    '6 3 16 8'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input[0];
const bamboo = Array.from({length:n},(_,i)=>input[i+1].split(' ').map(num =>+num));
let dp = Array.from({length:n},()=>Array(n).fill(0));
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<n && x<n);
const dfs = (y,x)=>{

    if(dp[y][x]) return dp[y][x];

    [[1,0],[-1,0],[0,1],[0,-1]]
    .forEach(([my,mx])=>{
        const [ny,nx] = [y+my,x+mx];
        if(!isValidPos(ny,nx) || bamboo[ny][nx] <= bamboo[y][x]) return;
        dp[y][x] = Math.max(dp[y][x],dfs(ny,nx));

    })
    dp[y][x]++;

    return dp[y][x];

}
let max =0;
for(let i=0; i<n; i++){
    for(let j=0; j<n; j++){
        let cMax = dfs(i,j);
        cMax > max ? max = cMax : max;
    }
}
console.log(max);
