// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '6 4',
//     '0100',
//     '1110',
//     '1000',
//     '0000',
//     '0111',
//     '0000'
// ]
// const input =[
//     '4 4',
//     '0111',
//     '1111',
//     '1111',
//     '1110'
// ]
const input =[
    '6 4',
    '0000',
    '1110',
    '1000',
    '0000',
    '0111',
    '0000'
]

const [N,M]=input[0].split(' ').map(num => +num);
const load = Array.from({length:N},(_,i)=>input[i+1].split('').map(num=>+num));
let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(2).fill(0)));
const distance = [[1,0],[-1,0],[0,1],[0,-1]]
let way =bfs(0,0);
console.log(way);
console.log(visited)


function bfs(y,x){
    let block = 1;
    let queue = [[y,x,block]];
    visited[y][x][block] = 1;

    while(queue.length){
        const [curY,curX,block] = queue.shift();

        if(curY ===N-1 && curX ===M-1){
            
            return visited[curY][curX][block];
        }
        
        

        distance.forEach(([y,x])=>{
            const [nextY,nextX] = [curY+y,curX+x];
            if(nextY < 0 || nextY >=N || nextX <0 || nextX >=M){
                return;
            }
            if(load[nextY][nextX] === 1 && block){
                visited[nextY][nextX][block-1] = visited[curY][curX][block] +1;
                queue.push([nextY,nextX,block-1]);
            }
            if(!load[nextY][nextX] && !visited[nextY][nextX][block] ){
                visited[nextY][nextX][block] = visited[curY][curX][block] +1;
                queue.push([nextY,nextX,block])

            }
        })

    }
    return -1;  
}