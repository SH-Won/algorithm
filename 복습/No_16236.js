//const input = ['3','0 0 1','0 0 0','0 9 0'];
//const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
//const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
//const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
//const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let space = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));
let visited = Array.from({length:N},()=>Array(N).fill(false));
let sharkSize = 2;
let eaten = 0;
let sharkPos = {y:null,x:null};
const distance = [[1,0],[-1,0],[0,1],[0,-1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        if(space[i][j] === 9){
            sharkPos.y = i;
            sharkPos.x = j;
            space[i][j] = 0;
            break;
        }
    }
}

const bfs = (y,x,time) =>{
    visited[y][x] = true;
    let queue = [[y,x,time]];
    let edible =[];
    let flag = false;
    while(queue.length){
        const [cy,cx,time] = queue.shift();
        if(space[cy][cx] !==0 && space[cy][cx] < sharkSize){
            flag = true;
            edible.push({y:cy,x:cx,time})
            continue;
        }
        if(flag) continue;
        
        for(let i=0; i<distance.length; i++){
            const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || space[ny][nx] > sharkSize) continue;
            queue.push([ny,nx,time+1]);
            visited[ny][nx]= true;
        }
    }
    if(edible.length === 0 ) return console.log(time);

    edible.sort((a,b)=>{
        if(a.time === b.time){
            if(a.y === b.y) return a.x-b.x;
            return a.y-b.y;
        }
        return a.time - b.time;
    })
    const [ny,nx,nTime] = [edible[0].y,edible[0].x,edible[0].time];
    space[ny][nx] = 0;
    visited = visited.map(array => array.fill(false));
    if(++eaten === sharkSize){
        eaten=0;
        sharkSize++;
    } 
    return bfs(ny,nx,nTime);
}
bfs(sharkPos.y,sharkPos.x,0);
