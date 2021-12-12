const solution = (board) =>{
    let max = Math.max(...board[0],...board.map(row => row[0]))
    for(let y=1; y<board.length; y++){
        for(let x=1; x<board[0].length; x++){
            if(board[y][x] === 0) continue;
            const min = Math.min(board[y][x-1],board[y-1][x],board[y-1][x-1]);
            board[y][x] +=min;
            max = Math.max(board[y][x] , max);
        }
    }
    return max**2;
}
// console.log(solution([[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]]))
console.log(solution([[0,0,1,1],[1,1,1,1]]))