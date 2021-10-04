// const input = [
// '5 4 4',
// '0 0 0 0 3',
// '0 2 0 0 0',
// '1 0 0 0 4',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '4 4 3 1',
// '2 3 1 4',
// '4 1 2 3',
// '3 4 2 1',
// '4 3 1 2',
// '2 4 3 1',
// '2 1 3 4',
// '3 4 1 2',
// '4 1 2 3',
// '4 3 2 1',
// '1 4 3 2',
// '1 3 2 4',
// '3 2 1 4',
// '3 4 1 2',
// '3 2 4 1',
// '1 4 2 3',
// '1 4 2 3',
// ]
// const input = [
// '4 2 6',
// '1 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 2',
// '4 3',
// '1 2 3 4',
// '2 3 4 1',
// '3 4 1 2',
// '4 1 2 3',
// '1 2 3 4',
// '2 3 4 1',
// '3 4 1 2',
// '4 1 2 3',
// ]
// const input = [
// '5 4 1',
// '0 0 0 0 3',
// '0 2 0 0 0',
// '1 0 0 0 4',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '4 4 3 1',
// '2 3 1 4',
// '4 1 2 3',
// '3 4 2 1',
// '4 3 1 2',
// '2 4 3 1',
// '2 1 3 4',
// '3 4 1 2',
// '4 1 2 3',
// '4 3 2 1',
// '1 4 3 2',
// '1 3 2 4',
// '3 2 1 4',
// '3 4 1 2',
// '3 2 4 1',
// '1 4 2 3',
// '1 4 2 3'
// ]
const input = [
'5 4 10',
'0 0 0 0 3',
'0 0 0 0 0',
'1 2 0 0 0',
'0 0 0 0 4',
'0 0 0 0 0',
'4 4 3 1',
'2 3 1 4',
'4 1 2 3',
'3 4 2 1',
'4 3 1 2',
'2 4 3 1',
'2 1 3 4',
'3 4 1 2',
'4 1 2 3',
'4 3 2 1',
'1 4 3 2',
'1 3 2 4',
'3 2 1 4',
'3 4 1 2',
'3 2 4 1',
'1 4 2 3',
'1 4 2 3',
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
const [N,M,k]  = input[index++].split(' ').map(Number);
// 1 위 2 아래 3 왼쪽 4 오른쪽
let board = Array.from({length:N},()=>input[index++].split(' ').map(Number));
let newBoard = Array.from({length:N},()=>Array(N));
let smellBoard = Array.from({length:N},()=>Array(N).fill(0));
const startDir = input[index++].split(' ').map(num => +num -1);
const prior = Array.from({length:4*startDir.length},()=>input[index++].split(' ').map(num => +num -1));
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<N);
class Smell{
    constructor(y,x,k,number){
        this.y = y
        this.x = x
        this.k = k
        this.number = number;
    }
    fade(){
        this.k-=1;
    }
}
class Shark{
    constructor(y,x,number,dir){
        this.y = y
        this.x = x
        this.number = number;
        this.dir = dir;
    }
    move(){
        const dir = 4*(this.number-1) + this.dir;
        const pDir = prior[dir];
        for(let i=0; i<pDir.length; i++){
            const [ny,nx] = [this.y + dy[pDir[i]],this.x + dx[pDir[i]]];
            if(!isValidPos(ny,nx) || smellBoard[ny][nx]) continue;
            this.y = ny , this.x = nx , this.dir = pDir[i];
            return;
        }
        for(let i=0; i<pDir.length; i++){
            const [ny,nx] = [this.y + dy[pDir[i]],this.x + dx[pDir[i]]];
            if(isValidPos(ny,nx) && smellBoard[ny][nx].number === this.number){
                this.y = ny , this.x = nx , this.dir = pDir[i];
                return 
            }
        }
    }
}
let sharks = [];

for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        if(board[y][x]) sharks.push(new Shark(y,x,board[y][x],startDir[board[y][x]-1]));
    }
}

const setShark = (shark) =>{
    const {y,x,number} = shark;
    if(!newBoard[y][x]) newBoard[y][x] = shark;
    else{
        if(newBoard[y][x].number > number) newBoard[y][x] = shark;
    }
}
const setSmell = (shark) =>{
    const {y,x,number} = shark;
    if(!smellBoard[y][x]){
    smellBoard[y][x] = new Smell(y,x,k,number);
    }
    else{
        smellBoard[y][x].k = k;
    }
}
const clearBoard = () =>{
    const prev = newBoard;
    newBoard = Array.from({length:N},()=>Array(M).fill(0));
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const shark = prev[y][x];
            const smell = smellBoard[y][x];
            if(shark) setSmell(shark);
            if(smell && smell.k === 0) smellBoard[y][x] = 0; 
        }
    }
    return prev;
}

let time = 0;
sharks.forEach(shark => setShark(shark));

while(time <1000){
    const board = clearBoard();
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const shark = board[y][x];
            const smell = smellBoard[y][x];
            if(shark){
                shark.move();
                setShark(shark);
            }
            if(smell){
                smell.fade();
            }
        }
    }
    time++;
    let check = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const shark = newBoard[y][x];
            if(shark) check.push(shark);
        }
    }
    if(check.length ===1 && check[0].number === 1) return console.log(time);
}
console.log(-1);
// 121분 걸림 


