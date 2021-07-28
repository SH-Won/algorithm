// const fs =require('fs');
// const input =fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '4 6',
    '101111',
    '101010',
    '101011',
    '111011'
]
const [N,M]= input[0].split(' ').map(num => +num);
let graph = Array.from({length:N},(_,i)=> input[i+1].split('').map(num => +num));
let visited = Array.from({length:N}, ()=>Array(M).fill(0));
const distance =[[1,0],[-1,0],[0,1],[0,-1]];

bfs(0,0);
console.log(visited[N-1][M-1]);

function bfs(y,x){
    let queue = [[y,x]];
    let curX,curY,nextX,nextY;
    visited[y][x] = 1;

    while(queue.length){
        [curY,curX] = queue.shift();

        distance.forEach(([y,x])=>{
            nextX = curX + x;
            nextY = curY + y;
            if(nextX < 0 || nextY <0 || nextX >=M || nextY >=N){
                return;
            }
            if(!visited[nextY][nextX] && graph[nextY][nextX]){
                visited[nextY][nextX] = visited[curY][curX] + 1;
                queue.push([nextY,nextX]);
            }

        })


    }

}
