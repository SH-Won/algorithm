// const input = [
// '7 8',
// '0 0 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '1 1 0 0 0 1 1 0',
// '0 0 0 0 0 1 1 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
// const input = [
// '7 8',
// '0 0 0 1 1 0 0 0',
// '0 0 0 1 1 0 0 0',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
// const input = [
// '7 8',
// '1 0 0 1 1 1 0 0',
// '0 0 1 0 0 0 1 1',
// '0 0 1 0 0 0 1 1',
// '0 0 1 1 1 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 1 1 1 0 0 0 0',
// '1 1 1 1 1 1 0 0',
// ]
// const input = [
//     '7 7',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '0 0 0 0 0 0 0',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1'
//     ]
    // const input =[
    // '8 8',
    // '0 0 0 1 1 1 1 0',
    // '0 1 1 1 1 0 1 0',
    // '0 1 0 1 1 1 0 0',
    // '0 1 0 0 0 1 0 0',
    // '0 0 0 1 0 0 1 0',
    // '0 0 0 0 0 1 0 0',
    // '0 1 1 1 0 0 0 0',
    // '0 1 0 0 0 1 0 0'
    // ]
    // const input =[
    // '6 10',
    // '1 1 1 1 1 1 1 1 1 1',
    // '1 0 0 0 0 0 1 0 0 0',
    // '1 0 1 0 1 0 1 0 0 1',
    // '1 0 1 1 1 0 1 0 0 1',
    // '0 0 0 0 0 0 0 0 0 1',
    // '1 1 0 1 1 1 1 1 0 1',
    // ]//ans 12;
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const getPath = (island) =>{
    const [N,M] = [island.length, island[0].length];
    const isValidPos = (y,x) => (y >= 0 && x >= 0 && y < N && x < M);
    const path = [];
    island.forEach((row,y) =>
        row.forEach((ground,x) =>{
            if(ground){
                for(let i=0; i<4; i++){
                    let len = 0;
                    let [ny,nx] = [y+dy[i],x+dx[i]];
                    while(isValidPos(ny,nx) && island[ny][nx] !== island[y][x]){
                        if(island[ny][nx]){
                            if(len >= 2) path.push({from:island[y][x]-2, to:island[ny][nx]-2, len});
                            break;
                        }
                        len++ , ny+=dy[i] , nx+=dx[i];
                    }
                }
            }
        })
    )
    return path.sort((a,b)=>a.len - b.len);
}
const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);
}
const isSameParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a : parent[a] = b;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const island = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let number = 1;
    const numbering = (y,x,number) =>{
        island[y][x] = number;
        const queue = [[y,x]];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= N || nx >= M || island[ny][nx] !== 1) continue;
                queue.push([ny,nx]);
                island[ny][nx] = number;
            }
        }
    }
    // numbering
    island.forEach((row,y) => 
          row.forEach((ground,x) => {
              if(ground === 1) numbering(y,x,++number);
          })
    );
    const parent = Array(number-1).fill().map((v,i) => i);
    const path = getPath(island);
    let answer = 0;
    // get min length;
    for(let i=0; i<path.length; i++){
        const {from,to,len} = path[i];
        if(!isSameParent(parent,from,to)){
            unionParent(parent,from,to);
            answer += len;
        }
    }
    // check all island are linked ;
    for(let i=0; i<parent.length-1; i++){
        if(!isSameParent(parent,parent[i],parent[i+1])) return console.log(-1);
    }
    console.log(answer);
}
solution(input);