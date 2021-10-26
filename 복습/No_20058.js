// const input = [
// '3 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1'
// ]
// const input = [
// '3 2',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2'
// ]
// const input = [
// '3 5',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2 1 2 3 2 3'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 1 2 3 1 2 3 1',
// ]
// const input = [
//     '3 10',
//     '1 0 3 4 5 6 7 0',
//     '8 0 6 5 4 3 2 1',
//     '1 2 0 4 5 6 7 0',
//     '8 7 6 5 4 3 2 1',
//     '1 2 3 4 0 6 7 0',
//     '8 7 0 5 4 3 2 1',
//     '1 2 3 4 5 6 7 0',
//     '0 7 0 5 4 3 2 1',
//     '1 2 3 1 2 3 1 2 3 1'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
const [N,Q] = input[index++].split(' ').map(Number);
const mapSize = Math.pow(2,N);
let map = Array.from({length:mapSize},()=>input[index++].split(' ').map(Number));
let visited = Array.from({length:mapSize},()=>Array(mapSize).fill(false));
const L = input[index].split(' ').map(Number);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<mapSize && x<mapSize);
const melt = () =>{
    let meltIce = [];
    for(let y=0; y<mapSize; y++){
        for(let x=0; x<mapSize; x++){
            if(map[y][x]){
                let count = 0;
                for(let i=0; i<4; i++){
                    const [ny,nx] = [y+dy[i],x+dx[i]];
                    if(!isValidPos(ny,nx) || !map[ny][nx]) count++;
                }
                if(count >=2) meltIce.push([y,x]);
            }
        }
    }
    meltIce.forEach(([y,x])=> map[y][x]--);
}
const rotate = (y,x,size) =>{
    let temp = Array.from({length:size},()=>Array(size));
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            temp[j][size-i-1] = map[i+y][j+x];
        }
    }
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            map[i+y][j+x] = temp[i][j];
        }
    }
    // console.log(temp);

}
const getMaxIce = (y,x) =>{
    visited[y][x] = true;
    let queue = [[y,x]];
    let count = 0;
    while(queue.length){
        const [cy,cx] = queue.shift();
        count++;
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || !map[ny][nx]) continue;
            queue.push([ny,nx]);
            visited[ny][nx] = true;
        }
    }
    return count;
}
const solution = () =>{
    let maxIce = 0;
    for(let i=0; i<L.length; i++){
        const size = Math.pow(2,L[i]);
        for(let y=0; y<mapSize; y+=size){
            for(let x=0; x<mapSize; x+=size){
                rotate(y,x,size);
            }
        }
        melt();
    }
    const sum = map.reduce((acc,cur)=>acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
    for(let y=0; y<mapSize; y++){
        for(let x=0; x<mapSize; x++){
            if(!visited[y][x] && map[y][x]){
                maxIce = Math.max(maxIce,getMaxIce(y,x));
            }
        }
    }
    console.log(sum+'\n'+maxIce);
}
solution();