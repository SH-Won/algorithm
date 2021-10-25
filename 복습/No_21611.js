// const input = [
// '5 6',
// '0 0 0 0 0 0',
// '0 1 1 0 1 0',
// '0 1 0 0 0 0',
// '0 0 1 1 1 0',
// '1 0 0 0 0 0',
// '4 2 3',
// '2 4 1',
// ]
const input = [
'10 10',
'0 1 1 1 0 0 0 0 0 1',
'0 0 0 0 0 1 1 1 1 1',
'0 0 0 0 0 1 1 1 1 1',
'0 1 0 0 1 1 1 1 1 1',
'0 0 0 1 0 0 0 1 1 1',
'0 1 1 1 0 0 0 0 0 1',
'0 0 0 1 1 0 0 0 1 1',
'0 1 0 1 1 1 1 0 1 1',
'0 0 0 1 1 1 1 1 1 1',
'1 1 1 1 1 1 1 0 1 1',
'1 9 1',
'9 1 3',
]// ans 12
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let count = Array.from({length:N},()=>Array.from({length:M},()=>Array(4).fill(Infinity)));
const start = input[N+1].split(' ').map(num => +num -1);
const end = input[N+2].split(' ').map(num => +num -1);
//console.log(start,end);
const dy = [0,0,1,-1];
const dx = [1,-1,0,0];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const bfs = (start,end) =>{
    const [sy,sx,sDir] = start;
    const [ey,ex,eDir] = end;
    count[sy][sx][sDir] = 0;
    let queue = [[sy,sx,sDir,0]];
    while(queue.length){
        const [y,x,dir,time] = queue.shift();
        if(y === ey && x===ex && dir === eDir) return console.log(time);
        let [ny,nx] = [y+dy[dir],x+dx[dir]];

        let k = 3;
        while(k-- && isValidPos(ny,nx) && map[ny][nx] !==1){
            if(count[ny][nx][dir] > time+1){
                queue.push([ny,nx,dir,time+1]);
                count[ny][nx][dir] = time+1;
               // console.log(ny,nx,time);
               
            }
            ny+=dy[dir];
            nx+=dx[dir];
        }
        if(dir <=1){
            for(let i=2; i<4; i++){
                if(count[y][x][i] > time + 1){
                    queue.push([y,x,i,time+1]);
                    count[y][x][i] = time+1;
                }
            }
        }
        else{
            for(let i=0; i<2; i++){
                if(count[y][x][i] > time + 1){
                    queue.push([y,x,i,time+1]);
                    count[y][x][i] = time+1;
                }
            }
        }
    }   
}
bfs(start,end);

