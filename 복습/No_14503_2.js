// const input = ['3 3','1 1 0','1 1 1','1 0 1','1 1 1'];
//const input =['11 10','7 4 0','1 1 1 1 1 1 1 1 1 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 1 1 1 1 0 1','1 0 0 1 1 0 0 0 0 1','1 0 1 1 0 0 0 0 0 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 0 0 0 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 0 0 0 1','1 1 1 1 1 1 1 1 1 1']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const robot = input[1].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+2].split(' ').map(Number));
// 0은 빈칸  1은 벽;
// 0 북 1 동 2 남 3 서
const [dy,dx] = [[-1,0,1,0],[0,1,0,-1]];

const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);

const bfs = (map) =>{
    let visited = Array.from({length:N} , () =>Array(M).fill(false));
    const [sy,sx,sd] = robot;
    visited[sy][sx] = true;
    let count = 1;
    let queue = [[sy,sx,sd]];
    while(queue.length){
        const [y,x,d] = queue.shift();
        let isMove = false;
        for(let i=1; i<=4; i++){
            const [ny,nx] = [y+dy[((d-i)+4) % 4],x+dx[((d-i)+4) % 4]];
            if(!isValidPos(ny,nx) || map[ny][nx] || visited[ny][nx]) continue;
            isMove = true;
            queue.push([ny,nx, ((d-i)+4) % 4])
            visited[ny][nx] = true;
            count++;
            break;
        }
        if(isMove) continue;
        const [ny,nx] = [y-dy[d],x-dx[d]];
        if(!isValidPos(ny,nx) || map[ny][nx]) break;
        if(!visited[ny][nx]){
            visited[ny][nx] = true;
            count++;
        }
        queue.push([ny,nx,d]);
    }
    return count;
}
const solution = (map) =>{
    const answer = bfs(map);
    console.log(answer);
}
solution(map);