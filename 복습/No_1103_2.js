//const input = ['3 7','3942178','1234567','9123532']
// const input =['1 10','2H3HH4HHH5']
// const input =['4 4','3994','9999','9999','2924']
// const input = ['4 6','123456','234567','345678','456789']
// const input =['1 1','9']
// const input = ['3 7','2H9HH11','HHHHH11','9HHHH11']
// const input =['4 4','3HH2','H1HH','H2H1','2219'] //ans 8

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
let count = Array.from({length:N},()=>Array(M).fill(0));
let visited = Array.from({length:N},()=>Array(M).fill(false));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
let maxCount = 0;
visited[0][0] = true;
const dfs = (y,x,curCount) =>{
    curCount > maxCount ? maxCount=curCount : maxCount;
    count[y][x] = curCount;
    const dist = parseInt(map[y][x]);
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i]*dist,x+dx[i]*dist];
        if(!isValidPos(ny,nx) || map[ny][nx] ==='H' || count[ny][nx] > count[y][x]) continue;
        if(visited[ny][nx]) process.exit(console.log(-1));
        if(!visited[ny][nx]){
            visited[ny][nx] = true;
            dfs(ny,nx,curCount+1);
            visited[ny][nx] = false;
        }

    }

}
dfs(0,0,1);
console.log(maxCount);