const input = ['5 7','WLLWWWL','LLLWLLL','LWLWLWW','LWLWLLL','WLLWLWW']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinTime = (map) =>{
    const [R,C] = [map.length ,map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    let time = Array.from({length:R},()=>Array(C).fill(-1));
    let max = 0;
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(map[y][x] === 'L'){
                let queue = [[y,x,0]];
                time[y][x] = 0;
                while(queue.length){
                    const [y,x] = queue.shift();
                    let isEnd = true;
                    for(let i=0; i<4; i++){
                        const [ny,nx] = [y+dy[i],x+dx[i]];
                        if(ny < 0 || nx < 0 || ny >= R || nx >= C || time[ny][nx] !==-1 || map[ny][nx] ==='W') continue;
                        isEnd = false;
                        queue.push([ny,nx]);
                        time[ny][nx] = time[y][x] + 1;
                    }
                    if(isEnd && time[y][x] > max) max = time[y][x];
                }
                time.forEach(row => row.fill(-1));
            }
        }
    }
    return max;
}
const solution = (input) =>{
    const [R,C] = input[0].split(' ').map(Number);
    const map = Array.from({length:R},(_,i)=> input[i+1].split(''));
    const minTime = getMinTime(map);
    console.log(minTime);
}
solution(input);