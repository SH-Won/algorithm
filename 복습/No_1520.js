// const input =[
//     '4 5',
// '50 45 37 32 30',
// '35 50 40 20 25',
// '30 30 25 17 28',
// '27 24 22 15 10',
// ]
const input =[
    '4 4',
    '16 9 8 1',
    '15 10 7 2',
    '14 11 6 3',
    '13 12 5 4'
]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,N] = input[0].split(' ').map(num =>+num);
const map = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(num =>+num));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<M && x<N);
let visited = Array.from({length:M},()=>Array(N).fill(false));
let dp = Array.from({length:M},()=>Array(N).fill(0));
const getPathNumber = (y,x) =>{
    
    
    if(visited[y][x]) return dp[y][x];
    if(y === M-1 && x=== N-1){
        return 1;
    }

    [[1,0],[-1,0],[0,1],[0,-1]]
    .forEach(([my,mx])=>{
        const [ny,nx] = [y+my,x+mx];
        if(!isValidPos(ny,nx)) return;
        if(map[y][x] > map[ny][nx])
        dp[y][x] += getPathNumber(ny,nx);
    })
    visited[y][x] = true;

    return dp[y][x]

}
const answer = getPathNumber(0,0);
console.log(answer);