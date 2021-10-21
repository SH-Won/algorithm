// const input = ['3 5','16661','61116','16661'];
// const input = ['4 6','999999','955119','955119','999999']
// const input = ['5 9','111111111','115111611','131516161','115111611','111111111'];
// const input = [
// '9 13',
// '1111111111111',
// '1555555555551',
// '1511111111151',
// '1511199911151',
// '1511192911151',
// '1511199911151',
// '1511111111151',
// '1555555555551',
// '1111111111111'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split('').map(Number));
let water = Array.from({length:N},()=>Array(M).fill(0));
let maxHeight = 0;
let minHeight = 10;
for(let i=0; i<N; i++){
    maxHeight = Math.max(maxHeight,...map[i]);
    minHeight = Math.min(minHeight,...map[i]);
}
for(let i=1; i<N-1; i++){
    for(let j=1; j<M-1; j++){
        water[i][j] = maxHeight - map[i][j];
    }
}
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
let visited = Array.from({length:N},()=>Array(M).fill(false));
const isValidPos = (y,x) => (y>=1 && x>=1 && y<N-1 && x<M-1);
const bfs = (y,x,height) =>{
    visited[y][x] = true;
    let queue = [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        water[cy][cx]--;
        for(let dir=0; dir<4; dir++){
            const [ny,nx] = [cy+dy[dir],cx+dx[dir]];
            if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
            if(map[ny][nx] + water[ny][nx] === height && water[ny][nx] > 0){
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
    }
}

const solution = () =>{
    let answer = 0;
    for(let h=maxHeight; h>minHeight; h--){
        visited.forEach(row => row.fill(false));
        for(let y=1; y<N-1; y++){
            for(let x=1; x<M-1; x++){
                if(water[y][x] > 0 && !visited[y][x]){
                    for(let dir=0; dir<4; dir++){
                        const [ny,nx] = [y+dy[dir],x+dx[dir]];
                        if(map[ny][nx]+water[ny][nx] < map[y][x] +water[y][x]){
                            bfs(y,x,h);
                            break;
                        }
                    }
                }
            }
        }
    }
    
    for(let y=1; y<N-1; y++){
        for(let x=1; x<M-1; x++){
            answer+=water[y][x];
        }
    }
    console.log(answer);
}
solution();