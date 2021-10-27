const input = ['1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 2 1','1 1 1 1 1']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const map = Array.from({length:5},(_,i)=>input[i].split(' '));
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<5 && x<5);
let numberMap = new Set();

const dfs = (y,x,count,curNumber) =>{
    if(count === 5){
        return numberMap.add(curNumber);
    }
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        if(!isValidPos(ny,nx)) continue;
        const nextNumber = curNumber + map[ny][nx];
        dfs(ny,nx,count+1,nextNumber);
    }
}
for(let y=0; y<5; y++){
    for(let x=0; x<5; x++){
        dfs(y,x,0,map[y][x]);
    }
}
console.log(numberMap);
console.log(numberMap.size)