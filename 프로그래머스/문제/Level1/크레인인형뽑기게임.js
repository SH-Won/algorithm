const board = [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1]
]
const moves =[1,5,3,5,1,2,1,4];
console.log(solution(board,moves))
function solution(board,moves){

    let stack =[];
    let count =0;
    for(let i=0; i<moves.length; i++){
        const x = moves[i]-1 ;
        

        for(let y=0; y<board.length; y++){
            if(board[y][x] !==0){
                if(stack[stack.length-1] !== board[y][x]){
                    stack.push(board[y][x])
                }
                else{
                    stack.pop();
                    count+=2;
                }
                board[y][x] =0;
                break;

            }
        }
    }
    return count;
}