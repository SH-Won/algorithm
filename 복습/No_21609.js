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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
let map = Array.from({length:N},(_,i)=>input[i+1].split(' '));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];

const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
const rotate = () =>{
    let temp = Array.from({length:N},()=>Array(N));
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            temp[y][x] = map[x][N-y-1];
        }
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            map[y][x] = temp[y][x];
        }
    }
}
const gravity = () =>{
    for(let x=0; x<N; x++){
        let array = [];
        for(let y=0; y<N; y++){
            if(map[y][x] === '-1'){
               let i=y-1;
               while(array.length){
                   map[i][x] = array.pop();
                   i--;
               }
            }
            else if(map[y][x] !==null){
                array.push(map[y][x]);
                map[y][x] = null;
            }
        }
        let i = N-1;
        while(array.length){
            map[i][x] = array.pop();
            i--;
        }
    }
}
const findBlockGroup = (y,x,color) =>{
    let blockPos = [];
    let rainbowPos =[];
    let rainbow = 0;
    let blockCount = 0;
    visited[y][x] = true;
    let queue= [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        blockCount++;
        blockPos.push([cy,cx])
        if(map[cy][cx] === '0'){
            rainbow++;
            rainbowPos.push([cy,cx]);
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='-1') continue;
            if(map[ny][nx] ==='0' || map[ny][nx] ===color){
            queue.push([ny,nx]);
            visited[ny][nx] = true;
            }
        }
    }
    if(blockCount < 2) return false;
    rainbowPos.forEach(([y,x])=>visited[y][x] = false);
    return {y,x,blockPos,rainbow,blockCount}
}
const earnScore = () =>{
    let groups = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && map[y][x] !==null && map[y][x] !=='-1' && map[y][x] !=='0'){
               const group = findBlockGroup(y,x,map[y][x]);
               if(!group) continue;
               groups.push(group); 
            }
        }
    }
     if(!groups.length) return 0;

     groups.sort((a,b)=>{
         if(a.blockCount === b.blockCount){
            if(a.rainbow === b.rainbow){
                if(a.y === b.y) return b.x -a.x
                return b.y - a.y
            }
            return b.rainbow - a.rainbow;
         }
        return b.blockCount - a.blockCount
     })

     groups[0].blockPos.forEach(([y,x])=>map[y][x] = null);
     visited.forEach(row => row.fill(false));
     return groups[0].blockCount **2
}

const solution = () =>{
    let sum = 0;
    while(true){
     const score = earnScore();
     if(!score) break;
     sum+=score;
     gravity();
     rotate();
     gravity();
  }
  console.log(sum);
}
solution();