// const input = [
// '5 3',
// '2 2 -1 3 1',
// '3 3 2 0 -1',
// '0 0 0 1 2',
// '-1 3 1 3 2',
// '0 3 2 2 1',
// ]
// const input = [
// '6 4',
// '2 3 1 0 -1 2',
// '2 -1 4 1 3 3',
// '3 0 4 2 2 1',
// '-1 4 -1 2 3 4',
// '3 -1 4 2 0 3',
// '1 2 2 2 2 1'
// ]
// const input = [
//     '4 3',
//     '1 1 1 3',
//     '3 2 3 3',
//     '1 2 -1 3',
//     '-1 -1 1 1'
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i) =>input[i+1].split(' ').map(Number));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const rotate = (map) =>{
     let rotateMap = Array.from({length:N},()=>Array(N));
     for(let y=0; y<N; y++){
         for(let x=0; x<N; x++){
             rotateMap[N-1-x][y] = map[y][x];
         }
     }
     return rotateMap;
}
const gravity = (map) =>{
     for(let x=0; x<N; x++){
         let array = [] , y=0 ;
         while(y < N){
             if(map[y][x] === -1){
                 let cy = y-1;
                 while(array.length){
                     map[cy--][x] = array.pop();
                 }
             }
             else if(map[y][x] !==null){
                 array.push(map[y][x]);
                 map[y][x] = null;
             }
             y++;
         }
         y--;
         while(array.length){
             map[y--][x] = array.pop();
         }
     }
}
const getBlock = (start,color,map,visited) => {
    const [y,x] = start;
    visited[y][x] = true;
    let rainbow = [];
    let queue = [[y,x]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        if(map[y][x] === 0) rainbow.push([y,x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] ) continue;
            if(map[ny][nx] === color || map[ny][nx] === 0){
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
    }
    if(queue.length < 2) return false;
    rainbow.forEach(([y,x]) => visited[y][x] = false);
    return {y,x,block:queue,rainbow:rainbow.length}
}
const getScore = (map) => {
    let blocks = [];
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && map[y][x] > 0){
                const groupBlock = getBlock([y,x],map[y][x],map,visited);
                if(!groupBlock) continue;
                blocks.push(groupBlock);
            }
        }
    }
    if(!blocks.length) return 0;
    blocks.sort((a,b) =>{
        if(a.block.length === b.block.length){
            if(a.rainbow === b.rainbow){
                if(a.y === b.y) return b.x - a.x;
                return b.y - a.y;
            }
            return b.rainbow - a.rainbow;
        }
        return b.block.length - a.block.length;
    })
    const score = blocks[0].block.length ** 2;
    blocks[0].block.forEach(([y,x])=> map[y][x] = null);
    return score;
}
const solution = (map) => {
    let sum = 0;
    while(true){
        const score = getScore(map);
        if(!score) return console.log(sum);
        sum+=score;
        gravity(map);
        map = rotate(map);
        gravity(map);
    }
}
solution(map);