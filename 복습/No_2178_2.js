// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input =[
    '4 6',
    '110110',
    '110110',
    '111111',
    '111101'
]
const [N,M] = input[0].split(' ').map(num => +num);
let maze = Array.from({length:N},(_,i)=>input[i+1].split('').map(num=>+num));

bfs(0,0);

function bfs(y,x){
    let queue = [[y,x]];
    
    while(queue.length){
        const [curY,curX] = queue.shift();

        [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
        .forEach(([y,x])=>{
            if(y<0 || x<0 || y>=N || x>=M) return;
            if(maze[y][x] === 1){
                maze[y][x] = maze[curY][curX] + 1;
                queue.push([y,x])
            }
        })
    }
    return console.log(maze[N-1][M-1]); 
}