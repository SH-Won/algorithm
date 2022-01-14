const input = ['5 6','0 0 0 0 0 0','0 1 1 0 1 0','0 1 0 0 0 0','0 0 1 1 1 0','1 0 0 0 0 0','4 2 3','2 4 1']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinCommandCount = (start,end,map) =>{
    const [N,M] = [map.length ,map[0].length];
    const [dy,dx] = [[0,0,1,-1],[1,-1,0,0]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    let count = Array.from({length:N},()=>Array.from({length:M},()=>Array(4).fill(Infinity)));
    const [[sy,sx,sd],[ey,ex,ed]] = [start,end];
    count[sy][sx][sd] = 0;
    let queue = [[sy,sx,sd]];
    while(queue.length){
        const [y,x,d] = queue.shift();
        if(y === ey && x===ex && d === ed) return count[ey][ex][ed];
        const next = [];
        let k = 3;
        let [ny,nx] = [y+dy[d],x+dx[d]]
        while(k-- && isValidPos(ny,nx) && map[ny][nx] === 0){
           next.push([ny,nx,d]);
           ny+=dy[d] , nx+=dx[d];
        }
        d <=1 ? next.push([y,x,2],[y,x,3]) : next.push([y,x,0],[y,x,1]);
        for(let i=0; i<next.length; i++){
            const [ny,nx,nd] = next[i];
            if(count[ny][nx][nd] > count[y][x][d] + 1){
                count[ny][nx][nd] = count[y][x][d] + 1;
                queue.push([ny,nx,nd]);
            } 
        }
    } 
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const start = input[N+1].split(' ').map(num => +num -1);
    const end = input[N+2].split(' ').map(num => +num-1);
    //동 0 서 1 남 2 북 3;
    const answer = getMinCommandCount (start,end,map);
    console.log(answer);
}
solution(input);