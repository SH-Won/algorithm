// const input = ['5','B0011','B0000','B0000','11000','EEE00']
// const input = ['4','B000','B01E','B00E','000E']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinCount = (map,startCore,endCore) =>{
    const N = map.length;
    const [dy,dx] = [[0,0,-1,1],[-1,1,0,0]];
    const [y,x] = [0,1];
    const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];
    const [HORIZON,VERTICAL] = [0,1];
    let time = Array.from({length:N},()=>Array.from({length:N}, ()=>Array(2).fill(Infinity)));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const getNextPos = (core,state) =>{
         let move = Array(4).fill(false);
         const [cy,cx] = core;
         const cPos = state === HORIZON ? [[cy,cx-1],core,[cy,cx+1]] : [[cy-1,cx],core,[cy+1,cx]];
         let nPos = [];
    loop:for(let dir=0; dir<4; dir++){
             for(let i=0; i<cPos.length; i++){
                 const [ny,nx] = [cPos[i][y]+dy[dir] , cPos[i][x]+dx[dir]];
                 if(!isValidPos(ny,nx) || map[ny][nx] === '1') continue loop;
             }
             move[dir] = true;
             nPos.push([[core[y]+dy[dir], core[x]+dx[dir]],state]);
         }
         if(state === HORIZON && move[UP] && move[DOWN] ) nPos.push([core,VERTICAL]);
         else if(state === VERTICAL && move[LEFT] && move[RIGHT]) nPos.push([core,HORIZON]);
         return nPos;
    }
    const [[sy,sx],[ey,ex]] = [startCore,endCore];
    const startState = map[sy][sx+1] === 'B' ? HORIZON : VERTICAL;
    const endState = map[ey][ex+1] === 'E' ? HORIZON : VERTICAL;
    time[sy][sx][startState] = 0;
    let queue = [[startCore,startState]];
    while(queue.length){
        const [core,state] = queue.shift();
        if(core[y] === ey && core[x] === ex && state === endState) return time[ey][ex][endState];
        const next = getNextPos(core,state);
        for(let i=0; i<next.length; i++){
            const [nCore,nState] = next[i];
            if(time[nCore[y]][nCore[x]][nState] > time[core[y]][core[x]][state] + 1){
                queue.push([nCore,nState]);
                time[nCore[y]][nCore[x]][nState] = time[core[y]][core[x]][state] + 1
            }
        }
    }
    return 0;
}
const solution = (input) =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i) => input[i+1].split(''));
    let start = [] , end =[];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 'B') start.push([y,x]);
            else if(map[y][x] === 'E') end.push([y,x]);
        }
    }
    const min = getMinCount(map,start[1],end[1]);
    console.log(min);
}
solution(input);