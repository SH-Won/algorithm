console.log(solution([[0]]))

function solution(board){
    let answer = 0;
    let row = board.length;
    let column = board[0].length;
    if(row < 2 || column < 2 ){
        let sum = board.reduce((acc,cur)=> cur.reduce((acc,cur)=>acc+=cur,0),0);
        return sum > 0 ? 1 : 0
    }
    
    for(let i=1; i<board.length; i++){
        for(let j=1; j<board[i].length; j++){
            let min = Math.min(board[i-1][j-1],board[i-1][j],board[i][j-1]);
            
            if(board[i][j] > 0){
                board[i][j] = board[i][j] + min
            }
            if(answer <board[i][j]){
                answer = board[i][j]
            }
        }
    }
    return answer**2

}