// const input = [
// '3 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1'
// ]
// const input = [
// '3 2',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2'
// ]
// const input = [
// '3 5',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2 1 2 3 2 3'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 1 2 3 1 2 3 1',
// ]
const input = [
'3 10',
'1 0 3 4 5 6 7 0',
'8 0 6 5 4 3 2 1',
'1 2 0 4 5 6 7 0',
'8 7 6 5 4 3 2 1',
'1 2 3 4 0 6 7 0',
'8 7 0 5 4 3 2 1',
'1 2 3 4 5 6 7 0',
'0 7 0 5 4 3 2 1',
'1 2 3 1 2 3 1 2 3 1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
let board = Array.from({length:Math.pow(2,N)},(_,i)=>input[i+1].split(' ').map(Number));
let visited = Array.from({length:Math.pow(2,N)},()=>Array(Math.pow(2,N)).fill(false));
const command = input[Math.pow(2,N)+1].split(' ').map(Number);
const isValidPos = (y,x) => (y>=0 && x>=0 && y<Math.pow(2,N) && x<Math.pow(2,N));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];

const melt = () =>{
    let meltList = [];
    for(let y=0; y<Math.pow(2,N); y++){
        for(let x=0; x<Math.pow(2,N); x++){
            if(board[y][x]){
                let count = 0;
                for(let i=0; i<4; i++){
                    const [ny,nx] = [y+dy[i],x+dx[i]];
                    if(isValidPos(ny,nx) && board[ny][nx] > 0) count++;
                }
                if(count < 3) meltList.push([y,x]);
            }
        }
    }
    meltList.forEach(([y,x])=> board[y][x]--);
}
const rotate = (y,x,L) =>{
    let temp = Array.from({length:L},()=>Array(L));
    for(let i=0; i<L; i++){
        for(let j=0; j<L; j++){
            temp[j][L-i-1] = board[y+i][x+j];
        }
    }
    for(let i=0; i<L; i++){
        for(let j=0; j<L; j++){
            board[y+i][x+j] = temp[i][j];
        }
    }
}
const getMaxIce = (y,x) =>{
    let count = 0;
    let queue = [[y,x]];
    visited[y][x] = true;
    while(queue.length){
        const [cy,cx] = queue.shift();
        count++;
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || !board[ny][nx]) continue;
            visited[ny][nx] = true;
            queue.push([ny,nx]);
        }
    }
    return count ;
}
const solution = () =>{
let maxCount = 0;
let i=0;
while(i < command.length){
    const L = command[i];
    for(let y=0; y<Math.pow(2,N); y+=Math.pow(2,L)){
        for(let x=0 ; x<Math.pow(2,N); x+=Math.pow(2,L)){
            
            rotate(y,x,Math.pow(2,L));
        }
    }
    melt();
    i++;
}
for(let y=0; y<Math.pow(2,N); y++){
    for(let x=0; x<Math.pow(2,N); x++){
        if(!visited[y][x] && board[y][x]){
            maxCount = Math.max(maxCount,getMaxIce(y,x));
        }
    }
}
const sum = board.reduce((acc,cur)=>acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
return console.log(sum+'\n'+maxCount)
}
solution();
