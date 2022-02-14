// const input = ['3 3','011','111','110'];
// const input = ['4 2','0001','1000']
const input = ['6 6','001111','010000','001111','110001','011010','100010']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bfs = (map) =>{
    const [N,M] = [map.length, map[0].length]
    const count = Array.from({length:N},()=>Array(M).fill(Infinity));
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    count[0][0] = 0;
    let queue = [[0,0]];
    let min = Infinity;
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === N-1 && x === M-1) min = Math.min(min , count[y][x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
            if(map[ny][nx] === '0' && count[ny][nx] > count[y][x]){
                count[ny][nx] = count[y][x];
                queue.push([ny,nx]);
            }
            else if(count[ny][nx] > count[y][x] + 1){
                count[ny][nx] = count[y][x] + 1;
                queue.push([ny,nx]);
            }
        }
    }
    return min;
}
const solution = input =>{
    const map = input.slice(1);
    console.log(bfs(map));
}
solution(input);

