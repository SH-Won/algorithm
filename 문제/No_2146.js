// const input = [
//     '10',
//     '1 1 1 0 0 0 0 1 1 1',
//     '1 1 1 1 0 0 0 0 1 1',
//     '1 0 1 1 0 0 0 0 1 1',
//     '0 0 1 1 1 0 0 0 0 1',
//     '0 0 0 1 0 0 0 0 0 1',
//     '0 0 0 0 0 0 0 0 0 1',
//     '0 0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 1 1 0 0 0 0',
//     '0 0 0 0 1 1 1 0 0 0',
//     '0 0 0 0 0 0 0 0 0 0'
//     ]
    const input = [
    '5',
    '1 0 0 0 1',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '1 1 0 0 1',
    ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const getMinLength = (island,dist) =>{
    const N = island.length;
    const queue = [];
    island.forEach((row,y) =>
          row.forEach((ground,x) =>{
              if(!ground) return;
              queue.push([y,x]);
          })
    )
    let min = Infinity;
    while(queue.length){
        const [y,x] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= N || island[y][x] === island[ny][nx]) continue;
            
            if(!island[ny][nx]){
                island[ny][nx] = island[y][x];
                dist[ny][nx] = dist[y][x] + 1;
                queue.push([ny,nx]);
            }
            else min = Math.min(dist[y][x]+dist[ny][nx] , min);
        }
    }
    return min;
}
const solution = input => {
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const island = Array.from({length:N},()=> Array(N).fill(0));
    const dist = Array.from({length:N}, ()=>Array(N).fill(-1));
    let number = 1;
    
    const grouping = (y,x,number) =>{
        dist[y][x] = 0;
        map[y][x] = 0;
        island[y][x] = number;
        const queue = [[y,x]];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= N || nx >= N || !map[ny][nx]) continue;
                queue.push([ny,nx]);
                island[ny][nx] = number;
                map[ny][nx] = 0;
                dist[ny][nx] = 0;
            }
        }
    }
    // grouping
    map.forEach((row,y) =>
        row.forEach((ground,x) => {
            if(!ground) return;
            grouping(y,x,number++);
        })
    )
    // dist.forEach(row => console.log(row.join(' ')));
    console.log(getMinLength(island,dist));
}
solution(input);