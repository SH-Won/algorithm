// const input = ['4 4','0 0 2 0','0 0 1 0','0 0 1 2','0 2 0 0','2 1 1','3 2 3','2 2 1','4 1 2']
// const input = ['4 4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0','1 1 1','1 2 1','1 3 1','1 4 1']
// const input = ['4 4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0','1 1 1','1 2 1','1 3 1','2 4 3']
// const input = ['4 4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0','1 1 1','1 2 1','1 3 1','3 3 3']
// const input = ['4 4','0 0 2 0','0 0 1 0','0 0 1 2','0 2 0 0','2 1 1','3 2 3','2 2 1','4 1 3']
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
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [dy,dx] = [[0,0,-1,1],[1,-1,0,0]];
// 0 흰 1 빨 2 파랑
const moveHorse = (horse,chessBoard,colorBoard) =>{
    const n = chessBoard.length;
    let {y,x,d} = horse;
    let [ny,nx] = [y+dy[d],x+dx[d]];
    const horseIndex = chessBoard[y][x].findIndex(el => el ===  horse);
    let moveHorses = [];
    if((ny < 0 || nx < 0 || ny >= n || nx >= n) || colorBoard[ny][nx] === 2 ){
        d = d <= 1 ? ( d === 0 ? 1 : 0) : (d === 2 ? 3 : 2);
        horse.d = d;
        [ny,nx] = [y+dy[d],x+dx[d]];
        if((ny < 0 || nx < 0 || ny >=n || nx >= n) || colorBoard[ny][nx] === 2) return false;
        return moveHorse(horse,chessBoard,colorBoard);
    }
    else if(colorBoard[ny][nx] === 0 ){
        moveHorses = chessBoard[y][x].splice(horseIndex);
    }
    else if(colorBoard[ny][nx] === 1){
        moveHorses = chessBoard[y][x].splice(horseIndex).reverse();
    }
    moveHorses.forEach(horse => (horse.y = ny , horse.x = nx));
    chessBoard[ny][nx].push(...moveHorses);
    if(chessBoard[ny][nx].length >=4) return true;
    return false;
}
const solution = input =>{
    const [N,K] = input[0].split(' ').map(Number);
    const colorBoard = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let chessBoard = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    const horses = Array.from({length:K},(_,i) =>{
        const [y,x,d] = input[i+N+1].split(' ').map(num => +num -1);
        return {y,x,d};
    })
    horses.forEach(horse => chessBoard[horse.y][horse.x].push(horse));
    let times = 0;
    while(times < 1000){
        times++;
        for(let i=0; i<K; i++){
            const horse = horses[i];
            const isFinish = moveHorse(horse,chessBoard,colorBoard);
            if(isFinish) return console.log(times);
        }
    }
    console.log(-1);
}
solution(input);