// const input = [
// '4 4',
// '0 0 2 0',
// '0 0 1 0',
// '0 0 1 2',
// '0 2 0 0',
// '2 1 1',
// '3 2 3',
// '2 2 1',
// '4 1 2'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '1 4 1'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '2 4 3'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '3 3 3'
// ]
const input = [
'6 10',
'0 1 2 0 1 1',
'1 2 0 1 1 0',
'2 1 0 1 1 0',
'1 0 1 1 0 2',
'2 0 1 2 0 1',
'0 2 1 0 2 1',
'1 1 1',
'2 2 2',
'3 3 4',
'4 4 1',
'5 5 3',
'6 6 2',
'1 6 3',
'6 1 2',
'2 4 3',
'4 2 1',
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(Number);
const chessBoard = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
class Horse {
    constructor(y,x,dir){
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
}
const horses = Array.from({length:K},(_,i)=> new Horse(...input[i+N+1].split(' ').map(num => +num -1)));
const dy = [0,0,-1,1];
const dx = [1,-1,0,0];
// 0 흰색 1빨간색 2 파란색;
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const horseMove = (horse,horseBoard) =>{
    // console.log(horse);
     let {y,x,dir} = horse;
     let [ny,nx] = [y+dy[dir],x+dx[dir]];
     const horseIndex = horseBoard[y][x].findIndex(el => el === horse);
     let moveHorses ;
     if(!isValidPos(ny,nx) || chessBoard[ny][nx] === 2 ){
         if(dir < 2) dir === 0 ? dir = 1 : dir= 0
         else {dir ===2 ? dir = 3 : dir = 2}

         [ny,nx] = [y+dy[dir],x+dx[dir]];
         horse.dir = dir;
         if(isValidPos(ny,nx) && chessBoard[ny][nx] !== 2 ){
            //  console.log("move");
             const isFinish = horseMove(horse,horseBoard);
             return isFinish
         }
         return false;
     }
     else if(chessBoard[ny][nx] === 0){
         moveHorses = horseBoard[y][x].splice(horseIndex);
     }
     else if(chessBoard[ny][nx] === 1){
         moveHorses = horseBoard[y][x].splice(horseIndex).reverse();
     }
     moveHorses.forEach(horse =>{ horse.y = ny , horse.x = nx});
     horseBoard[ny][nx].push(...moveHorses);
     if(horseBoard[ny][nx].length >=4) return true;
     return false;
}
const solution = (horses) =>{
    let horseBoard = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    horses.forEach(horse => horseBoard[horse.y][horse.x].push(horse));
    let time = 0;
    while(time <1000){
        time++;
        for(let i=0; i<horses.length; i++){
            const isFinish = horseMove(horses[i],horseBoard);
            if(isFinish) return console.log(time);
            // console.log(horseBoard);
        }
        
    }
    console.log(-1);
}
solution(horses);