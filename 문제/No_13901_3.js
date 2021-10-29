const input = [
'3 3',
'1',
'1 0',
'1 1',
'1 2 3 4'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const k = +input[1];
let index = 2;
let map = Array.from({length:R},()=>Array(C).fill(0));
for(let i=0; i<k; i++){
    const [y,x] =input[index++].split(' ').map(Number);
    map[y][x] = 1;
}
const [sy,sx] = input[index++].split(' ').map(Number);
const command = input[index].split(' ').map(num => +num-1);
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
let visited = Array.from({length:R},()=>Array(C).fill(false));
const isMove = (y,x) =>{
      for(let i=0; i<4; i++){
          const [ny,nx] = [y+dy[i],x+dx[i]];
          if(isValidPos(ny,nx) && !map[ny][nx] && !visited[ny][nx]) return true;
      }
      return false;
}
const solution = () =>{
    let [y,x] = [sy,sx];
    let dir = 0;
    visited[y][x] = true;
    while(true){
        if(!isMove(y,x)) return console.log(y,x);
        while(true){
            [y,x] = [y+dy[command[dir]],x+dx[command[dir]]];
            if(!isValidPos(y,x) || visited[y][x] || map[y][x]) break;
            visited[y][x] = true;
        }
        [y,x] = [y-dy[command[dir]],x-dx[command[dir]]];
        dir = dir+1 > 3 ? 0 : dir+1;
    }
    
}
solution();