const input = [
'10',
'1 1 1 0 0 0 0 1 1 1',
'1 1 1 1 0 0 0 0 1 1',
'1 0 1 1 0 0 0 0 1 1',
'0 0 1 1 1 0 0 0 0 1',
'0 0 0 1 0 0 0 0 0 1',
'0 0 0 0 0 0 0 0 0 1',
'0 0 0 0 0 0 0 0 0 0',
'0 0 0 0 1 1 0 0 0 0',
'0 0 0 0 1 1 1 0 0 0',
'0 0 0 0 0 0 0 0 0 0'
]
// const input = [
// '5',
// '1 0 0 0 1',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '1 1 0 0 1',
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number))
let island = Array.from({length:N},()=>Array(N).fill(0));
let distance = Array.from({length:N},()=>Array(N).fill(-1));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const bfs = (y,x,number) =>{
    island[y][x] = number;
    distance[y][x] = 0;
    let queue = [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || island[ny][nx] === number || map[ny][nx] !==1) continue;
            island[ny][nx] = number;
            distance[ny][nx] = 0;
            queue.push([ny,nx]);
        }
    }
}
let number = 0;
for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        if(!island[y][x] && map[y][x]){
            number++;
            bfs(y,x,number);
        }
    }
}
// console.log(island.map(row => row.join(' ')).join('\n'))
const getMinDistance = () =>{
    let queue = [];
    let min = Infinity;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x]) queue.push([y,x]);
        }
    }
    while(queue.length){
        const [y,x] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || !distance[ny][nx] || island[ny][nx] === island[y][x]) continue;
            if(!island[ny][nx]){
                island[ny][nx] = island[y][x];
                distance[ny][nx] = distance[y][x] +1;
                queue.push([ny,nx]);
            }
            else min = Math.min(distance[ny][nx]+distance[y][x] , min);
            
        }
    }
    return min
}
const answer = getMinDistance();
console.log(distance.map(row => row.join(' ')).join('\n'))
console.log(answer);