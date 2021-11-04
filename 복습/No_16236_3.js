// const input = ['3','0 0 1','0 0 0','0 9 0'];
//const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
//const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
//const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
//const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];

const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const bfs = (babyShark,time,map) =>{
    let {y,x,size,eaten} = babyShark;
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    visited[y][x] = true;
    let edible = [];
    let queue = [[y,x,time]];
    let isFind = false;
    while(queue.length){
        const [cy,cx,time] = queue.shift();
        if(map[cy][cx] && size > map[cy][cx]){
            edible.push({ey:cy,ex:cx,t:time});
            isFind = true;
            continue;
        }
        if(isFind) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] > size) continue;
            visited[ny][nx] = true;
            queue.push([ny,nx,time+1]);
        }
    }
    if(!edible.length) return time;
    edible.sort((a,b)=>{
        if(a.t === b.t){
            if(a.ey === b.ey) return a.ex - b.ex;
            return a.ey - b.ey
        }
        return a.t - b.t
    })
    const {ey,ex,t} = edible[0];
    map[ey][ex] = 0;
    if(++eaten === size) eaten = 0 , size++;
    babyShark = {y:ey,x:ex,size,eaten};
    return bfs(babyShark,t,map);
}
const solution = (map) =>{
    let babyShark ;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 9){
               babyShark = {y,x,size:2,eaten:0};
               map[y][x] = 0;
            }
        }
    }
    const time = bfs(babyShark,0,map);
    console.log(time);
}
console.time('1');
solution(map);
console.timeEnd('1');
