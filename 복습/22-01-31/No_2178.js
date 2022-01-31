const input = ['4 6','110110','110110','111111','111101']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
    let count = Array.from({length:N},()=>Array(M).fill(Infinity));
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    count[0][0] = 1;
    let queue = [[0,0]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === N-1 && x === M-1) return console.log(count[y][x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] ==='0' || count[ny][nx] <= count[y][x] + 1) continue;
            count[ny][nx] = count[y][x] + 1;
            queue.push([ny,nx]);
        }
    }
}
solution(input);