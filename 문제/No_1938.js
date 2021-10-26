// const input = [
// '5',
// 'B0011',
// 'B0000',
// 'B0000',
// '11000',
// 'EEE00',
// ]
// const input = [
// '4',
// '000E',
// 'BBBE',
// '000E',
// '0000',
// ] //ans 3
// const input = [
// '4',
// '0B00',
// 'EB00',
// 'EB00',
// 'E000'
// ] //ans 2
// const input = [
// '4',
// 'BBB0',
// '0E00',
// '0E00',
// '0E00',
// ]// ans3
// const input = [
// '5',
// 'B0011',
// 'B0000',
// 'B0000',
// '01000',
// 'EEE10'
// ] //ans 0
// const input = [
// '7',
// '0001000',
// '0001000',
// 'B00100E',
// 'B00000E',
// 'B00100E',
// '0001000',
// '0001000'
// ]// ans 8

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const [y,x] = [0,1];
const [HORIZON,VERTICAL] = [0,1];
const [UP,DOWN,RIGHT,LEFT] =[0,1,2,3];
let visited = Array.from({length:N},()=>Array.from({length:N},()=>Array(2).fill(false)));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const getNextPos = (cy,cx,dir) =>{
    let next = [];
    if(dir === HORIZON){
        let current = [[cy,cx-1],[cy,cx],[cy,cx+1]];
        let up = false;
        let down = false;
     loop:for(let i=0; i<4; i++){
            for(let j=0; j<3; j++){
                const [ny,nx] = [current[j][y]+dy[i],current[j][x]+dx[i]];
                if(!isValidPos(ny,nx) || map[ny][nx] ==='1') continue loop;
            }
            next.push([cy+dy[i],cx+dx[i],dir])
            if(i === UP) up = true;
            else if (i === DOWN) down = true;
        }
        if(up && down) next.push([cy,cx,VERTICAL]);
    }
    else{
        let current = [[cy-1,cx],[cy,cx],[cy+1,cx]];
        let left = false;
        let right = false;
     loop:for(let i=0; i<4; i++){
            for(let j=0; j<3; j++){
                const [ny,nx] = [current[j][y]+dy[i],current[j][x]+dx[i]];
                if(!isValidPos(ny,nx) || map[ny][nx] ==='1') continue loop;
            }
            next.push([cy+dy[i],cx+dx[i],dir])
            if(i === LEFT) left = true;
            else if (i === RIGHT) right = true;
        }
        if(left && right) next.push([cy,cx,HORIZON]);
    }
   return next;
}
const bfs = (start,end) =>{
    const startDirection = start[0][y] - start[1][y] === 0 ? HORIZON : VERTICAL;
    const endDirection = end[0][y] - end[1][y] === 0 ? HORIZON : VERTICAL;
    
    const sCore = start[1];
    const eCore = end[1];
    visited[sCore[y]][sCore[x]][startDirection] = true;
    let queue = [[sCore[y],sCore[x],startDirection,0]];
    while(queue.length){
        const [cy,cx,dir,time] = queue.shift();
        if(cy===eCore[y] && cx===eCore[x] && dir === endDirection){
            return time;
        }
        const nextPos = getNextPos(cy,cx,dir);
        for(let i=0; i<nextPos.length; i++){
            const [ny,nx,nDir] = nextPos[i];
            if(visited[ny][nx][nDir]) continue;
            visited[ny][nx][nDir] = true;
            queue.push([ny,nx,nDir,time+1])
        }
    }
    return 0;
}
const solution = (map) =>{
    let start = [];
    let end = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] ==='B') start.push([y,x]) , map[y][x]='0';
            else if(map[y][x] ==='E') end.push([y,x]),map[y][x]='0';
        }
    }
    const answer = bfs(start,end);
    console.log(answer);
}
solution(map);