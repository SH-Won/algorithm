// const input =[
//     '4 6',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 1 0 6 0',
// '0 0 0 0 0 0'
// ]
// const input = [
//     '6 6',
// '0 0 0 0 0 0',
// '0 2 0 0 0 0',
// '0 0 0 0 6 0',
// '0 6 0 0 2 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 5',
// ]
// const input = [
//     '6 6',
// '1 0 0 0 0 0',
// '0 1 0 0 0 0',
// '0 0 1 0 0 0',
// '0 0 0 1 0 0',
// '0 0 0 0 1 0',
// '0 0 0 0 0 1',
// ]
// const input = [
//     '6 6',
// '1 0 0 0 0 0',
// '0 1 0 0 0 0',
// '0 0 1 5 0 0',
// '0 0 5 1 0 0',
// '0 0 0 0 1 0',
// '0 0 0 0 0 1'
// ]
// const input = ['1 7','0 1 2 3 4 5 6'];
const input = ['3 7','4 0 0 0 0 0 0 0','0 0 0 2 0 0 0','0 0 0 0 0 0 4'];


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const office = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
const direction = [
    null,
    [[[-1,0]],[[0,1]],[[1,0]],[[0,-1]]],
    [[[-1,0],[1,0]],[[0,-1],[0,1]]],
    [[[-1,0],[0,1]],[[0,1],[1,0]],[[1,0],[0,-1]],[[0,-1],[-1,0]]],
    [[[-1,0],[0,1],[0,-1]],[[0,1],[-1,0],[1,0]],[[-1,0],[0,1],[0,-1]],[[0,-1],[-1,0],[1,0]]],
    [[[-1,0],[0,1],[1,0],[0,-1]]]
]
const CCTV = [
    null,
    [[[1,0]],[[-1,0]],[[0,1]],[[0,-1]]],
    [[[-1,0],[1,0]],[[0,-1],[0,1]]],
    [[[-1,0],[0,1]],[[0,1],[1,0]],[[1,0],[0,-1]],[[0,-1],[-1,0]]],
    [[[0,-1],[-1,0],[0,1]],[[-1,0],[0,1],[1,0]],[[0,1],[1,0],[0,-1]],[[1,0],[0,-1],[-1,0]]],
    [[[-1,0],[0,1],[1,0],[0,-1]]]
]
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
const getWatchCount = (cctv,cctvDir) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let watchCount = 0;

    for(let i=0; i<cctv.length; i++){
        const [y,x,CCTV] = cctv[i];
        const dir = cctvDir[i];
        for(let j=0; j<direction[CCTV][dir].length; j++){
            const [dy,dx] = direction[CCTV][dir][j];
            let [ny,nx] = [y+dy,x+dx];
            while(isValidPos(ny,nx) && office[ny][nx] !==6){
                if(!visited[ny][nx] && office[ny][nx] ===0){
                    watchCount++;
                    visited[ny][nx] = true;
                }
                ny+=dy;
                nx+=dx;
            }
        }
    }
    return watchCount;
}
const getMaxWatch = (cctv) =>{
    let cctvDir = Array(cctv.length);
    let maxWatch = 0;
    const selectDir = (count) =>{
        if(count === cctv.length){
            const watchCount = getWatchCount(cctv,cctvDir);
            maxWatch = Math.max(maxWatch,watchCount);
            return;
        }
        
        const CCTV = cctv[count][2];
        for(let i=0; i<direction[CCTV].length; i++){
            cctvDir[count] = i;
            selectDir(count+1);
        }
    }
    selectDir(0);
    return maxWatch;
}
const solution = (office) =>{
    let cctv = [];
    let unWatch = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(office[y][x] !==6 && office[y][x] !==0 ) cctv.push([y,x,office[y][x]]);
            if(!office[y][x]) unWatch++;
        }
    }
    const answer = unWatch - getMaxWatch(cctv);
    console.log(answer);
}
solution(office);