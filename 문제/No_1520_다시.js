// const input =[
//     '4 5',
// '50 45 37 32 30',
// '35 50 40 20 25',
// '30 30 25 17 28',
// '27 24 22 15 10',
// ]
// const input =[
//     '4 4',
//     '16 9 8 1',
//     '15 10 7 2',
//     '14 11 6 3',
//     '13 12 5 4'
// ]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,N] = input[0].split(' ').map(num =>+num);
const map = Array.from({length:M},(_,i) => input[i+1].split(' ').map(num =>+num));
let checkLoad = Array.from({length:M},()=>Array(N).fill(0));
let visited = Array.from({length:M},()=>Array(N).fill(false));
const isValidPos =(y,x) => (y>=0 && x>=0 && y<M && x<N);
let count = dfs(0,0);
console.log(count);


function dfs(y,x){
    if(y === M-1 && x === N-1){
        return 1
    }
    // 이미 한번 방문했던 곳이라면 바로 return 해줌
    if(visited[y][x]) return checkLoad[y][x];

    if(checkLoad[y][x]){
        return checkLoad[y][x]
    }
    
    [[y+1,x],[y-1,x],[y,x+1],[y,x-1]]
    .forEach(([ny,nx])=>{
        if(!isValidPos(ny,nx)) return;
        if(map[y][x] > map[ny][nx]){
            checkLoad[y][x] += dfs(ny,nx);
        }
    })
    // 더이상 동서남북 방향으로 갈곳이 없으므로
    // 이곳은 이미 방문해서 경로를 다 확인했으므로
    // visited를 방문했다 처리한다.
    // 그리고 return checkLoad[y][x]
    visited[y][x] =true;

    return checkLoad[y][x]

}
