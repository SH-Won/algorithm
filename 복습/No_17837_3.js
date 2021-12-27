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

function Horse(y,x,dir){
    this.y = y;
    this.x = x;
    this.dir = dir;
}

const moveHorse =(horse) =>{
   let {y,x,dir} = horse;
   const [dy,dx] = [horse.dy,horse.dx];
   const [ny,nx] = [y+dy[dir],x+dx[dir]];
   if(!horse.isValidPos(ny,nx) || horse.map[ny][nx] === 2 ){
      dir = dir < 2 ? dir === 1 ? 0 : 1 : dir===2 ? 3 : 2;
      const [ny,nx] = [y+dy[dir],x+dx[dir]];
      horse.dir = dir;
      if(!horse.isValidPos(ny,nx) || horse.map[ny][nx] === 2){
          return false;
      }
      const isFinish = moveHorse(horse);
      return isFinish;
   }
   else if(horse.map[ny][nx] === 0){
       const index = horse.board[y][x].findIndex(horse => horse);
       let horses = horse.board[y][x].splice(index);
       horses.forEach(horse => horse.y = ny , horse.x = nx);
       horse.board[ny][nx].push(...horses);
   }
   else if(horse.map[ny][nx] ===1){
       const index = horse.board[y][x].findIndex(horse => horse);
       let horses = horse.board[y][x].splice(index).reverse();
       horses.forEach(horse => horse.y = ny , horse.x = nx);
       horse.board[ny][nx].push(...horses);
   }
   if(horse.board[ny][nx].length >= 4) return true;
   return false; 
}

const solution = (input) =>{
    const [N,K] = input[0].split(' ').map(Number);
    // 0 흰색 1빨간색 2 파란색;
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    let board = Array.from({length:N},()=>Array.from({length:N},()=>[]))
    Horse.prototype.map = map , Horse.prototype.board = board;
    Horse.prototype.dy = [0,0,-1,1] , Horse.prototype.dx = [1,-1,0,0];
    Horse.prototype.isValidPos = function(y,x){ return y>=0 && x>=0 && y<N && x<N};
    let horses = Array.from({length:K},(_,i) => new Horse(...input[i+N+1].split(' ').map(num => +num -1)))
    horses.forEach(horse => board[horse.y][horse.x].push(horse));
    let time = 0;
    while(time < 1000){
        time++;
        // console.log(board);
        for(let i=0; i<horses.length; i++){
            const isFinish = moveHorse(horses[i]);
            if(isFinish) return console.log(time);
        }
        // console.log(board);
    }
    console.log(-1);
}
solution(input);