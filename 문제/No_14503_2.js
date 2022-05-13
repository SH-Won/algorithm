// const input = ['3 3','1 1 0','1 1 1','1 0 1','1 1 1'];
// const input =['11 10','7 4 0','1 1 1 1 1 1 1 1 1 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 1 1 1 1 0 1','1 0 0 1 1 0 0 0 0 1','1 0 1 1 0 0 0 0 0 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 0 0 0 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 0 0 0 1','1 1 1 1 1 1 1 1 1 1']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const robot = input[1].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+2].split(' ').map(Number));
    const visited = Array.from({length:N},()=>Array(M).fill(false));
    const [dy,dx] = [[-1,0,1,0],[0,1,0,-1]] // 북 동 남 서
    const [y,x,d] = robot;

    const getCleanCount = (y,x,d,clean) =>{
        if(!visited[y][x]){
            visited[y][x] = true;
            clean++;
        }
        for(let i=1; i<=4; i++){
            const nd = (d-i+4) % 4; // rotate left;
            const [ny,nx] = [y+dy[nd],x+dx[nd]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] || visited[ny][nx]) continue;
            return getCleanCount(ny,nx,nd,clean);
        }
        const bd = (d+2) % 4; // back direction;
        const [ny,nx] = [y+dy[bd],x+dx[bd]];
        if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx]) return clean;
        else return getCleanCount(ny,nx,d,clean);
    }
    console.log(getCleanCount(y,x,d,0));
}
solution(input);