const solution = (board,moves) => {
    let stack = [];
    let score = 0;
    for(let i=0; i<moves.length; i++){
        const column = moves[i] - 1;
        for(let row=0; row<board.length; row++){
            const doll = board[row][column];
            if(doll){
                if(stack[stack.length-1] === doll){
                    stack.pop();
                    score+=2
                }
                else stack.push(doll);
                board[row][column] = 0;
                break;
            }
        }
    }
    return score;
}