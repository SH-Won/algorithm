// const input = ['3','2 2 2','4 4 4','8 8 8']; //ans 16
// const input = ['3','2 2 2','2 2 2','2 2 2'] //ans8
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

// 20 * 20 * 4 * 4^5  = 458ms;
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const board = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const [left,right,up,down] = [0,1,2,3];
// class Block{
//     constructor(y,x,size,isUnion){
//         this.y = y;
//         this.x = x;
//         this.size = size;
//         this.isUnion = isUnion;
//     }
// }

const solution = (board) =>{
    let max = 0;
    let order = Array(5);
    const getMaxBlock = (board) =>{
        let max = 0;
        for(let y=0; y<N; y++){
           const rowMax = Math.max(...board[y]);
           max = Math.max(rowMax,max);
        }
        return max;
    }

    const gameStart = (board) =>{
        //let newBoard = Array.from({length:N},()=>Array(N));
         for(let i=0; i<order.length; i++){
             
             const direction = order[i];
             switch(direction){
                 case left : {
                     for(let y=0; y<N; y++){
                        let array = board[y].filter(el => el);
                        board[y].fill(0);
                        let px = 0;
                        let x = 0;
                        while(x < array.length){
                            if(array[x] === array[x+1]){
                                board[y][px] = array[x]*2;
                                x+=2;
                                px++;
                            }
                            else{
                                board[y][px] = array[x];
                                x++;
                                px++;
                            }
                        }
                     }
                     break;
                 }
                 case right : {
                    for(let y=0; y<N; y++){
                       let array = board[y].filter(el => el);
                       board[y].fill(0);
                       let px = N-1;
                       let x = array.length-1;
                       while(x >= 0){
                           if(array[x] === array[x-1]){
                               board[y][px] = array[x]*2;
                               x-=2;
                               px--;
                           }
                           else{
                               board[y][px] = array[x];
                               x--;
                               px--;
                           }
                       }
                    }
                    break;
                }
                case up : {
                    for(let x=0; x<N; x++){
                       let array = board.map(array=>array[x]).filter(el => el);
                       board.forEach(array => array[x] = 0);
                       let py = 0;
                       let y = 0;
                       while(y < array.length){
                           if(array[y] === array[y+1]){
                               board[py][x] = array[y]*2;
                               y+=2;
                               py++;
                           }
                           else{
                               board[py][x] = array[y];
                               y++;
                               py++;
                           }
                       }
                    }
                    break;
                }
                case down : {
                    for(let x=0; x<N; x++){
                       let array = board.map(array=>array[x]).filter(el => el);
                       board.forEach(array => array[x] = 0);
                       let py = N-1;
                       let y = array.length-1;
                       while(y >=0){
                           if(array[y] === array[y-1]){
                               board[py][x] = array[y]*2;
                               y-=2;
                               py--;
                           }
                           else{
                               board[py][x] = array[y];
                               y--;
                               py--;
                           }
                       }
                    }
                    break;
                }
             }
         }
         //console.log(board.map(array => array.join(' ')).join('\n'));
         return getMaxBlock(board);
    }

    const dfs = (count) =>{
        if(count === 5){
            //console.log(order);
            const copyBoard = Array.from({length:N},(_,i)=>[...board[i]]);
            const maxBlock = gameStart(copyBoard);
            max = Math.max(maxBlock,max);
            return;
        }
        for(let i=0; i<4; i++){
            order[count] = i;
            dfs(count+1);
        }
    }
    dfs(0);
    console.log(max);
}
solution(board);