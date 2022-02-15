const input = ['8','11100110','11010010','10011010','11101100','01000111','00110001','11011000','11000111']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinChangeCount = (map) =>{
    const n = map.length;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const count = Array.from({length:n}, () => Array(n).fill(Infinity));
    count[0][0] = 0;
    let queue = [[0,0]];
    let min = Infinity;
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === n-1 && x === n-1) min = Math.min(min,count[y][x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
            if(map[ny][nx] === '1' && count[ny][nx] > count[y][x]){
                count[ny][nx] = count[y][x];
                queue.push([ny,nx]);
            }
            else if(map[ny][nx] === '0' && count[ny][nx] > count[y][x] + 1){
                count[ny][nx] = count[y][x] + 1;
                queue.push([ny,nx]);
            }
        }
    }
    return min;
}
const solution = input =>{
    const n = +input[0];
    const map = Array.from({length:n},(_,i) => input[i+1]);
    const answer = getMinChangeCount(map);
    console.log(answer);
}
solution(input);