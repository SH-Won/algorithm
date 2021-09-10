// const input = ['3','0 0 1','0 0 0','0 9 0'];
//const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
// const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
// const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let space = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));
let visited = Array.from({length:N},()=>Array(N).fill(false));
let sharkPos ={cy:null,cx:null};
let sharkSize = 2;
let eaten = 0;
let time = 0;

loop:for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        if(space[i][j] === 9){
            sharkPos.cy = i;
            sharkPos.cx = j;
            space[i][j] = 0;
            break loop;
        }
    }
}

const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
const bfs = (start,time) =>{
    
    let queue = [[start.cy,start.cx,time,0]]
    let edible = [];
    let flag = false;
   
    visited[start.cy][start.cx] = true;
    while(queue.length){
        const [cy,cx,time,fishSize] = queue.shift();
        if(fishSize > 0 &&fishSize < sharkSize){
            edible.push({cy,cx,time});
            flag = true;
            continue;
        }
        if(flag) continue;

        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx) || space[ny][nx] > sharkSize || visited[ny][nx]) return;
            visited[ny][nx] = true;
            queue.push([ny,nx,time+1,space[ny][nx]])
            
        })
    }
    if(edible.length === 0) return time;

    edible.sort((a,b)=>{
        if(a.time === b.time){
            if(a.cy === b.cy){
                return a.cx - b.cx
            }
            return a.cy - b.cy
        }
        return a.time - b.time;
    })
    if(++eaten === sharkSize){
        eaten =0;
        sharkSize++;
    }
    visited = visited.map(array => array.fill(false));
    sharkPos.cy = edible[0].cy;
    sharkPos.cx = edible[0].cx;
    space[sharkPos.cy][sharkPos.cx] = 0;
    time = edible[0].time
    edible = [];
    
    return bfs(sharkPos,time);
}

let answer = bfs(sharkPos,time);
console.log(answer);