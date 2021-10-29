const input = [
'3 3',
'1',
'1 0',
'1 1',
'1 2 3 4'
]
// const input = [
//     '4 4',
//     '3',
//     '1 0',
//     '2 0',
//     '3 1',
//     '3 1',
//     '1 2 3 4'
//     ]
// const input = [
//     '100 100',
//     '0',
//     '1 1',
//     '1 2 3 4'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const k = +input[1];
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
let visited = Array.from({length:R},()=>Array(C).fill(false));
const bfs = (sy,sx,command,map) =>{
    visited[sy][sx] = true;    
    let queue = [[sy,sx,0]]
    while(queue.length){
        const [y,x,curDir] = queue.shift();
        let [cy,cx,dir] = [y,x,curDir];
        let count = 4;
        while(count--){
            const [ny,nx] = [cy+dy[command[dir]],cx+dx[command[dir]]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx]){
                dir = dir+1 > 3 ? 0 : dir+1;
                continue;
            }
            break;
        }
        if(count===-1 && curDir === dir) return console.log(y,x);
        let [ny,nx] = [cy+dy[command[dir]],cx+dx[command[dir]]];
        
        while(isValidPos(ny,nx) && !visited[ny][nx] && !map[ny][nx]){
            visited[ny][nx] = true;
           ny+=dy[command[dir]] , nx+=dx[command[dir]];
           
        }
        [ny,nx] = [ny-dy[command[dir]],nx-dx[command[dir]]];
        visited[ny][nx] = true;
        queue.push([ny,nx,dir+1 > 3 ? 0 : dir+1]);
    }
}
const solution = () =>{
    let index = 2;
    let map = Array.from({length:R},()=>Array(C).fill(0));
    for(let i=0; i<k; i++){
        const [y,x] =input[index++].split(' ').map(Number);
        map[y][x] = 1;
    }
    // console.log(map.map(row => row.join(' ')).join('\n'));
    const [sy,sx] = input[index++].split(' ').map(Number);
    // console.log(sy,sx);
    const command = input[index].split(' ').map(num => +num -1);
    
    bfs(sy,sx,command,map);
}
solution();

// const readline = require('readline');
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// });
// let input = [];
// rl.on("line",line =>{
//     input.push(line)
// }).on("close",()=>{
//     solution(input)
//     process.exit();
// })