
const board = [[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]];
console.log(solution(board));
function solution(board){
    let answer =0;
    let row = board.length;
    let column = board[0].length;

    if(row < 2 || column < 2) return 1;

    for(let i=1; i<row; i++){
        for(let j=1; j<column; j++){
            let minNumber = Math.min(board[i-1][j],board[i-1][j-1],board[i][j-1]);

            if(board[i][j] > 0){
                board[i][j] = board[i][j] +minNumber;
            }
            if(answer < board[i][j] ){
                answer = board[i][j]
            }
        }
    }
    

    return answer**2;
}