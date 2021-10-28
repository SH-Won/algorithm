// const input = [
// '2',
// 'P.',
// '.K',
// '2 1',
// '3 2'
// ]
const input = [
    '3',
    'P..',
    '.KK',
    '...',
    '3 2 4',
    '7 4 2',
    '2 3 1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const height = Array.from({length:N},(_,i)=>input[i+N+1].split(' ').map(Number));
const dy= [-1,-1,-1,0,1,1,1,0];
const dx= [-1,0,1,1,1,0,-1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const bfs = (start,heightArray,house) =>{
    const [y,x] = start;
    let low =0 , high = 0;
    let min = Infinity;
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    while(high < heightArray.length){
        visited.forEach(row => row.fill(false));
        let count = 0;
        let queue = [];
        const current = height[y][x];
        if(current >=heightArray[low] && current <= heightArray[high]){
           visited[y][x] = true;
           queue.push([y,x]);
        }
        while(queue.length){
            const [cy,cx] = queue.shift();
            if(map[cy][cx] === 'K') count++;
            for(let i=0; i<8; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
                const next = height[ny][nx];
                if(next >= heightArray[low] && next <= heightArray[high]){
                    visited[ny][nx] = true;
                    queue.push([ny,nx]);
                }
            }
        }
        if(count === house){
           min = Math.min(heightArray[high] - heightArray[low] , min);
           low++;
        }
        else if(high + 1 < heightArray.length) high++;
        else break;
    }
    return min;
}

const solution = () =>{
    let house = 0;
    let start ;
    let heightArray = new Set();
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] ==='P') start =[y,x];
            else if(map[y][x] ==='K') house++;
        }
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            heightArray.add(height[y][x]);
        }
    }
    heightArray = Array.from(heightArray).sort((a,b)=>a-b);
    const answer = bfs(start,heightArray,house);
    console.log(answer);
}
solution();