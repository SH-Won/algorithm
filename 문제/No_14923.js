const input = [
'5 6',
'1 1',
'5 6',
'0 1 1 1 0 0',
'0 1 1 0 0 0',
'0 1 0 0 1 0',
'0 1 0 0 1 0',
'0 0 0 1 1 0'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const [hy,hx] = input[1].split(' ').map(Number);
const [ey,ex] = input[2].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+3].split(' '));
let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(2)));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
const bfs = () =>{
    visited[hy-1][hx-1][1] = true;
    let queue = [[hy-1,hx-1,0,1]];
    while(queue.length){
        const [y,x,time,magic] = queue.shift();
        if(y===ey-1 && x===ex-1) return console.log(time);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            if(!visited[ny][nx][magic]){
                if(map[ny][nx] === '0'){
                    visited[ny][nx][magic] = true;
                    queue.push([ny,nx,time+1,magic]);
                }
                if(magic && map[ny][nx] ==='1'){
                    visited[ny][nx][magic-1] = true;
                    queue.push([ny,nx,time+1,magic-1]);
                }
            }
        }
    }
    console.log(-1);
}
bfs();