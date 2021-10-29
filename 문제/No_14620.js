const input = [
'6',
'1 0 2 3 3 4',
'1 1 1 1 1 1',
'0 0 1 1 1 1',
'3 9 9 0 1 99',
'9 11 3 1 0 3',
'12 3 0 0 0 1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const price = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let min = Infinity;
let visited = Array.from({length:N},()=>Array(N).fill(false));
let flower = Array(3);
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const check = (y,x) =>{
    if(visited[y][x]) return false;
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        if(visited[ny][nx]) return false;
    }
    return true
}
const setVisit_getSum = (y,x) =>{
    let sum = price[y][x];
    visited[y][x] = true;
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        visited[ny][nx] = true;
        sum+=price[ny][nx];
    }
    return sum
}
const resetVisit = (y,x) =>{
    visited[y][x] = false;
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        visited[ny][nx] = false;
    }
}

const getMinPrice = (index,count,curSum) =>{
    if(count === 3){
       min = Math.min(curSum,min);
       return;
    }

    for(let i=index; i<N*(N-1); i++){
        const [y,x] = [Math.floor(i / N), i % N];
        if(x === 0 || x===N-1) continue;
        if(!check(y,x)) continue;
        const sum = setVisit_getSum(y,x);
        const nextSum = curSum + sum;
        getMinPrice(i+3,count+1,nextSum);
        resetVisit(y,x);
    }

}
getMinPrice(N+1,0,0);
console.log(min);