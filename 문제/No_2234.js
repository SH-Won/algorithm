// console.log(Number(8).toString(2));
// console.log((1<<3).toString(2));
// console.log(Number(11) & 1<<2);
// console.log(Number(11).toString(2));
// console.log((1<<2).toString(2));
const input = ['7 4','11 6 11 6 3 10 6','7 9 6 13 5 15 5','1 10 12 7 13 7 5','13 11 10 8 10 12 13'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n,m] = input[0].split(' ').map(Number);
let map = Array.from({length:m},(_,i)=>input[i+1].split(' ').map(Number));
let group =Array.from({length:m},()=>Array(n));
let visited = Array.from({length:m},()=>Array(n).fill(false));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<m && x<n);
const dy = [0,-1,0,1];
const dx = [-1,0,1,0];
let room = []
const bfs = (y,x,number) =>{
     visited[y][x] = true;
     group[y][x] = number;
     let count = 0;
     let queue = [[y,x]];
     while(queue.length){
         const [cy,cx] = queue.shift();
         count++;
         for(let dir=0; dir<4; dir++){
             const [ny,nx] = [cy+dy[dir],cx+dx[dir]];
             if(!isValidPos(ny,nx) || visited[ny][nx] || map[cy][cx] & 1<<dir) continue;
             group[ny][nx] = number;
             visited[ny][nx] = true;
             queue.push([ny,nx]);
         }
     }
     return count;
}
let number = -1
for(let y=0; y<m; y++){
    for(let x=0; x<n; x++){
        if(!visited[y][x]){
        number++;
        const count = bfs(y,x,number);
        room.push(count);
        }
    }
}
// console.log(group.map(row => row.join(' ')).join('\n'))
// console.log(room);
let max =0;
for(let y=0; y<m; y++){
    for(let x=0; x<n; x++){
        const currentRoom = group[y][x];
        for(let i=0; i<4; i++){
           const [ny,nx] = [y+dy[i],x+dx[i]];
           if(!isValidPos(ny,nx)) continue;
           const nextRoom =group[ny][nx];
           if(currentRoom === nextRoom) continue;
           max = Math.max(max, room[currentRoom]+room[nextRoom]);
        }
    }
}
const answer = `${room.length}\n${Math.max(...room)}\n${max}`;
console.log(answer);
