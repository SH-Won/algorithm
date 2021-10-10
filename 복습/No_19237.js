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
// const input = [
//     '5 4 10',
//     '0 0 0 0 3',
//     '0 0 0 0 0',
//     '1 2 0 0 0',
//     '0 0 0 0 4',
//     '0 0 0 0 0',
//     '4 4 3 1',
//     '2 3 1 4',
//     '4 1 2 3',
//     '3 4 2 1',
//     '4 3 1 2',
//     '2 4 3 1',
//     '2 1 3 4',
//     '3 4 1 2',
//     '4 1 2 3',
//     '4 3 2 1',
//     '1 4 3 2',
//     '1 3 2 4',
//     '3 2 1 4',
//     '3 4 1 2',
//     '3 2 4 1',
//     '1 4 2 3',
//     '1 4 2 3',
//     ]
//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
let i = 0;
const [N,M,K] = input[i++].split(' ').map(Number);
let board = Array.from({length:N},()=>input[i++].split(' ').map(Number));
let smellBoard = Array.from({length:N},()=>Array(N).fill(null));
const startDir = input[i++].split(' ').map(num => +num -1);
const prior = Array.from({length:M*4},()=>input[i++].split(' ').map(num => +num -1));
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
class Shark{
    constructor(y,x,dir,number){
        this.y = y;
        this.x = x;
        this.dir = dir;
        this.number = number;
    }

    move(){
        const pDir = (this.number - 1) * 4 + this.dir 
        const priorDirection = prior[pDir];
        let [ny,nx] = [null,null];
        for(let i=0; i<priorDirection.length; i++){
             [ny,nx] = [this.y + dy[priorDirection[i]], this.x + dx[priorDirection[i]]];
            if(!isValidPos(ny,nx) || smellBoard[ny][nx] ) continue;
            this.y = ny , this.x = nx , this.dir = priorDirection[i];
            return 
        }
        
        for(let i=0; i<priorDirection.length; i++){
            [ny,nx] = [this.y + dy[priorDirection[i]], this.x + dx[priorDirection[i]]];
            if(isValidPos(ny,nx) && smellBoard[ny][nx].number === this.number ){
                this.y = ny, this.x = nx , this.dir = priorDirection[i];
                return;
            }
        }

    }
}
class Smell{
    constructor(number,k){
        this.number = number;
        this.k = k;
    }
    fade(){
        this.k-=1;
    }
}


let sharks = [];
for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        if(board[y][x]){
        sharks.push(new Shark(y,x,startDir[board[y][x]-1],board[y][x]));
        board[y][x] = 0;
        }
    }
}

const clearBoard = () =>{
    const prev = board;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const shark = board[y][x];
            const smell = smellBoard[y][x];
            if(shark){
                if(!smell) smellBoard[y][x] = new Smell(shark.number,K);
                else smell.k = K;
            }
            else if(smell && smell.k === 0) smellBoard[y][x] = 0;
        }
    }
    board = Array.from({length:N},()=>Array(N));
    return prev;
}
const setShark = (shark) =>{
    const {y,x} = shark;
    if(!board[y][x]) board[y][x] = shark;
    else if(board[y][x].number > shark.number) board[y][x] = shark;
}
sharks.forEach(shark => setShark(shark));
//console.log(board);
let time = 0;
while(time < 1000){

    const prev = clearBoard();
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const shark = prev[y][x];
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
            const shark = board[y][x];
            if(shark) check.push(shark);
        }
    }
    if(check.length ===1 && check[0].number === 1) return console.log(time);

}
console.log(-1);

