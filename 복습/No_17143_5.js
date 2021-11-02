//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,M] = input[0].split(' ').map(Number);
class Shark{
    constructor(r,c,s,d,z){
        this.r = r-1;
        this.c = c-1;
        this.s = d <= 2 ? s % (2*(R-1)) : s % (2*(C-1));
        this.d = d-1;
        this.size = z;
    }
}
Shark.prototype.dy = [-1,1,0,0];
Shark.prototype.dx = [0,0,1,-1];
Shark.prototype.getMovePos = getMovePos;
Shark.prototype.move = move;

function getMovePos(from,to,position){
    let rotateCount = 0;
    while(true){
        if(position < from){
            rotateCount++;
            position = (-1) * position;
        }
        else if(position >=to){
            rotateCount++;
            position = 2*(to-1) - position
        }
        else break;
    }
    return [position,rotateCount];
}
function move(){
    if(this.d === 0){
        const position = this.r - this.s;
        const [row,rotateCount] = this.getMovePos(0,R,position);
        this.r = row;
        this.d = rotateCount % 2 === 0 ? 0 : 1
    }
    else if(this.d === 1){
        const position = this.r + this.s;
        const [row,rotateCount] = this.getMovePos(0,R,position);
        this.r = row;
        this.d = rotateCount % 2 === 0 ? 1 : 0
    }
    else if(this.d === 2){
        const position = this.c + this.s;
        const [column,rotateCount] = this.getMovePos(0,C,position);
        this.c = column;
        this.d = rotateCount % 2 === 0 ? 2 : 3
    }
    else if(this.d === 3){
        const position = this.c - this.s;
        const [column,rotateCount] = this.getMovePos(0,C,position);
        this.c = column;
        this.d = rotateCount % 2 === 0 ? 3 : 2
    }

}

const fishing = (fisher,board) =>{
    for(let r=0; r<R; r++){
        if(board[r][fisher]){
            const size = board[r][fisher].size;
            board[r][fisher] = null
            return size;
        }
    }
    return 0
}
const setShark = (shark,board) =>{
    const {r,c} = shark;
    if(!board[r][c]) board[r][c] = shark;
    else if( shark.size > board[r][c].size) board[r][c] = shark;
}
const solution = (input) =>{
    let board = Array.from({length:R},()=>Array(C).fill(null));
    let sharks = Array.from({length:M},(_,i)=> new Shark(...input[i+1].split(' ').map(Number)));
    let sum = 0;
    sharks.forEach(shark => setShark(shark,board));
    
    for(let fisher=0; fisher<C; fisher++){
        sum += fishing(fisher,board);
        const currentBoard = board;
        board = Array.from({length:R},()=>Array(C).fill(null));
        for(let r=0; r<R; r++){
            for(let c=0; c<C; c++){
                const shark = currentBoard[r][c];
                if(shark){
                    shark.move();
                    setShark(shark,board);
                }
            }
        }
    }
    console.log(sum);
}
solution(input);


// class Shark{
//     constructor(y,x){
//         this.y = y;
//         this.x = x;
//     }
// }
// Shark.prototype.move = move;

// // function move(){
// //     // const that = this;
// //     this.y = 1;
// //     console.log(this.y,this.x);
// // }
// // let sharks=Array.from({length:3},(_,i)=> new Shark(0,i));
// // sharks[1].move();