// const input = ['3 3','1 1 0','1 1 1','1 0 1','1 1 1'];
// const input =['11 10','7 4 0','1 1 1 1 1 1 1 1 1 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 1 1 1 1 0 1','1 0 0 1 1 0 0 0 0 1','1 0 1 1 0 0 0 0 0 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 0 0 0 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 0 0 0 1','1 1 1 1 1 1 1 1 1 1']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const robot = input[1].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+2].split(' ').map(Number));
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    const [dy,dx] = [[-1,0,1,0],[0,1,0,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const [y,x,d] = robot;
    const moveRobot = (y,x,d,clean) =>{
        if(!visited[y][x]) clean++;
        visited[y][x] = true;
        for(let i=1; i<=4; i++){
            const nd = (d-i+4) % 4
            const [ny,nx] = [y+dy[nd] , x+dx[nd]];
            if(!isValidPos(ny,nx) || map[ny][nx] === 1 || visited[ny][nx]) continue;
            return moveRobot(ny,nx,nd,clean);
        }
        const [ny,nx] = [y-dy[d],x-dx[d]];
        if(!isValidPos(ny,nx) || map[ny][nx] ===1) return clean;
        else return moveRobot(ny,nx,d,clean);
    }
    const answer = moveRobot(y,x,d,0);
    console.log(answer);
}
solution(input);