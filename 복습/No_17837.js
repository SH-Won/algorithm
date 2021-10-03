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

class Chess{
    constructor(y,x,dir){
        this.y = y-1;
        this.x = x-1;
        this.dir = dir;
    }
}

const solution = () =>{
    let index = 0;
    let time = 0;
    const [N,K] = input[index++].split(' ').map(Number);
    const board = Array.from({length:N},()=>input[index++].split(' ').map(Number));
    let chessBoard = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    let chesses = Array.from({length:K},()=> new Chess(...input[index++].split(' ').map(Number)));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const dy = [0,0,0,-1,1];
    const dx = [0,1,-1,0,0];
    // 0 흰색 1 빨간색 2 파란색
    chesses.forEach(chess => chessBoard[chess.y][chess.x].push(chess));
    const gameStart = () =>{
        for(let number=0; number<K; number++){
            let chess = chesses[number];
            const {y,x,dir} = chess;
            let [ny,nx] = [y+dy[dir],x+dx[dir]];
           if( !isValidPos(ny,nx) || board[ny][nx] ===2){
               if(dir <=2) chess.dir = dir===1 ? 2 : 1;
               else chess.dir = dir===3 ? 4 : 3;
               [ny,nx] = [y+dy[chess.dir],x+dx[chess.dir]]; 
               if(!isValidPos(ny,nx) || board[ny][nx] ===2) continue;
               number--;
               continue;
           }
           else if(board[ny][nx] === 0){
                const index = chessBoard[y][x].findIndex(el => el===chess);
                let temp = chessBoard[y][x].splice(index);
                temp.forEach(chess =>{ chess.y = ny, chess.x =nx});
                chessBoard[ny][nx] = chessBoard[ny][nx].concat(...temp);
            }
           else if(board[ny][nx] === 1){
                const index = chessBoard[y][x].findIndex(el => el===chess);
                let temp = chessBoard[y][x].splice(index).reverse();
                temp.forEach(chess =>{ chess.y = ny, chess.x =nx});
                chessBoard[ny][nx] = chessBoard[ny][nx].concat(...temp);
            }
            if(chessBoard[ny][nx].length >=4) process.exit(console.log(time));
        }

    }
    
    while(time <=1000){
        time++;
        gameStart();
    }
    return console.log(-1);
}
solution();