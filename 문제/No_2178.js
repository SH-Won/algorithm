const fs = require('fs');
const input = fs .readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '4 6',
//     '110110',
//     '110110',
//     '111111',
//     '111101'
// ]

const [N,M] = input[0].split(' ').map(num =>+num);
const distance = [[1,0],[-1,0],[0,1],[0,-1]];
let graph = Array.from({length:N},(_,i)=>input[i+1].split('').map(num=>+num));
let visited = Array.from({length:N},()=>Array(M).fill(0));


bfs(0,0);

console.log(visited[N-1][M-1]);
function bfs(y,x){
    let queue = [[y,x]];
    let curX,curY,nextX,nextY;
    visited[y][x] = 1;

    while(queue.length){
        [curY,curX]=queue.shift();

        distance.forEach(([y,x])=>{
            nextY = curY + y;
            nextX = curX + x;
            if(nextX<0 || nextY<0 || nextX >=M || nextY >=N)
            return;
            if(graph[nextY][nextX] && !visited[nextY][nextX]){
                visited[nextY][nextX] = visited[curY][curX] + 1;
                queue.push([nextY,nextX]);
            }
        })


    }

}