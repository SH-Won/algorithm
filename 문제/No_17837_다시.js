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
// const input = [
// '6 10',
// '0 1 2 0 1 1',
// '1 2 0 1 1 0',
// '2 1 0 1 1 0',
// '1 0 1 1 0 2',
// '2 0 1 2 0 1',
// '0 2 1 0 2 1',
// '1 1 1',
// '2 2 2',
// '3 3 4',
// '4 4 1',
// '5 5 3',
// '6 6 2',
// '1 6 3',
// '6 1 2',
// '2 4 3',
// '4 2 1',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N,K] = input[0].split(' ').map(Number);
const board = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const dy = [0,0,0,-1,1];
const dx = [0,1,-1,0,0];
// 0은 흰색 1은 빨간색 2는 파란색
class Chess {
    constructor(y,x,dir){
        this.y = y-1;
        this.x = x-1;
        this.dir = dir
    }
}
const solution = ()=>{
    let chesses = Array.from({length:K},(_,i)=> new Chess(...input[N+1+i].split(' ').map(Number)));
    let newBoard = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    chesses.forEach(chess => newBoard[chess.y][chess.x].push(chess));
    let time = 0;
    //console.log(newBoard);
    //console.log(newBoard[2][1].findIndex(el => el === chesses[1]))
    const move = () =>{
        for(let number=0; number<chesses.length; number++){
            let chess = chesses[number];
            let [ny,nx] = [chess.y + dy[chess.dir],chess.x + dx[chess.dir]];
            
            // 하얀색
             if(!isValidPos(ny,nx) || board[ny][nx] ===2){
                if(chess.dir <=2){
                   chess.dir = chess.dir === 1 ? 2 : 1;
                   [ny,nx] = [chess.y + dy[chess.dir], chess.x + dx[chess.dir]];
                   if(!isValidPos(ny,nx) || board[ny][nx] === 2) continue;
                   number--;
                   continue;                 
                }
                else{
                    chess.dir = chess.dir === 3 ? 4 : 3;
                    [ny,nx] = [chess.y + dy[chess.dir], chess.x + dx[chess.dir]];
                    if(!isValidPos(ny,nx) || board[ny][nx] === 2) continue;
                    number--;
                    continue; 
                }
            }
            else if(board[ny][nx] === 0){
               let temp = [];
               const index = newBoard[chess.y][chess.x].findIndex(el => el === chess);
               for(let i=0; i<=index; i++){
                  temp.push(newBoard[chess.y][chess.x][i]);
               }
               newBoard[chess.y][chess.x].splice(0,index+1);
               for(let i=0; i<temp.length; i++){
                   let chess = temp[i];
                   chess.y = ny , chess.x = nx;
               }
               newBoard[ny][nx] = temp.concat(...newBoard[ny][nx]);
               // 맨 꼭대기가 첫째 인덱스
            }
            // 빨간색
            else if( board[ny][nx] === 1){
               let temp = [];
               const index = newBoard[chess.y][chess.x].findIndex(el => el === chess);
               for(let i=0; i<=index; i++){
                   temp.push(newBoard[chess.y][chess.x][i]);
               }
               temp.reverse();
               newBoard[chess.y][chess.x].splice(0,index+1);
               for(let i=0; i<temp.length; i++){
                   let chess = temp[i];
                   chess.y = ny , chess.x = nx;
               }
               newBoard[ny][nx] = temp.concat(...newBoard[ny][nx]);
            }

            

            if(newBoard[ny][nx].length >=4) process.exit(console.log(time));
        }
        
    }
     // move();
     //move();
    //console.log(newBoard);
    // console.log(newBoard[1][2][0].dir);
    while(time <=1000){
        time++;
        move();
    }
    return console.log(-1);
}
solution();
// 2시간이나 걸림 어휴....