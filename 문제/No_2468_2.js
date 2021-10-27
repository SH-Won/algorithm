//const input = ['5','6 8 2 6 2','3 2 3 4 6','6 7 3 3 2','7 2 5 3 6','8 9 5 2 7'];
const input =[
    "7",
"9 9 9 9 9 9 9",
"9 2 1 2 1 2 9",
"9 1 8 7 8 1 9",
"9 2 7 9 7 2 9",
"9 1 8 7 8 1 9",
"9 2 1 2 1 2 9",
"9 9 9 9 9 9 9",
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);

const bfs = (y,x,rain) => {
    visited[y][x] = true;
    let queue = [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i], cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] <= rain) continue;
            visited[ny][nx] = true;
            queue.push([ny,nx]);
        }
    }

}

const solution = () =>{
    let maxRain = 0;
    for(let i=0; i<N; i++){
        maxRain = Math.max(maxRain, ...map[i]);
    }
    let maxSafety = 0;
    for(let rain=0; rain<maxRain; rain++){
        let safety = 0;
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(!visited[y][x] && map[y][x] > rain){
                    bfs(y,x,rain);
                    safety++;
                }
            }
        }
        maxSafety = Math.max(safety,maxSafety);
        visited.forEach(row => row.fill(false));
    }
    console.log(maxSafety);
}
solution();