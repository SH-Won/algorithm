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
//const input = ['1 7','0 1 2 3 4 5 6'];
//const input = ['3 7','4 0 0 0 0 0 0 0','0 0 0 2 0 0 0','0 0 0 0 0 0 4'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const office = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const CCTV = [
    null,
    [[[1,0]],[[-1,0]],[[0,1]],[[0,-1]]],
    [[[-1,0],[1,0]],[[0,-1],[0,1]]],
    [[[-1,0],[0,1]],[[0,1],[1,0]],[[1,0],[0,-1]],[[0,-1],[-1,0]]],
    [[[0,-1],[-1,0],[0,1]],[[-1,0],[0,1],[1,0]],[[0,1],[1,0],[0,-1]],[[1,0],[0,-1],[-1,0]]],
    [[[-1,0],[0,1],[1,0],[0,-1]]]
]
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);

const solution = (office) =>{
    let cctvPos = [];
    let unWatchable = 0; 
    let min = Infinity;
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(office[y][x] !==6 && office[y][x] !==0)  cctvPos.push([y,x]);
            if(office[y][x] === 0) unWatchable++;
        }
    }
    let direction = Array(cctvPos.length);
    const resetVisit = () =>{
        visited = visited.map(array => array.fill(false));
    }
    const watch = (start,direction) =>{
        let count = 0;
        const [y,x] = cctvPos[start];
        const number = office[y][x];
        for(let i=0; i<CCTV[number][direction].length; i++){
            const [my,mx] = CCTV[number][direction][i];
            let [ny,nx] = [y+my,x+mx];
            while(isValidPos(ny,nx) && office[ny][nx] !==6){
                if(!visited[ny][nx] && office[ny][nx] === 0){
                    count++;
                    visited[ny][nx] = true;
                }
                ny+=my;
                nx+=mx;
            }
        }
        return count;
    }
    const dfs = (count) =>{
        if(count === cctvPos.length){
             let sum = 0;
             for(let i=0; i<direction.length; i++){
                 sum+=watch(i,direction[i]);
             }
             resetVisit();
             return min = Math.min(min,unWatchable-sum);
             
        }
       
        const [y,x] = cctvPos[count];
        const number = office[y][x];
        for(let i=0; i<CCTV[number].length; i++){
            direction[count] = i;
            dfs(count+1);
        }
    }
    dfs(0);
    console.log(min);
}
solution(office);