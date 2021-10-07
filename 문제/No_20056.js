//const input = ['4 2 1','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 2','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 3','1 1 5 2 2','1 4 7 1 6'];
//const input = ['7 5 3','1 3 5 2 4','2 3 5 2 6','5 2 9 1 7','6 2 1 3 5','4 4 2 4 2'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K] = input[0].split(' ').map(Number);
const dr = [-1,-1,0,1,1,1,0,-1];
const dc = [0,1,1,1,0,-1,-1,-1];
let board = Array.from({length:N},()=>Array.from({length:N},()=>[]));
class FireBall {
    constructor(r,c,m,s,d){
        this.r = r-1;
        this.c = c-1;
        this.m = m;
        this.s = s;
        this.d = d;
    }
    move(){
        const speed = this.s % N;
        const [r,c,d] = [this.r,this.c,this.d];
        const [nr,nc] = [((r+dr[d]*speed)+N)%N ,((c+dc[d]*speed)+N)%N]
        this.r = nr , this.c = nc;
    }
}

const setFireBall = (fireBall) =>{
    const {r,c} = fireBall;
    board[r][c].push(fireBall);
}
const speradFireBall = () =>{
    for(let r=0; r<N; r++){
        for(let c=0; c<N; c++){
            if(board[r][c].length >=2){
                let fireBalls = board[r][c];
                let mSum = 0;
                let mSpeed = 0;
                let odd_or_even =0;
                for(let i=0; i<fireBalls.length; i++){
                    mSum+=fireBalls[i].m;
                    mSpeed+=fireBalls[i].s;
                    odd_or_even+= fireBalls[i].d % 2;
                }
                const splitM = Math.floor(mSum / 5);
                if(splitM === 0){
                    board[r][c] =[];
                    continue;
                }
                const splitS = Math.floor(mSpeed / fireBalls.length);
                const splitD = ( odd_or_even / fireBalls.length  === 0 || odd_or_even / fireBalls.length === 1 ) ?
                               [0,2,4,6] : [1,3,5,7];
                board[r][c] = [];
                for(let i=0; i<splitD.length; i++){
                   board[r][c].push(new FireBall(r+1,c+1,splitM,splitS,splitD[i]));
                } 
            }
        }
    }

}
const clearBoard = () =>{
    const prev = board;
    board = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    return prev

}
let fireBalls = Array.from({length:M},(_,i)=> new FireBall(...input[i+1].split(' ').map(Number)));
fireBalls.forEach(fireball => setFireBall(fireball));

let k = K;
while(k--){
    const newBoard = clearBoard();
    
    for(let r=0; r<N; r++){
        for(let c=0; c<N; c++){
            if(newBoard[r][c].length){
                const fireBalls = newBoard[r][c]
                for(let i=0; i<fireBalls.length; i++){
                    fireBalls[i].move();
                    setFireBall(fireBalls[i]);
                }
            }
        }
    }

    speradFireBall();
}

const answer = board.reduce((acc,cur)=>{
     return acc+=cur.reduce((acc,cur)=>{
         if(cur) return acc+=cur.reduce((acc,cur)=>acc+=cur.m,0);
         return acc;
     },0)
},0)

console.log(answer);


