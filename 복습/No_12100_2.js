// const input = ['3','2 2 2','4 4 4','8 8 8']; //ans 16
//const input = ['3','2 2 2','2 2 2','2 2 2'] //ans8
// const input =[
// '10',
// '16 16 8 32 32 0 0 8 8 8',
// '16 0 0 0 0 8 0 0 0 16',
// '0 0 0 0 0 0 0 0 0 2',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0'
// ] //ans64
// const input = [
// '5',
// '2 2 4 8 16',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '2 2 4 8 16',
// ]  //ans 64
// const input = ['2','16 0','0 0'] //ans 16
// const input = [
// '7',
// '2 2 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 2 2 0 2 2 2',
// '2 2 2 2 2 2 0',
// '2 2 2 2 2 2 0',
// ] //ans 32
// const input = [
// '10',
// '0 0 64 32 32 0 0 0 0 0',
// '0 32 32 64 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// '64 64 128 0 0 0 0 0 0 0',
// '0 0 64 32 32 0 0 0 0 0',
// '0 32 32 64 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// '64 64 128 0 0 0 0 0 0 0',
// '128 32 2 4 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// ] //ans 1024
// const input = [
// '20',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// '1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024 1024',
// ] //ans 32768
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const board = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];

const getMaxBlock = (board) =>{
    let max = 0;
    for(let y=0; y<N; y++){
        max = Math.max(max,...board[y]);
    }
    return max;
}
const startGame = (board,direction) =>{
    for(let i=0; i<direction.length; i++){
        let dir = direction[i];
        switch(dir){
            case LEFT : {
                for(let y=0; y<N; y++){
                    let row = board[y].filter(num => num);
                    board[y].fill(0);
                    let x = 0 , i = 0;
                    while(i < row.length){
                        if(row[i] === row[i+1]){
                            board[y][x] = row[i]*2;
                            x++ , i+=2;
                        }
                        else{
                            board[y][x] = row[i];
                            x++ , i++;
                        }
                    }
                }
                break;
            }
            case RIGHT : {
                for(let y=0; y<N; y++){
                    let row = board[y].filter(num => num).reverse();
                    board[y].fill(0);
                    let x = N-1 , i = 0;
                    while(i < row.length){
                        if(row[i] === row[i+1]){
                            board[y][x] = row[i]*2;
                            x-- , i+=2;
                        }
                        else{
                            board[y][x] = row[i];
                            x-- , i++;
                        }
                    }
                }
                break;
            }
            case UP : {
                for(let x=0; x<N; x++){
                    let column = board.map(row => row[x]).filter(num => num);
                    board.forEach(row => row[x]=0);
                    let y = 0 , i = 0;
                    while(i < column.length){
                        if(column[i] === column[i+1]){
                            board[y][x] = column[i]*2;
                            y++ , i+=2;
                        }
                        else{
                            board[y][x] = column[i];
                            y++ , i++;
                        }
                    }
                }
                break;
            }
            case DOWN : {
                for(let x=0; x<N; x++){
                    let column = board.map(row => row[x]).filter(num => num).reverse();
                    board.forEach(row => row[x]=0);
                    let y = N-1 , i = 0;
                    while(i < column.length){
                        if(column[i] === column[i+1]){
                            board[y][x] = column[i]*2;
                            y-- , i+=2;
                        }
                        else{
                            board[y][x] = column[i];
                            y-- , i++;
                        }
                    }
                }
                break;
            }
        }
    }
    return getMaxBlock(board);
}
const solution = (board) =>{
    let direction = Array(5);
    let maxBlock = 0;
    const dfs = (count) =>{
        if(count === 5){
            const copyBoard = Array.from({length:N},(_,i)=> board[i].slice());
            const block = startGame(copyBoard,direction);
            return maxBlock = Math.max(maxBlock,block);
        }
        for(let i=0; i<4; i++){
            direction[count] = i;
            dfs(count+1);
        }
    }
    dfs(0);
    console.log(maxBlock);
}
solution(board);